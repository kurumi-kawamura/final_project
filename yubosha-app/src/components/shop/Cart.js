import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../header/index";
import { Btn, DisabledBtn, Loading } from "../../decolation/FormItem";
import CartItem from "./CartItem";
import { loadStripe } from "@stripe/stripe-js";
import { AppContext } from "../../context";
import { ENCart } from "../../sentence/English";
import { JPCart } from "../../sentence/Japanese";
import Footer from "../footer/index";
import Spinner from "../../decolation/spinner";

const stripePromise = loadStripe(
  "pk_test_51IgXFuKRpDc8HQiOmMK1Tjef7LlhQ5zcNbZ5D05eTzaXa41WPMen6lwyPxsN0CO1mbQQquTi6HwUXBL2L7uSmOYw00ePJKyETc"
);

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
      <Header />
      <H1>Cart</H1>
      <Container>
        <ItemContainer>
          {lang && cartItem.length === 0 && (
            <Empty>
              <p>{ENCart.empty}</p>
            </Empty>
          )}
          {!lang && cartItem.length === 0 && (
            <Empty>
              <p>{JPCart.empty}</p>
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
        <BtnWrapper>
          {lang ? (
            <>
              <P>
                Total: {total} {ENCart.price}
              </P>
              {cartItem.length !== 0 ? (
                <Btn role="link" onClick={createCheckout}>
                  {ENCart.proceed}
                </Btn>
              ) : (
                <DisabledBtn>{ENCart.proceed}</DisabledBtn>
              )}
            </>
          ) : (
            <>
              <P>
                Total: {total} {JPCart.price}
              </P>
              {cartItem.length !== 0 ? (
                <Btn role="link" onClick={createCheckout}>
                  {JPCart.proceed}
                </Btn>
              ) : (
                <DisabledBtn>{JPCart.proceed}</DisabledBtn>
              )}
            </>
          )}
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
`;

const BtnWrapper = styled.div`
  /* position: absolute;
  top: 400px;
  right: 300px; */
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
  position: fixed;
  bottom: 1%;
  right: 45%;
  text-align: center;
`;
export default Cart;
