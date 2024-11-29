import { useEffect, useState } from "react";

import * as C from "./Sell.style";

import { instanceApiMain } from "../../utils/instance";
import { getTokenAuthorization } from "../../utils/handleCookies";

import { FaCartPlus } from "react-icons/fa";

import { TypeMapProducts } from "../../types/TypeProductMap";

import { Link } from "react-router-dom";

import ProductItem from "../../components/productItem/ProductItem";
import inputNumberSell from "../../components/inputNumberSell/inputNumberSell";
import CircleLoad from "../../components/circleLoad/CircleLoad";
import TitleContent from "../../components/titlePages/titlePages.style";

type TypeListProductModify = {
  quantity: number | undefined;
  product_id: string;
};

type TypeCartResponse = {
  cart: TypeListProductModify[];
};

const Sell = () => {
  const [data, setData] = useState<[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<string>("");

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
          setError(err.response.data.message);
          setLoad(false);
        });
    };
    getData();
  }, []);

  const handleAddCart = async (_id: string, quantity?: number) => {
    setLoad(true);
    setInfo("");
    setError("");

    let productsCart: TypeListProductModify[] = [];

    // obtendo produtos do carrinho no banco de dados
    await instanceApiMain
      .get<TypeCartResponse>("/cart/getproducts", {
        headers: { Authorization: `Bearer ${getTokenAuthorization()}` },
      })
      .then((response) => {
        // adicionando produtos atuais na variavel local
        productsCart.push(...response.data.cart);
      })
      .catch((err) => {
        setLoad(false);
        setError(err.response.data.message);
        return;
      });

    // se retornou itens no carrinho
    if (productsCart.length > 0) {


      // procurando se o produto a ser adicionado existe no carrinho
      const indexProductExist  = productsCart.findIndex((item) => {
        return item.product_id === _id;
      });

      // se existe apenas soma a quantidade que já tem
      if(indexProductExist >= 0){
        if (quantity === undefined || productsCart[indexProductExist].quantity === undefined || quantity < 1) {
                setError("Quantidade inválida");
                setLoad(false);
                return ;
        }

        productsCart[indexProductExist].quantity += quantity;
      }else{
        // caso contrario coloque o novo produto na lista
        productsCart.push({
          product_id: _id,
          quantity
        })
      }
    } else {
      // caso não tenha itens no carrinho adicione o novo produto a lista
      productsCart = [{ quantity, product_id: _id }];
    }

    // adicionando produtos atuais e o novo produto ao carrinho no banco de dados
    await instanceApiMain
      .post(
        "/cart/addproducts",
        {
          products: [...productsCart],
        },
        {
          headers: { Authorization: `Bearer ${getTokenAuthorization()}` },
        }
      )
      .then(() => {
        setInfo("Foi adicionado " + quantity + " unidades ao carrinho");
        setLoad(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoad(false);
      });
  };

  const VerifyProduct = () => {
    if (!load && data && data.length > 0) {
      return data.map((item: TypeMapProducts) => (
        <ProductItem
          key={item._id}
          name={item.name}
          quantity={item.quantity}
          value={item.value}
          Icon={FaCartPlus}
          action={handleAddCart}
          _id={item._id}
          InputQuantity={inputNumberSell}
        />
      ));
    } else {
      return <p>Adicione novos produtos <Link to='/addproducts'></Link></p>;
    }
  };

  return (
    <C.sellContainer>
      <TitleContent>Vender</TitleContent>
      <p>{info && info}</p>
      <p style={{ color: "red" }}>{error && error}</p>
      
      {load ? <CircleLoad size={40} /> : VerifyProduct()}
    </C.sellContainer>
  );
};

export default Sell;
