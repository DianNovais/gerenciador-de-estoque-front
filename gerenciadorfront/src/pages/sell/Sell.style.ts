import styled from "styled-components";
import { greyMain } from "../../colors/colorsMain";

export const sellContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 80vh;
    background: ${greyMain};
    gap: 10px;
    padding: 20px;

    .formGetSell{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin: 15px 0;

        label{
        font-weight: bold;
        }
    }

    
`