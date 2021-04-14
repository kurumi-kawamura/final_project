import React from "react";
import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { removeItem } from "../../actions";

const CartItem = ({ src, name, quantity, item, price }) => {
  const dispacth = useDispatch();
  return (
    <>
      <Wrapper>
        <IconWrapper>
          <TiDeleteOutline onClick={() => dispacth(removeItem(item))} />
        </IconWrapper>
        <Img src={src} alt={name} />
        <Div>
          <H2>{name}</H2>
          <P>{price} yen</P>
          <P>{quantity}</P>
        </Div>
      </Wrapper>
    </>
  );
};

const H2 = styled.h2`
  margin: 10px 10px 10px 20px;
  font-size: 20px;
`;

const P = styled.p`
  margin: 10px 10px 10px 20px;
  font-size: 14px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  margin-right: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
`;

export default CartItem;
