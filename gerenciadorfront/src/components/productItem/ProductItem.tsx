import { FaCartPlus } from "react-icons/fa";
import * as C from "./ProductItem.style";
import { TypeMapProducts } from "../../pages/sell/Sell";

type TypeProps = {
  action?: () => void;
};

const ProductItem = (props: TypeMapProducts & TypeProps) => {
  return (
    <C.productContainer>
      <>
        <C.ImageProduct src="/images/notimage.png" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <C.TitleProduct>{props.name}</C.TitleProduct>
          <C.TitleProduct>Quantidade: {props.quantity}</C.TitleProduct>
        </div>

        <C.priceProduct>R$ {props.value}</C.priceProduct>
        <C.toolContainer>
          <FaCartPlus />
        </C.toolContainer>
      </>
    </C.productContainer>
  );
};

export default ProductItem;
