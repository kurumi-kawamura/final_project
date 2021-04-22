import React, { useContext, useEffect, useState } from "react";
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
import { ENEachItem } from "../../sentence/Language";
import { JPEachItem } from "../../sentence/Japanese";
import { AppContext } from "../../context";
import Spinner from "../../decolation/spinner";
const Item = () => {
  const dispacth = useDispatch();
  const item = useSelector((state) => state.item.item);
  const { lang } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const { _id } = useParams();
  const cart = useSelector((state) => state.item.cart);

  useEffect(() => {
    dispacth(requestItemsData());
    setLoading(true);

    fetch(`/items/${_id}`)
      .then((res) => res.json())
      .then((json) => {
        const { status, data } = json;
        if (status === 200) {
          dispacth(receiveSingleItemData(data));
          setLoading(false);
        } else {
          dispacth(receiveItemsDataError());
          setLoading(false);
        }
      });
    // eslint-disable-next-line
  }, [_id]);

  return (
    <>
      <Wrapper>
        {item && !loading ? (
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
                  {Object.keys(cart).length > 0 &&
                  Object.keys(cart).includes(item.ItemName) ? (
                    <>
                      {cart[item.ItemName].stock > 0 ? (
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
            <div>
              <Spinner />
              Loading...
            </div>
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
  align-items: center;
  margin-top: 150px;

  @media (max-width: 950px) {
    flex-direction: column;
  }
`;

const DeatilWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 100px;

  @media (max-width: 950px) {
    margin-top: 50px;
    margin-bottom: 30px;
    margin-left: 0;
  }
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
  /* margin-left: -200px; */
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
