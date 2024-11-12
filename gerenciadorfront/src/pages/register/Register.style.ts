import styled from "styled-components";
import { greenMain, greyMain, white } from "../../colors/colorsMain";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 100vh;
  padding: 40px;
  background: ${greyMain};
`;

export const ContentLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const logoTemp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: ${greenMain};
  text-align: center;

  p {
    font-size: 50px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${greenMain};
  border-radius: 30px;
  width: 100vw;
  height: 80vh;
  padding: 50px 30px;
`;

export const textFormAlignLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: start;
  justify-content: center;
  color: white;
`;

export const ContentInput = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 80%;
  background: white;
  border-radius: 30px;
  padding: 0 10px;

  svg {
    padding: 2px;
    width: 25px;
    height: auto;
  }

  input {
    height: 100%;
    width: 100%;
    margin-left: 5px;
    border-radius: 30px;
  }

  input:focus {
    outline: 0;
  }
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
`;

export const buttonRegister = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border-radius: 30px;
  padding: 10px;
  gap: 5px;
  cursor: pointer;
  font-weight: bolder;
  transition: all 500ms linear;


  &:hover svg {
    transform: translateX(5px);
    transition: all 500ms linear;
  }
`;

export const ErrorForm = styled.p`
  color: red;
`


export const ContainerEnd = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   color: ${white};
   position: relative;
    text-align: center;

    label{
      cursor: pointer;
    }

   a{
    color: ${white};
   }

   input[type=checkbox]{
    margin-right: 5px;
   }
`