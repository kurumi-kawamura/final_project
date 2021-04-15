import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Btn } from "../../decolation/FormItem";
import Header from "../header/index";

const CheckOut = () => {
  const cart = useSelector((state) => state.item.cart);
  const cartItem = Object.values(cart);
  const [ids, setIds] = useState(null);
  const [quantitys, setQuantitys] = useState(null);
  const [stocks, setStocks] = useState(null);

  let idArr = [];
  let quantityArr = [];
  let stockArr = [];
  useEffect(() => {
    cartItem.forEach((item) => {
      idArr.push(item._id);
      quantityArr.push(item.quantity);
      stockArr.push(item.stock);
    });
    setIds(idArr);
    setQuantitys(quantityArr);
    setStocks(stockArr);
    // eslint-disable-next-line
  }, [cart]);

  const placeOrder = () => {
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
        }
      });
  };

  return (
    <>
      <Header />
      <H1>Check out</H1>
      <Wrapper>
        <label>Name:</label>
        <input />
        <label>Email:</label>
        <input />
        <label>Address:</label>
        <input />
        <label>City:</label>
        <input />
        <label>Province:</label>
        <input />
        <label>Postalcode:</label>
        <input />
        <label>Phonenumber:</label>
        <input />
        <Btn onClick={placeOrder}>
          Place order
        </Btn>
        <Btn type="reset">Clear</Btn>
      </Wrapper>
    </>
  );
};

const H1 = styled.h1`
  margin-top: 70px;
  text-align: center;
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

export default CheckOut;
