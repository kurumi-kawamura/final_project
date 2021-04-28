import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { BsArrowReturnLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { success } from "../../sentence/Language";
import { AppContext } from "../../context";

const Sucess = () => {
  const ids = JSON.parse(localStorage.getItem("ids"));
  const quantitys = JSON.parse(localStorage.getItem("quantitys"));
  const stocks = JSON.parse(localStorage.getItem("stocks"));
  const { lang, currentUser } = useContext(AppContext);

  useEffect(() => {

    fetch("/createOrder", {
      method: "POST",
      body: JSON.stringify({
        quantity: quantitys,
        item: ids,
        name: currentUser.userName,
        email: currentUser.email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err.message);
      });

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
        <div>{success[`${lang}thanks`]}</div>
        <p>{success[`${lang}mailyou`]}</p>
        <Return exact to="/">
          <Icon>
            <BsArrowReturnLeft style={{ fill: "green" }} />
          </Icon>
          <p>{success[`${lang}returnHM`]}</p>
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
