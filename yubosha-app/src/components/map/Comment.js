import React from "react";

const Comment = ({ show, comments }) => {
  return (
    <>
      {show
        ? comments.map((c, index) => {
            return (
              <div key={index}>
                <div >{c.msg}</div>
                <div>by: {c.by}</div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default Comment;
