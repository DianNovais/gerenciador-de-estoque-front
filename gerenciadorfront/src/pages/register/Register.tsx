import * as C from "./Register.style";
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <C.Container>
      <C.ContentLogo>
        <C.logoTemp>
          <p>Product Adm</p>
        </C.logoTemp>
      </C.ContentLogo>
      <C.Form>
        <C.textFormAlignLeft>
          <h2>Seja Bem Vindo!</h2>
          <p>Faça seu registro para continuar!</p>
        </C.textFormAlignLeft>

        <C.ContainerInput>
          <C.ContentInput>
            <FaRegUser />
            <input type="text" placeholder="Coloque seu nome de usuário" />
          </C.ContentInput>
          <C.ContentInput>
            <MdOutlinePassword />
            <input type="password" placeholder="Coloque sua senha" />
          </C.ContentInput>
          <C.buttonRegister>
            Registrar <FaArrowRight />
          </C.buttonRegister>
        </C.ContainerInput>

        <C.ContainerEnd>
          <label><input type="checkbox" />Ao se registrar você deve concordar com os termos</label>
          <br />
          <p>
            já tem uma conta?{" "}
            <Link to="/login">
              <b>Clique Aqui</b>
            </Link>
          </p>
        </C.ContainerEnd>
      </C.Form>
    </C.Container>
  );
};

export default Register;
