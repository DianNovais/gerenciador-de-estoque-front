import styled from "styled-components";
import { greenFont, greenMain, white, yellowBtn, yellowBtnDark } from "../../colors/colorsMain";

export const TopContainer = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    padding: 10px;
    align-items: center;
    justify-content: flex-end;
`

export const ContentTotal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 100%;
    font-size: 20px;
    color: ${white};
    background: ${greenFont};
`   

export const ConfirmBtn = styled.button`
    position: fixed;
    bottom: 20px;
    right: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80vw;
    height: 50px;
    font-size: 20px;
    color: ${greenMain};
    background: ${yellowBtn};
    border-radius: 10px;
    cursor: pointer;

    &:hover{
        background: ${greenFont};
        color: ${white};
    }
`