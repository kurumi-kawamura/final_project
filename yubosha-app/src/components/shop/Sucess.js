import React from "react";
import Header from "../header/index";
import styled from "styled-components";
import { BsArrowReturnLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Sucess = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <div>Thank you for your order!</div>
        <p>We will send you the order confimation email within next 24h!</p>
        <Return exact to="/">
          <Icon>
            <BsArrowReturnLeft style={{fill: "green"}} />
          </Icon>
          <p>Return to Home</p>
        </Return>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Return = styled(NavLink)`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-top: 7px;
  text-decoration: none;
  color: var(--soft-black);
`;

const Icon = styled.div`
  margin-top: 4px;
`;

export default Sucess;
