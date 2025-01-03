import React, { useState } from "react";
import * as C from "./ProductForm.style";
import { instanceApiMain } from "../../utils/instance";
import CircleLoad from "../circleLoad/CircleLoad";
import { getTokenAuthorization } from "../../utils/handleCookies";
import addNotification from "../../utils/addNotification";

const ProductForm = () => {
  const [title, setTitle] = useState<string>("");
  //alert: need verified if number is int.
  const [quantity, setQuantity] = useState<number>(0);
  const [cost, setCost] = useState<number>(0.0);
  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);

  const tranformNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const valueElement = e.target.value;
    const fixNumber = valueElement.includes(",")
      ? valueElement.replace(",", ".")
      : valueElement;
    const floatNumber = parseFloat(parseFloat(fixNumber).toFixed(2));

    // alert: need verified if number valid
    setCost(floatNumber);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    e?.preventDefault();
    setInfo("");
    setError("");
    setLoad(true);

    await instanceApiMain
      .post("/product/create", { name: title, value: cost, qtd: quantity }, {
        headers: {
          Authorization: `Bearer ${getTokenAuthorization()}`
      }
      })
      .then((response) => {
        if (response.status === 200 && response.data.newProduct) {
          addNotification('Produto cadastrado!', `Foi cadastrado o produto ${response.data.newProduct.name}`, 'success');
          setTitle("");
          setQuantity(0);
          setCost(0);
          setLoad(false);
        }
      })
      .catch((err) => {
        const error = err.response.data.message
          ? err.response.data.message
          : err.response.data.error;
          addNotification('Error!', `${error}`, 'danger');
        setLoad(false);
      });
  };

  return (
    <C.ProductFormContent onSubmit={handleSubmit}>
      {load ? (
        <CircleLoad size={40} />
      ) : (
        <>
          <C.FormProductLabel>
            <p>Nome do produto:</p>
            <C.FormProductInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              type="text"
              placeholder="ex: Leite"
              value={title}
              required
            />
          </C.FormProductLabel>
          <C.FormProductLabel>
            <p>Quantidade do produto disponível:</p>
            <C.FormProductInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(parseInt(e.target.value))
              }
              type="number"
              placeholder="ex: 3"
              value={quantity}
              required
            />
          </C.FormProductLabel>
          <C.FormProductLabel>
            <p>Valor do produto:</p>
            <C.FormProductInput
              onChange={tranformNumber}
              type="number"
              step={0.01}
              placeholder="ex: 20,50"
              value={cost}
              required
            />
          </C.FormProductLabel>
          <C.FormProductButton type="submit" value="Cadastrar" />

          <p style={{ color: "light-green" }}>{info}</p>
          <p style={{ color: "red" }}>{error}</p>
        </>
      )}
    </C.ProductFormContent>
  );
};

export default ProductForm;
