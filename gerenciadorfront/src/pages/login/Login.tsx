import { FormEvent, useContext, useState } from "react";
import * as C from "../register/Register.style";
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { instanceApiMain } from "../../utils/instance";
import { Context } from "../../context/AuthContext";
import { setCookies } from "../../utils/handleCookies";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState("");
  const authContext = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);

    await instanceApiMain
      .post("/user/login", { user, password })
      .then((response) => {
        setError('');
        setCookies(`token=${response.data.token}`);

        if (authContext?.verifyToken()) {
          navigate("/");
          setLoad(false);
        }else{
          setError('algo deu errado');
          setLoad(false);
        }
      }).catch((error) => {
        setLoad(false);
        setError(error.response.data.message);
      });
  };

  return (
    <C.Container>
      <C.ContentLogo>
        <C.logoTemp>
          <p>Product Adm</p>
        </C.logoTemp>
      </C.ContentLogo>
      <C.Form onSubmit={handleLogin}>
        <C.textFormAlignLeft>
          <h2>Seja Bem Vindo!</h2>
          <p>Faça seu login para continuar!</p>
        </C.textFormAlignLeft>

        <C.ContainerInput>
          <C.ContentInput>
            <FaRegUser />
            <input
              type="text"
              placeholder="Coloque seu nome de usuário"
              onChange={(e) => setUser(e.target.value)}
            />
          </C.ContentInput>
          <C.ContentInput>
            <MdOutlinePassword />
            <input
              type="password"
              placeholder="Coloque sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </C.ContentInput>
          {!load && (
            <C.buttonRegister>
              Login <FaArrowRight />
            </C.buttonRegister>
          )}

          <C.ErrorForm>{error && error}</C.ErrorForm>
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
};

export default Login;
