import * as C from './GetSell.style';

import TitleContent from "../../components/titlePages/titlePages.style";

import { sellContainer as Container} from "../sell/Sell.style";

const GetSell = () => {
  return (
    <Container>
        <TitleContent>Vendas</TitleContent>
        <C.ContainerChart>
            
        </C.ContainerChart>
    </Container>
  )
}

export default GetSell