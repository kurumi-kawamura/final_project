import Reat from "react";
import styled, { keyframes } from "styled-components";

const CircleAnimation = () => {
  return <AnimationDiv></AnimationDiv>;
};

export default CircleAnimation;

const ping = keyframes`
0%{
    transform: scale(0.2);
    opacity: 0.8;
}
80%{
    transform: scale(1.2)
    opacity:0;
}
100%{
    transform: scale(2.2);
    opacity: 0;
}
`;


export const AnimationDiv = styled.div`
border: white 1px solid;
  border-radius: 50%;
  cursor: pointer;
  height: 150px;
  width: 150px;
  animation: ${ping} 1s ease-in-out both;

`;
