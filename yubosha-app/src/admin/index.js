import React, { useEffect, useState } from "react";
import Header from "../components/header/index";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  receiveRequestError,
  receiveRequestInfo,
  requestRequestInfo,
  addNewMossInfo,
  deleteRequest,
  requestItemsData,
  receiveItemsData,
  receiveItemsDataError,
  removeStockItem,
  addStockItem,
} from "../actions";
import { Btn, Loading } from "../decolation/FormItem";

const Admin = () => {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.admin.request);
  const stock = useSelector((state) => state.item.items);
  const [removeNum, setRemoveNum] = useState(null);
  const [addNum, setAddNum] = useState(null);

  useEffect(() => {
    dispatch(requestRequestInfo());
    fetch("/getRequest")
      .then((res) => res.json())
      .then((json) => {
        const { status } = json;
        if (status === 200) {
          dispatch(receiveRequestInfo(json.data));
        } else if(status===404) {
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

  const approve = (e) => {
    // e.preventDefault();

    fetch("/addNewMoss", {
      method: "POST",
      body: JSON.stringify({
        name: request[e - 1].name,
        location: request[e - 1].location,
        src: request[e - 1].imgSrc,
        submittedBy: request[e - 1].submittedBy,
        _id: request[e - 1]._id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { status } = json;
        if (status === 200) {
          dispatch(addNewMossInfo(json.data));
          dispatch(deleteRequest(e - 1));
          alert(`Added #${e}!`);
        } else {
        }
      });
  };

  const removeStock = (id) => {
    const find = stock.find((item) => {
      return Number(item._id) === Number(id);
    });
    fetch("/updateStock", {
      method: "POST",
      body: JSON.stringify({
        _id: [Number(id)],
        quantity: [Number(removeNum)],
        stock: [find.stock],
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { status } = json;
        if (status === 200) {
          dispatch(
            removeStockItem({ _id: Number(id), quantity: Number(removeNum) })
          );
          alert("success");
          setRemoveNum(null);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addStock = (id) => {
    const find = stock.find((item) => {
      return Number(item._id) === Number(id);
    });
    fetch("/addStock", {
      method: "POST",
      body: JSON.stringify({
        _id: [Number(id)],
        quantity: [Number(addNum)],
        stock: [find.stock],
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { status } = json;
        if (status === 200) {
          dispatch(addStockItem({ _id: Number(id), quantity: Number(addNum) }));
          alert("success");
          setAddNum(null);
        } else {

        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
                  <span className="index">{index + 1}</span>
                  <div>{req.name}</div>
                  <div>{req.location}</div>
                  <div>{req.submittedBy}</div>
                  <Img src={req.imgSrc} alt={request.name} />
                  <p>Approve for:</p>
                  <Btn onClick={(e) => approve(e.target.innerHTML)}>
                    {index + 1}
                  </Btn>
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
            {stock.map((s, index) => {
              return (
                <div key={s._id}>
                  <div>Id: {s._id}</div>
                  <div>{s.ItemName}</div>
                  <Img src={s.imgSrc} alt={s.ItemName} />
                  <div>Price: {s.price}yen</div>
                  <div>Stock: {s.stock}</div>
                  <div>
                    <input onChange={(e) => setRemoveNum(e.target.value)} />
                    <p>Remove stock for:</p>
                    <Btn onClick={(e) => removeStock(e.target.innerHTML)}>
                      {s._id}
                    </Btn>
                  </div>
                  <div>
                    <input onChange={(e) => setAddNum(e.target.value)} />
                    <p>Add stock for:</p>
                    <Btn onClick={(e) => addStock(e.target.innerHTML)}>
                      {s._id}
                    </Btn>
                  </div>
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

const Img = styled.img`
  width: 150px;
  height: 150px;
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
