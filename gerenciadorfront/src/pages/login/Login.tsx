import * as C from "../register/Register.style";
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { Link } from "react-router-dom";

const Login = () => {
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
          <p>Faça seu login para continuar!</p>
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
            Login <FaArrowRight />
          </C.buttonRegister>
        </C.ContainerInput>

        <C.ContainerEnd>
          <p>
            Não tem uma conta?{" "}
            <Link to="/register">
              <b>Clique Aqui</b>
            </Link>
          </p>
        </C.ContainerEnd>
      </C.Form>
    </C.Container>
  );
}

export default Login