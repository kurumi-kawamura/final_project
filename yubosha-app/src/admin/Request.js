import React from "react";
import { Btn } from "../decolation/FormItem";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addNewMossInfo, deleteRequest } from "../actions";

const Request = ({ index, name, location, by, src }) => {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.admin.request);

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

  return (
    <>
      <Wrapper>
        <span className="index">{index + 1}</span>
        <div>{name}</div>
        <div>Location: {location}</div>
        <div>Submitted by: {by}</div>
        <Img src={src} alt={name} />
        <p>Approve for:</p>
        <Btn onClick={(e) => approve(e.target.innerHTML)}>{index + 1}</Btn>
      </Wrapper>
    </>
  );
};

const Img = styled.img`
  width: 150px;
  height: 150px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 35px;
`;

export default Request;
