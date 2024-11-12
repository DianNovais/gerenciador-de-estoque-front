import { ChangeEvent, FormEvent, useContext, useState } from "react";
import * as C from "./Register.style";
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { instanceApiMain } from "../../utils/instance";
import { Context } from "../../context/AuthContext";
import { setCookies } from "../../utils/handleCookies";

const Register = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();
  const authContext = useContext(Context);
  console.log(authContext?.auth);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);

    await instanceApiMain
      .post("/user/register", {
        user,
        password,
      })
      .then((response) => {
        setError("");
        setCookies(`token=${response.data.token}`);

        if (authContext?.verifyToken()) {
          navigate("/");
          setLoad(false);

        } else {
          setError("algo deu errado.");
          setLoad(false);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoad(false);
      });
  };

  return (
    <C.Container>
      <C.ContentLogo>
        <C.logoTemp>
          <p>Product Adm</p>
        </C.logoTemp>
      </C.ContentLogo>
      <C.Form onSubmit={handleRegister}>
        <C.textFormAlignLeft>
          <h2>Seja Bem Vindo!</h2>
          <p>Faça seu registro para continuar!</p>
        </C.textFormAlignLeft>

        <C.ContainerInput>
          <C.ContentInput>
            <FaRegUser />
            <input
              type="text"
              placeholder="Coloque seu nome de usuário"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUser(e.target.value);
              }}
            />
          </C.ContentInput>
          <C.ContentInput>
            <MdOutlinePassword />
            <input
              type="password"
              placeholder="Coloque sua senha"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
          </C.ContentInput>
          {!load && (
            <C.buttonRegister>
              Registrar <FaArrowRight />
            </C.buttonRegister>
          )}

          <C.ErrorForm>{error && error}</C.ErrorForm>
        </C.ContainerInput>

        <C.ContainerEnd>
          <label>
            <input type="checkbox" />
            Ao se registrar você deve concordar com os termos
          </label>
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
