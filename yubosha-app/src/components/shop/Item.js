import React, { useContext, useEffect } from "react";
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
import { ENEachItem } from "../../sentence/English";
import { JPEachItem } from "../../sentence/Japanese";
import { AppContext } from "../../context";

const Item = () => {
  const dispacth = useDispatch();
  const item = useSelector((state) => state.item.item);
  const { lang } = useContext(AppContext);

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
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <Wrapper>
        {item ? (
          <>
            <Img src={item.imgSrc} alt={item.ItemName} />
            <DeatilWrapper>
              {lang ? (
                <>
                  <ItemName>{item.ItemName}</ItemName>
                  <Detail>{ENEachItem.detail}</Detail>
                  <Price>
                    {item.price} {ENEachItem.price}
                  </Price>
                  {item.stock > 0 ? (
                    <Btn
                      onClick={() => {
                        dispacth(addItemInCart(item));
                      }}
                    >
                      {ENEachItem.addCart}
                    </Btn>
                  ) : (
                    <>
                      <DisabledBtn disabled={true}>
                        {ENEachItem.addCart}
                      </DisabledBtn>
                      <P>{ENEachItem.soldout}</P>
                    </>
                  )}
                </>
              ) : (
                <>
                  <ItemName>{item.ItemName}</ItemName>
                  <Detail>{JPEachItem.detail}</Detail>
                  <Price>
                    {item.price} {JPEachItem.price}
                  </Price>
                  {item.stock > 0 ? (
                    <Btn
                      onClick={() => {
                        dispacth(addItemInCart(item));
                      }}
                    >
                      {JPEachItem.addCart}
                    </Btn>
                  ) : (
                    <>
                      <DisabledBtn disabled={true}>
                        {JPEachItem.addCart}
                      </DisabledBtn>
                      <P>{JPEachItem.soldout}</P>
                    </>
                  )}
                </>
              )}
            </DeatilWrapper>
          </>
        ) : (
          <Loading>
            <div>Loading...</div>
          </Loading>
        )}
      </Wrapper>
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

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Item;
