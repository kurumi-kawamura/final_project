import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewComment } from "../../actions";
import { AppContext } from "../../context";
import styled from "styled-components";

const AddComment = ({ id }) => {
  const [body, setBody] = useState(null);
  const { currentUser } = useContext(AppContext);
  const dispatch = useDispatch();

  const submit = () => {
    fetch("/addComment", {
      method: "POST",
      body: JSON.stringify({ msg: body, by: currentUser.userName, _id: id }),
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
            addNewComment({ msg: body, by: currentUser.userName, _id: id })
          );
          setBody(null);
        }
      });
    document.querySelector(".inputFeild").value = "";
  };
  return (
    <>
      <Wrapper>
        <Input
          onChange={(e) => setBody(e.target.value)}
          className="inputFeild"
        />
        <Button onClick={submit}>Post</Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
`;

const Button = styled.button`
  background: none;
  border: none;
  margin-left: 5px;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid;
  width: 120px;
  margin-right: 5px;
  box-sizing: border-box;
  padding: 5px;
`;

export default AddComment;
