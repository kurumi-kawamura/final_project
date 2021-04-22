import React, { useContext } from "react";
import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { removeItem } from "../../actions";
import { cartStuff } from "../../sentence/Language";
import { AppContext } from "../../context";

const CartItem = ({ src, name, quantity, item, price }) => {
  const { lang } = useContext(AppContext);
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
          <P>{cartStuff[`${lang}quantity`]}: {quantity}</P>
          <P>{cartStuff[`${lang}Price`]}: {price} yen</P>
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
  margin-right: 60px;
  @media (max-width: 500px) {
    margin-right: 0;
    margin-bottom: 30px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  /* width: 800px; */

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
  margin-left: 50px;
  @media (max-width: 500px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
`;

export default CartItem;
