import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return <Div></Div>;
};

const load = keyframes`
 0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
`;

const Div = styled.div`
  color: var(--soft-gray);
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: ${load} 1.8s infinite ease-in-out;
  animation: ${load} 1.8s infinite ease-in-out;

  &::after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: ${load} 1.8s infinite ease-in-out;
    animation: ${load} 1.8s infinite ease-in-out;
    content: "";
    position: absolute;
    top: 0;
    left: 3.5em;
  }

  &::before {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: ${load} 1.8s infinite ease-in-out;
    animation: ${load} 1.8s infinite ease-in-out;
    content: "";
    position: absolute;
    top: 0;
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
`;

export default Spinner;
