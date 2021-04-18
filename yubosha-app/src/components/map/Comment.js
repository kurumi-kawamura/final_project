import React from "react";

const Comment = ({ show, comments }) => {
  return (
    <>
      {show
        ? comments.map((c) => {
            return (
              <>
                <div>{c.msg}</div>
                <div>by: {c.by}</div>
              </>
            );
          })
        : null}
    </>
  );
};

export default Comment;
