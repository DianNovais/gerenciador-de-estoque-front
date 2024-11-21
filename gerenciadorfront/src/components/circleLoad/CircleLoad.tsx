import { FaCircleNotch } from "react-icons/fa";
import { greenMain } from "../../colors/colorsMain";

import styled from "styled-components";

type circleLoadProps = {
  size: number;
};

const CircleLoad = (props: circleLoadProps) => {
  const CircleContainer = styled.div`
    svg{
        animation: rotation 1s linear infinite;
    }
    

    @keyframes rotation {
      from {
        rotate: 0deg;
      }
      to {
        rotate: 360deg;
      }
    }
  `;
  return (
    <CircleContainer>
      <FaCircleNotch
        style={{ width: props.size + 'px', height: props.size + 'px', color: greenMain }}
      />
    </CircleContainer>
  );
};

export default CircleLoad;
