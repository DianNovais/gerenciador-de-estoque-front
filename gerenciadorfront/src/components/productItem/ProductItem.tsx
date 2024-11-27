import * as C from "./ProductItem.style";
import { TypeMapProducts } from "../../types/TypeProductMap";
import { IconType } from "react-icons";
import { useState } from "react";

type TypeProps = {
  action?: (_id: string, quantity?: number) => any;
  Icon?: IconType;
  colorIcon?: string;
  InputQuantity?: React.ComponentType<{
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }>;
};

const ProductItem = (props: TypeMapProducts & TypeProps) => {
  const [inputQuantity, setInputQuantity] = useState<number>(1);

  const handleAction = async () => {
    console.log("handleAction");
    if (props.action && props._id) {
      console.log(props._id);
      await props.action(props._id, inputQuantity);
    }
  };

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
          {props.InputQuantity && (
            <form>
              <props.InputQuantity
                value={inputQuantity}
                onChange={(e) => setInputQuantity(parseInt(e.target.value))}
              />
            </form>
          )}
          {props.Icon && (
            <props.Icon
              onClick={() => handleAction()}
              style={props.colorIcon ? { color: props.colorIcon } : {}}
            />
          )}
        </C.toolContainer>
      </>
    </C.productContainer>
  );
};

export default ProductItem;
