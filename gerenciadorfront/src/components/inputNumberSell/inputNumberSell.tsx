import styled from "styled-components"
import { greenMain } from "../../colors/colorsMain"

type TypeProps = {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = styled.input`
        width: 50px;
        height: 50px;
        border: 1px solid ${greenMain};

        text-align: center;
    `

const inputNumberSell = ({value, onChange}: TypeProps) => {

  return (
    <Input value={value} onChange={onChange} placeholder="EX: 3" type="number"/>
  )
}

export default inputNumberSell