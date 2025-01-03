import React, { useEffect, useState } from "react";
import { getTokenAuthorization } from "../../utils/handleCookies";
import { instanceApiMain } from "../../utils/instance";

import { TypeMapProducts } from "../../types/TypeProductMap";

import ProductItem from "../../components/productItem/ProductItem";
import CircleLoad from "../../components/circleLoad/CircleLoad";
import * as C from "../sell/Sell.style";
import { FaTrash } from "react-icons/fa";
import TitleContent from "../../components/titlePages/titlePages.style";
import { Link } from "react-router-dom";
import addNotification from "../../utils/addNotification";

const DeleteProducts = () => {
  const [data, setData] = useState<TypeMapProducts[]>();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    setLoad(true);
    const getData = async () => {
      await instanceApiMain
        .get("/product/allproducts", {
          headers: {
            Authorization: `Bearer ${getTokenAuthorization()}`,
          },
        })
        .then((response) => {
          setData(response.data.products);
          setLoad(false);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setLoad(false);
        });
    };
    getData();
  }, []);

  const handleDelete = async (_id: string, quantity?: number) => {
    setLoad(true);
    await instanceApiMain
      .post(
        "/product/delete",
        { _id },
        { headers: { Authorization: `Bearer ${getTokenAuthorization()}` } }
      )
      .then((response) => {
        if (response.status === 200 && response.data.message) {
          addNotification('Produto removido!', `${response.data.message}`, 'success');
            const removeProduct =
            data && data.filter((item: TypeMapProducts) => item._id !== _id);

          setData(removeProduct);
          setLoad(false);
        }
      })
      .catch((err) => {
        addNotification('Error!', `${err.response.data.message}`, 'danger');
        setLoad(false);
      });
  };

  const VerifyProduct = () => {
    if (data && data.length > 0) {
      return data.map((item: TypeMapProducts) => (
        <ProductItem
          key={item._id}
          name={item.name}
          quantity={item.quantity}
          value={item.value}
          Icon={FaTrash}
          colorIcon="red"
          action={handleDelete}
          _id={item._id}
        />
      ));
    } else {
      return (
        <p>
          Adicione novos produtos <Link to={"/addproducts"}>Clique Aqui</Link>
        </p>
      );
    }
  };

  return (
    <C.sellContainer>
      <TitleContent>Deletar produto</TitleContent>
      <p>{info && info}</p>
      <p style={{ color: "red" }}>{error && error}</p>
      {load ? <CircleLoad size={40} /> : VerifyProduct()}
    </C.sellContainer>
  );
};

export default DeleteProducts;
