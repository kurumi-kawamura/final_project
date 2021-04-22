import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./context";
import { error } from "./sentence/Language";

const ErrorPage = () => {
  const { lang } = useContext(AppContext);
  return (
    <>
      <Wrapper>
        <div>{error[`${lang}error`]}</div>
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
