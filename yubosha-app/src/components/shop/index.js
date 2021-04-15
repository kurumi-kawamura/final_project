import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  receiveItemsData,
  receiveItemsDataError,
  requestItemsData,
} from "../../actions";
import Header from "../header/index";

const Shop = () => {
  const dispacth = useDispatch();
  const items = useSelector((state) => state.item.items);

  useEffect(() => {
    dispacth(requestItemsData());
    fetch("/items")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const { status, data } = json;
        if (status === 200) {
          dispacth(receiveItemsData(data));
        } else {
          dispacth(receiveItemsDataError());
        }
      });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <H1>Shop</H1>
      <Container>
        <Wrapper>
          {items ? (
            items.map((item) => {
              return (
                <div key={item._id}>
                  <Div>
                    <Img src={item.imgSrc} alt={item.itemName} />
                    <StyledNavLink exact to={`/shop/${item._id}`}>

                        <Btn>Click me</Btn>
                      {/* <CircleAnimation/> */}
                    </StyledNavLink>
                  </Div>
                  <ItemName>{item.ItemName}</ItemName>
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
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

  &:hover{
    transform: scale(1.1);
  }
`;

const StyledNavLink = styled(NavLink)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Shop;
