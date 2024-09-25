import { useContext } from "react";
import * as C from "./Header.style";
import { Context } from "../../context/AuthContext";

const Header = () => {
  const authContext = useContext(Context);
  let logged: undefined | boolean = authContext?.auth;

  return (
    <C.Header>
      <C.topHeader>
        <C.logoTemp>
          <p>ADM</p>
        </C.logoTemp>
      </C.topHeader>

      <C.menuNav>
        <C.itensMenu>
          {!logged ? (
            <>
              <C.NavLinkCustom
                to={"/login"}
                className={(isActive) => isActive && "active"}
              >
                Login
              </C.NavLinkCustom>
              <C.NavLinkCustom
                to={"/register"}
                className={(isActive) => isActive && "active"}
              >
                Registro
              </C.NavLinkCustom>
            </>
          ) : (
            <>
              <C.NavLinkCustom to={'/'}>Home</C.NavLinkCustom>
              <C.NavLinkCustom to={'/cart'}>Carrinho</C.NavLinkCustom>
              <C.NavLinkCustom to={'/products'}>Produtos</C.NavLinkCustom>
            </>
          )}
        </C.itensMenu>
      </C.menuNav>
    </C.Header>
  );
};

export default Header;
