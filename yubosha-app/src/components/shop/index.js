import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  receiveItemsData,
  receiveItemsDataError,
  requestItemsData,
} from "../../actions";
import { Loading } from "../../decolation/FormItem";
import Footer from "../footer/index";
import Spinner from "../../decolation/spinner";

const Shop = () => {
  const dispacth = useDispatch();
  const items = useSelector((state) => state.item.items);
  const [loading, setLoading] = useState(true);

  const counter = useRef(0);

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= items.length) {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispacth(requestItemsData());
    fetch("/items")
      .then((res) => res.json())
      .then((json) => {
        const { status, data } = json;
        if (status === 200) {
          dispacth(receiveItemsData(data));
        } else {
          dispacth(receiveItemsDataError());
        }
      });
    // eslint-disable-next-line
  }, [loading]);
  return (
    <>
      <H1>Shop</H1>
      <Container>
        <Wrapper>
          <Loading>
            <div style={{ display: loading ? "block" : "none" }}>
              <Spinner />
              Loading...
            </div>
          </Loading>
          {items
            ? items.map((item) => {
                return (
                  <div
                    key={item._id}
                    style={{ display: loading ? "none" : "block" }}
                  >
                    <>
                      <Div>
                        <Img
                          src={item.imgSrc}
                          alt={item.itemName}
                          onLoad={imageLoaded}
                        />
                        <StyledNavLink exact to={`/shop/${item._id}`}>
                          <Btn>Click me</Btn>
                        </StyledNavLink>
                      </Div>
                      <ItemName>{item.ItemName}</ItemName>
                    </>
                  </div>
                );
              })
            : null}
        </Wrapper>
      </Container>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  height: 70%;
  margin-bottom: 20px;
`;

const H1 = styled.h1`
  text-align: center;
  margin-top: 70px;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  width: 800px;
  margin-bottom: 50px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
  margin: 60px 30px 30px 20px;
`;

const ItemName = styled.div`
  text-align: center;
`;

const Btn = styled.button`
  border: 2px solid white;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  color: white;
  cursor: pointer;
  position: absolute;
  font-size: 15px;
  background: none;
  animation: 1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const FooterWrapper = styled.div`
  position: absolute;
  bottom: -18%;
  right: 45%;
`;

const StyledNavLink = styled(NavLink)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Shop;
