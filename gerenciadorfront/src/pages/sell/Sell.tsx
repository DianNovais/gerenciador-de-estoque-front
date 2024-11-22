import { useEffect, useState } from "react";
import ProductItem from "../../components/productItem/ProductItem";
import * as C from "./Sell.style";
import { instanceApiMain } from "../../utils/instance";
import CircleLoad from "../../components/circleLoad/CircleLoad";
import { getTokenAuthorization } from "../../utils/handleCookies";

export type TypeMapProducts = {
  _id?: string;
  name: string;
  quantity: number;
  value: number;
};

const Sell = () => {
  const [data, setData] = useState<[]>([]);
  const [load, setLoad] = useState<boolean>(true);

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

  const VerifyProduct = () => {
    if (!load && data.length > 0) {
      return data.map((item: TypeMapProducts) => (
        <ProductItem
          key={item._id}
          name={item.name}
          quantity={item.quantity}
          value={item.value}
        />
      ));
    } else {
      return <CircleLoad size={40} />;
    }
  };

  return <C.sellContainer>{VerifyProduct()}</C.sellContainer>;
};

export default Sell;
