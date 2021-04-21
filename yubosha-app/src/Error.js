import React from "react";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <>
      <Wrapper>
        <div>Oppos! Something went wrong... Please try again...</div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default ErrorPage;
