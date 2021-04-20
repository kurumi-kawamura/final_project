import React, { useEffect } from "react";
import styled from "styled-components";
import { BsArrowReturnLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Sucess = () => {
  const ids = JSON.parse(localStorage.getItem("ids"));
  const quantitys = JSON.parse(localStorage.getItem("quantitys"));
  const stocks = JSON.parse(localStorage.getItem("stocks"));

  useEffect(() => {
    fetch("/updateStock", {
      method: "POST",
      body: JSON.stringify({ _id: ids, quantity: quantitys, stock: stocks }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { status } = json;
        if (status === 200) {
          localStorage.removeItem("ids");
          localStorage.removeItem("quantitys");
          localStorage.removeItem("stocks");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
      // eslint-disable-next-line
  }, []);
  return (
    <>
      <Wrapper>
        <div>Thank you for your order!</div>
        <p>We will send you the order confimation email within next 24h!</p>
        <Return exact to="/">
          <Icon>
            <BsArrowReturnLeft style={{ fill: "green" }} />
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
