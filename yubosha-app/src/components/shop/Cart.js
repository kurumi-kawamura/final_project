import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Btn, DisabledBtn, Loading } from "../../decolation/FormItem";
import CartItem from "./CartItem";
import { loadStripe } from "@stripe/stripe-js";
import { AppContext } from "../../context";
import { cartStuff } from "../../sentence/Language";
import Footer from "../footer/index";
import Spinner from "../../decolation/spinner";

//test publick key
const { REACT_APP_TSET_PK_KEY } = process.env;
const stripePromise = loadStripe(REACT_APP_TSET_PK_KEY);

const Cart = () => {
  const cart = useSelector((state) => state.item.cart);
  const cartItem = Object.values(cart);
  const [total, setTotal] = useState(0);
  const [checkout, setCheckout] = useState(null);

  const { setCartIds, setCartQuantitys, setCartStocks, lang } = useContext(
    AppContext
  );

  let arr = [];
  let idArr = [];
  let quantityArr = [];
  let stockArr = [];
  useEffect(() => {
    let sum = 0;
    cartItem.forEach((item) => {
      arr.push({
        price_data: {
          currency: "jpy",
          product_data: { name: item.ItemName },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      });
      sum = sum + Number(item.price);
      idArr.push(item._id);
      quantityArr.push(item.quantity);
      stockArr.push(item.stock + item.quantity);
    });
    setTotal(sum);
    setCheckout(arr);
    localStorage.setItem("ids", JSON.stringify(idArr));
    setCartIds(idArr);
    localStorage.setItem("quantitys", JSON.stringify(quantityArr));
    setCartQuantitys(quantityArr);
    localStorage.setItem("stocks", JSON.stringify(stockArr));
    setCartStocks(stockArr);
    // eslint-disable-next-line
  }, [cart]);

  const createCheckout = async (e) => {
    const stripe = await stripePromise;

    const response = await fetch("/create-checkout-session", {
      method: "POST",
      body: JSON.stringify(checkout),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
      <H1>Cart</H1>
      <Container>
        <Div>
          <ItemContainer>
            {cartItem.length === 0 && (
              <Empty>
                <p>{cartStuff[`${lang}empty`]}</p>
              </Empty>
            )}

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
              <Loading>
                <div>
                  <Spinner />
                  Loading...
                </div>
              </Loading>
            )}
          </ItemContainer>
        </Div>

        <BtnWrapper>
            <>
              <P>
                Total: {total} {cartStuff[`${lang}price`]}
              </P>
              {cartItem.length !== 0 ? (
                <Btn role="link" onClick={createCheckout}>
                  {cartStuff[`${lang}proceed`]}
                </Btn>
              ) : (
                <DisabledBtn>{cartStuff[`${lang}proceed`]}</DisabledBtn>
              )}
            </>
        
        </BtnWrapper>
      </Container>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
};

const H1 = styled.h1`
  margin-top: 70px;
  text-align: center;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 400px) {
    width: 340px;
  }
`;

const BtnWrapper = styled.div`
  margin-top: 90px;
`;

const P = styled.p`
  margin-bottom: 10px;
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const FooterWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Div = styled.div`
  border: 1.5px solid rgba(133, 132, 131, 0.6);
  border-radius: 10px;
  width: 800px;
  margin-top: 30px;
  @media (max-width: 800px) {
    width: 600px;
  }
  @media (max-width: 600px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    width: 300px;
  }
`;

export default Cart;
