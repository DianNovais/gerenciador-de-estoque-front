import { greenMain } from "../../colors/colorsMain";
import * as C from "./Home.style";
import {
  FaCartPlus,
  FaCashRegister,
  FaMoneyBillWave,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";

const Home = () => {
  return (
    <C.Home>
      <C.cartOptions to={"/sell"}>
        <FaCashRegister style={{ color: greenMain }} />
        <p>Vender</p>
      </C.cartOptions>
      <C.cartOptions to={"/produto"}>
        <FaCartPlus style={{ color: greenMain }} />
        <p>Carrinho</p>
      </C.cartOptions>
      <C.cartOptions to={"/addproducts"}>
        <FaPlusCircle style={{ color: greenMain }} />
        <p>Adicionar Produto</p>
      </C.cartOptions>
      <C.cartOptions to={"/produto"}>
        <FaTrash style={{ color: greenMain }} />
        <p>Remover Produto</p>
      </C.cartOptions>
      <C.cartOptions to={"/produto"}>
      <FaMoneyBillWave style={{ color: greenMain }} />
        <p>Vendas</p>
      </C.cartOptions>
    </C.Home>
  );
};

export default Home;
