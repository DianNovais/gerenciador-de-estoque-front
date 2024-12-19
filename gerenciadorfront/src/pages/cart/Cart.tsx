import { TypeMapProducts } from "../../types/TypeProductMap";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as C from './Cart.style';
import { sellContainer as Container } from "../sell/Sell.style";

import ProductItem from "../../components/productItem/ProductItem";
import CircleLoad from "../../components/circleLoad/CircleLoad";
import TitleContent from "../../components/titlePages/titlePages.style";

import { instanceApiMain } from "../../utils/instance";
import { getTokenAuthorization } from "../../utils/handleCookies";

const Cart = () => {
  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [load, setLoad] = useState<boolean>(true);
  const [data, setData] = useState<TypeMapProducts[]>([]);
  const [total, setTotal] = useState<number>(0);

  const handleTotal = (): number => {
    // se existi data
    if(data && data.length > 0){
      //somar total do carrinho aqui no front
      let totalCount = 0;

      // loop para verificar todos produtos
      for(const product of data){
        // loop para verificar quantidade e multiplicar
        if(product.quantity > 1){
          for(let x = 0; x < product.quantity; x++){
            totalCount += product.value;
          }
          continue;
        }

        totalCount += product.value;

      }

      return totalCount;
    }else{
      return 0;
    }
  }

  useEffect(() => {
    const handleCart = async () => {
      setLoad(true);
      await instanceApiMain
        .get("/cart/getproducts", {
          headers: {
            Authorization: `Bearer ${getTokenAuthorization()}`,
          },
        })
        .then((response) => {
          setData(response.data.cart);
          setLoad(false);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setLoad(false);
        });
    };

    handleCart();
  }, []);

  useEffect(() => {
    const totalValue = handleTotal();
    setTotal(totalValue);
  }, [data])

  

  const VerifyProduct = () => {
    if (!load && data && data.length > 0) {
      return data.map((item: TypeMapProducts) => (
        <ProductItem
          key={item._id}
          name={item.name}
          quantity={item.quantity}
          value={item.value}
          _id={item._id}
        />
      ));
    } else {
      return (
        <p>
          Adicione novos produtos ao carrinho{" "}
          <Link to="/sell"> clique aqui</Link>
        </p>
      );
    }
  };

  const handleSell = async() => {
    setLoad(true);
    await instanceApiMain
      .post(
        "/sell/create",
        {},
        { headers: { Authorization: `Bearer ${getTokenAuthorization()}` } }
      )
      .then((response) => {
        if (response.status === 200) {
          setInfo("Venda cadastrada com sucesso!")
          setData([]);
          setLoad(false);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoad(false);
      });
  }

  return (
    <Container>
      <TitleContent>Carrinho</TitleContent>
      <C.TopContainer>
        <C.ContentTotal>Total: {total.toFixed(2)}</C.ContentTotal>
        {data && data.length > 0 && <C.ConfirmBtn onClick={handleSell}>CONFIRMAR VENDA</C.ConfirmBtn>}
      </C.TopContainer>
      <p>{info && info}</p>
      <p style={{ color: "red" }}>{error && error}</p>
      {load ? <CircleLoad size={40} /> : VerifyProduct()}
    </Container>
  );
};

export default Cart;
