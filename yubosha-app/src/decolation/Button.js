import React from "react";
import styled from "styled-components";

const Button = ({children}) => {
  return <Btn>{children}</Btn>;
};

const Btn = styled.button`
  background: none;
  color: var(--soft-gray);
  border-radius: 5px;
  border: solid 2px var(--soft-gray);
  width: 100px;
  height: 30px;
  cursor: pointer;
  font-weight: 500;
`;

export default Button;
