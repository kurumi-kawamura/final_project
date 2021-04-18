import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewComment } from "../../actions";
import { AppContext } from "../../context";

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
        console.log(json);
        const { status } = json;
        if (status === 200) {
          dispatch(
            addNewComment({ msg: body, by: currentUser.userName, _id: id })
          );
        }
      });
  };
  return (
    <>
      <input onChange={(e) => setBody(e.target.value)} />
      <button onClick={submit}>Submit</button>
    </>
  );
};

export default AddComment;
