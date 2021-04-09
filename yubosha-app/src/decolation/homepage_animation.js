import React from "react";
import styled, { keyframes } from "styled-components";

const HPAnimation = () => {
  return (
    <>
      <div></div>
      <Square />
      <Square1 />
      <Square2 />
      <Circle />
    </>
  );
};

const Square = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid;
  transform: rotate(45deg);
  position: absolute;
  top: 40.71%;
  right: 35%;
  box-sizing: border-box;
`;

const move = keyframes`
 0%{
    transform: translate(-100px,100px) rotate(0) ;
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
    opacity: 100;
  }
`;

const move2 = keyframes`
0%{
    transform: translate(100px,-100px) rotate(0) ;
    opacity: 0;
  }
  100% {
    transform:  translate(0, 0) rotate(360deg);
    opacity: 100;
  }
`;

const Square1 = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid;
  position: absolute;
  left: 56.2%;
  top: 43.9%;

  animation: ${move} 3s ease-in-out both;
`;

const Square2 = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid;
  position: absolute;
  left: 53.5%;
  top: 48%;

  animation: ${move2} 3s ease-in-out both;
`;

const Circle = styled.div`
  width: 95px;
  height: 95px;
  border: 1px solid;
  border-radius: 50%;
  position: absolute;
  left: 55.2%;
  top: 47%;
`;

export default HPAnimation;
