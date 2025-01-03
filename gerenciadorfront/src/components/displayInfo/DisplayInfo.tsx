import * as C from './DisplayInfo.style'

type DisplayProps = {
    title: string;
    total: number;
}

const DisplayInfo = ({title, total}: DisplayProps) => {
  return (
    <C.Container>
        <C.Content>
            <C.TitleDisplay>{title}</C.TitleDisplay>
            <C.ValuesDisplay>{total.toFixed(2)} R$</C.ValuesDisplay>
        </C.Content>
    </C.Container>
  )
}

export default DisplayInfo