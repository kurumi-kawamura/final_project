import React, { useState } from "react";
import styled from "styled-components";
import { Btn } from "../decolation/FormItem";
import { useDispatch, useSelector } from "react-redux";
import { removeStockItem, addStockItem } from "../actions";

const UpdateStock = ({ id, name, src, price, inventory }) => {
  const dispatch = useDispatch();
  const [removeNum, setRemoveNum] = useState(null);
  const [addNum, setAddNum] = useState(null);
  const stock = useSelector((state) => state.item.items);

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
      <div>Id: {id}</div>
      <div>{name}</div>
      <Img src={src} alt={name} />
      <div>Price: {price}yen</div>
      <div>Stock: {inventory}</div>
      <InputWrapper>
        <Input onChange={(e) => setRemoveNum(e.target.value)} />
        <Div>
          <p>Remove stock for:</p>
          <Btn onClick={(e) => removeStock(e.target.innerHTML)}>{id}</Btn>
        </Div>
      </InputWrapper>
      <InputWrapper>
        <Input onChange={(e) => setAddNum(e.target.value)} />
        <Div>
          <p>Add stock for:</p>
          <Btn onClick={(e) => addStock(e.target.innerHTML)}>{id}</Btn>
        </Div>
      </InputWrapper>
    </>
  );
};

const Img = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
`;

const Input = styled.input`
  border-radius: 5px;
  width: 25px;
  height: 25px;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default UpdateStock;
