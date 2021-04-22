import React, { useEffect, useRef, useState } from "react";
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
  requestMapInfo,
  receiveMapInfo,
  receiveMapInfoError,
} from "../actions";
import { Loading } from "../decolation/FormItem";
import Request from "./Request";
import UpdateStock from "./UpdateStock";
import Spinner from "../decolation/spinner";

const Admin = () => {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.admin.request);
  const stock = useSelector((state) => state.item.items);
  const [loading, setLoading] = useState(true);

  const counter = useRef(0);

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= stock.length) {
      setLoading(false);
    }
  };

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
        console.log(err);
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

    dispatch(requestMapInfo());
    fetch("/moss")
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveMapInfo(data.data));
      })
      .catch((err) => dispatch(receiveMapInfoError()));

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <H1>Admin</H1>
      <Container>
        {stock ? (
          <>
            <H2>Stock</H2>
            <div style={{ display: loading ? "block" : "none" }}>
              <Spinner />
              Loading...
            </div>
            <StockWrapper>
              {stock.map((s) => {
                return (
                  <Div key={s._id}>
                    <UpdateStock
                      style={{ display: loading ? "none" : "block" }}
                      id={s._id}
                      name={s.ItemName}
                      src={s.imgSrc}
                      price={s.price}
                      inventory={s.stock}
                      imageLoaded={imageLoaded}
                    />
                  </Div>
                );
              })}
            </StockWrapper>
          </>
        ) : (
          <Loading>Loading...</Loading>
        )}
        <H2>Request</H2>
        <RequestWrapper>
          {request ? (
            <>
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
            </>
          ) : (
            <div>No request.</div>
          )}
        </RequestWrapper>
      </Container>
    </>
  );
};

const H1 = styled.h1`
  margin-top: 70px;
  text-align: center;
`;

const H2 = styled.h2`
  margin-top: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RequestWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 20px;
  height: 400px;
`;

const StockWrapper = styled(RequestWrapper)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;
  height: 500px;
  @media (max-width: 860px) {
    height: 1100px;
  }

  @media (max-width: 460px) {
    height: 2200px;
  }
`;

const Div = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  line-height: 30px;
`;

export default Admin;
