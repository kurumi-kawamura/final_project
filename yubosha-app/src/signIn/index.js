import React from "react";
import Header from "../header/index";
import styled from "styled-components";
import Button from "../decolation/Button";

const SignIn = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <FormWrapper></FormWrapper>
        <H1>SignIn</H1>
        <Input placeholder="username:" />
        <Input2 placeholder="password:" />
        <BtnWrapper>
          <Button>Sign in</Button>
        </BtnWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  background-image: url("./assets/tony-anananana-qOXWUIDZOqM-unsplash.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: blur(1.5px);
  height: 600px;
  width: 500px;
  border-radius: 10px;
  margin-top: 100px;
`;

const H1 = styled.h1`
  position: absolute;
  top: 200px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  position: absolute;
  border: none;
  border-radius: 5px;
  top: 300px;
  padding: 10px;
  box-sizing: border-box;
`;

const Input2 = styled(Input)`
  top: 400px;
`;

const BtnWrapper = styled.div`
  position: absolute;
  top: 600px;
  color: var(--soft-gray);
`;

export default SignIn;
