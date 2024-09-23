import { NavLink } from 'react-router-dom'
import * as C from './Header.style'

const Header = () => {
  return (
    <C.Header>
      <C.topHeader>
        <C.logoTemp><p>ADM</p></C.logoTemp>
      </C.topHeader>
      <C.menuNav>
        <C.itensMenu>
          <C.NavLinkCustom to={'/login'} className={(isActive) => isActive && 'active'}>Login</C.NavLinkCustom>
          <C.NavLinkCustom to={'/register'} className={(isActive) => isActive && 'active'}>Registro</C.NavLinkCustom>
        </C.itensMenu>
      </C.menuNav>
    </C.Header>
  )
}

export default Header