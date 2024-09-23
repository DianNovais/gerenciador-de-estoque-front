import styled from "styled-components";
import { greenMain, greyMain, white } from "../../colors/colorsMain";
import { NavLink } from "react-router-dom";

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: ${greyMain};
`

export const topHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
`

export const logoTemp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${greenMain};
  text-align: center;

  p {
    font-size: 10px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
  }
`;


export const menuNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 5px;
`

export const itensMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${white};
    background: ${greenMain};
    cursor: pointer;
    
`

export const NavLinkCustom = styled(NavLink)`
    color: ${white};
    text-decoration: none;
    font-weight: bold;
    padding: 10px;

    &.active{
        color: ${greenMain};
        background: ${greyMain};
        border: 1px solid ${greenMain};
    }
`