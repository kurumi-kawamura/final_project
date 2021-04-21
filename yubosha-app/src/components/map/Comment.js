import React from "react";
import styled from "styled-components";
import AddComment from "./AddComment";

const Comment = ({ show, comments, id, currentUser }) => {
  return (
    <>
      {show && comments ? (
        <>
          {comments.length === 0 && <P2>No comments yet.</P2>}
          {comments.map((c, index) => {
            return (
              <>
                <Wrapper key={index}>
                  <P>{c.msg}</P>
                  <P2>by: {c.by}</P2>
                </Wrapper>
                <Line />
              </>
            );
          })}
          {Object.keys(currentUser).length !== 0 && <AddComment id={id} />}
        </>
      ) : null}
    </>
  );
};

const Wrapper = styled.div`
  margin: 7px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 160px;
`;

const P = styled.p``;

const P2 = styled.p`
  font-size: 14px;
  color: rgba(54, 54, 54, 0.6);
`;

const Line = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  width: 200px;
  height: 0.5px;
`;

export default Comment;
