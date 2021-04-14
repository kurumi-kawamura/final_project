import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  addItemInCart,
  receiveItemsDataError,
  receiveSingleItemData,
  requestItemsData,
} from "../../actions";
import { Btn, DisabledBtn } from "../../decolation/FormItem";
import Header from "../header/index";

const Item = () => {
  const dispacth = useDispatch();
  const item = useSelector((state) => state.item.item);

  const { _id } = useParams();

  useEffect(() => {
    dispacth(requestItemsData());

    fetch(`/items/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        const { status, data } = json;
        if (status === 200) {
          dispacth(receiveSingleItemData(data));
        } else {
          dispacth(receiveItemsDataError());
        }
      });
  }, []);
  return (
    <>
      <Header />
      {item ? (
        <Wrapper>
          <Img src={item.imgSrc} alt={item.ItemName} />
          <DeatilWrapper>
            <ItemName>{item.ItemName}</ItemName>
            <Detail>detail....</Detail>
            <Price>{item.price} yen</Price>
            {item.stock > 0 ? (
              <Btn
                onClick={() => {
                  dispacth(addItemInCart(item));
                }}
              >
                Add to cart
              </Btn>
            ) : (
              <>
                <DisabledBtn disabled={true}>Add to cart</DisabledBtn>
                <P>Currently sold out.</P>
              </>
            )}
          </DeatilWrapper>
        </Wrapper>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 150px;
`;

const DeatilWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 100px;
`;

const ItemName = styled.h2`
  margin-bottom: 50px;
`;

const Detail = styled.p`
  margin-bottom: 200px;
`;

const Img = styled.img`
  width: 500px;
  height: 500px;
  margin-left: -200px;
`;

const P = styled.p`
  margin-top: 10px;
  font-size: 13px;
`;

const Price = styled.p`
margin-bottom: 20px;
font-size: 14px;
`;

export default Item;
