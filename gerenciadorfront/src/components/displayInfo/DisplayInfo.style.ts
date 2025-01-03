import styled from "styled-components";
import { greenMain, white } from "../../colors/colorsMain";

export const Container = styled.div`
    padding: 10px;
    border-radius: 10px;
    height: 200px;
    width: 300px;
    background: ${greenMain};
`

export const Content = styled.div`
    height: 100% ;
    width: 100%;
    color: ${white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const TitleDisplay = styled.p`
    font-weight: bold;
    text-align: center;
    margin: 10px 0;
`

export const ValuesDisplay = styled.p`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0;
`