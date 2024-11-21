import styled from "styled-components";
import { greenFont, greenMain, greenSuccess, white } from "../../colors/colorsMain";

export const ProductFormContent = styled.form`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    width: 75%;
    background: ${white};
    justify-content: center;
    border-radius: 5px;
`

export const FormProductInput = styled.input`
    border: 1px solid ${greenMain};
    height: 45px;
    border-radius: 5px;
    padding: 10px;
    width: 100%;

    &:focus{
        outline: 0px;
        border: 1px solid ${greenSuccess};
        box-shadow: 0px 0px 1px 2px ${greenSuccess};
    }

    `
export const FormProductButton = styled.input`
    border: 1px solid ${greenMain};
    height: 45px;
    border-radius: 5px;
    padding: 10px;
    width: 80%;
    cursor: pointer;
    background: ${greenFont};
    color: ${white};
    transition: all 0.2s linear;
    margin-bottom: 10px;
    

    &:hover{
        background: ${greenMain};
    }

`

export const FormProductLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    color: ${greenFont};
    margin: 10px;

    p{
        font-weight: bold;
    }
`