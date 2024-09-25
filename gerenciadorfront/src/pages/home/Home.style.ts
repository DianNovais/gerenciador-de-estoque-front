import styled from "styled-components";
import { greenMain, greyMain, white } from "../../colors/colorsMain";
import { Link } from "react-router-dom";

export const Home = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${greyMain};
    min-height: 90vh;
    gap: 20px;
    flex-wrap: wrap;

`

export const cartOptions = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: ${white};
    height: 70vh;
    width: 300px;
    box-shadow: 0px 0px 20px #CBCEDF;
    cursor: pointer;
    text-decoration: none;

    p{
        margin-top: 10px;
        font-weight: bold;
        color: ${greenMain};
    }

    svg{
        width: 50px;
        height: 50px;
    }
`