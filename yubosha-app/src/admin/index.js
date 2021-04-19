import React, { useEffect } from "react";
import Header from "../components/header/index";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveRequestError,
  receiveRequestInfo,
  requestRequestInfo,
  requestItemsData,
  receiveItemsData,
  receiveItemsDataError,
} from "../actions";
import { Loading } from "../decolation/FormItem";
import Request from "./Request";
import UpdateStock from "./UpdateStock";

const Admin = () => {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.admin.request);
  const stock = useSelector((state) => state.item.items);

  useEffect(() => {
    dispatch(requestRequestInfo());
    fetch("/getRequest")
      .then((res) => res.json())
      .then((json) => {
        const { status } = json;
        if (status === 200) {
          dispatch(receiveRequestInfo(json.data));
        } else if (status === 404) {
          dispatch(receiveRequestError());
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    dispatch(requestItemsData());
    fetch("/items")
      .then((res) => res.json())
      .then((json) => {
        const { status, data } = json;
        if (status === 200) {
          dispatch(receiveItemsData(data));
        } else {
          dispatch(receiveItemsDataError());
        }
      });
  }, []);

  return (
    <>
      <Header />
      <H1>Admin</H1>
      {request ? (
        <>
          <RequestWrapper>
            {request.map((req, index) => {
              return (
                <div key={req._id}>
                  <Request
                    index={index}
                    name={req.name}
                    location={req.location}
                    by={req.submittedBy}
                    src={req.imgSrc}
                  />
                </div>
              );
            })}
          </RequestWrapper>
        </>
      ) : (
        <div>No request.</div>
      )}
      {stock ? (
        <>
          <StockWrapper>
            {stock.map((s) => {
              return (
                <div key={s._id}>
                  <UpdateStock
                  id={s._id}
                  name={s.ItemName}
                  src={s.imgSrc}
                  price={s.price}
                  inventory={s.stock}
                  />
                </div>
              );
            })}
          </StockWrapper>
        </>
      ) : (
        <Loading>Loading...</Loading>
      )}
    </>
  );
};

const H1 = styled.h1`
  margin-top: 70px;
  text-align: center;
`;


const RequestWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const StockWrapper = styled(RequestWrapper)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default Admin;
