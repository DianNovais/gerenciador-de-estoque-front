import { useEffect, useState } from "react";
import { sellContainer as Container } from "../sell/Sell.style";
import ProductItem from "../../components/productItem/ProductItem";
import { TypeMapProducts } from "../../types/TypeProductMap";
import CircleLoad from "../../components/circleLoad/CircleLoad";

import { Link } from "react-router-dom";
import TitleContent from "../../components/titlePages/titlePages.style";
import { instanceApiMain } from "../../utils/instance";
import { getTokenAuthorization } from "../../utils/handleCookies";

const Cart = () => {
  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [load, setLoad] = useState<boolean>(true);
  const [data, setData] = useState<[]>([]);

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

  return (
    <Container>
      <TitleContent>Carrinho</TitleContent>
      <p>{info && info}</p>
      <p style={{ color: "red" }}>{error && error}</p>
      {load ? <CircleLoad size={40} /> : VerifyProduct()}
    </Container>
  );
};

export default Cart;
