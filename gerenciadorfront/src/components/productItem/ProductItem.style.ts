import styled from "styled-components";
import { greyMain } from "../../colors/colorsMain";

export const productContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 300px;
    margin: 1px solid red;
`   

export const ImageProduct = styled.image`
    width: 200px;
    height: 200px;
`

export const priceProduct = styled.div`
    width: 100%;
    height: 20px;
    font-size: 20px;
`