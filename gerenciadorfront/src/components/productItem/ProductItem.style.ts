import styled from "styled-components";
import { greenMain, greenProductList, greyMain, white } from "../../colors/colorsMain";

export const productContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: ${white};
    height: 150px;
    width: 100%;
    margin: 1px solid red;
    border-radius: 10px;
    padding: 10px;
    justify-content: space-around;
    border: 1px solid ${greenMain};
`   

export const ImageProduct = styled.img`
    object-fit: cover;
    width: 70px;
    height: 120px;
`

export const TitleProduct = styled.p`
    font-weight: bold;
    width: 200px;
`

export const priceProduct = styled.div`
    height: 20px;
    font-size: 20px;
`

export const toolContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 40%;

    svg{
        color: ${greenMain};
        height: 40px;
        width: 40px;
        cursor: pointer;
    }
`