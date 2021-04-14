import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../header/index";
import { Btn, DisabledBtn } from "../../decolation/FormItem";
import CartItem from "./CartItem";

const Cart = () => {
  const cart = useSelector((state) => state.item.cart);
  const cartItem = Object.values(cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    cartItem.forEach((item) => {
      sum = sum + Number(item.price);
    });
    setTotal(sum);
  }, [cartItem]);
  return (
    <>
      <Header />
      <Container>
          <ItemContainer>
        {cartItem ? (
          cartItem.map((item) => {
            return (
                <CartItem
                  src={item.imgSrc}
                  name={item.ItemName}
                  quantity={item.quantity}
                  key={item._id}
                  item={item}
                  price={item.price}
                />
                );
            })
            ) : (
                <div>Loading</div>
                )}
                </ItemContainer>
        <BtnWrapper>
          <P>Total: {total} yen</P>
          {cartItem.length !== 0 ? (
            <Btn>Proceed to check out</Btn>
          ) : (
            <DisabledBtn>Proceed to check out</DisabledBtn>
          )}
        </BtnWrapper>
      </Container>
    </>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const BtnWrapper = styled.div`
  position: absolute;
  top: 300px;
  right: 300px;
`;

const P = styled.p`
  margin-bottom: 10px;
`;

export default Cart;
