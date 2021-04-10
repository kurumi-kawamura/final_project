import React, { useContext } from "react";
import { AppContext } from "../../context";
import { ENsignIn } from "../../sentence/English";
import { JPsignIn } from "../../sentence/Japanese";
import Header from "../header/index";
import styled from "styled-components";
import Button from "../../decolation/Button";

const CreateAcc = () => {
  const { lang, setUserName, setPassword } = useContext(AppContext);

  return (
    <>
      <Header />
      <Wrapper>
        <FormWrapper>
          <H1>Create Account</H1>
          {lang ? <P>{ENsignIn.createAcc}</P> : <P>{JPsignIn.createAcc}</P>}
          <Input onChange={(e) => setUserName(e.target.value)} />
          {lang ? <P>{ENsignIn.createPass}</P> : <P>{JPsignIn.createPass}</P>}
          <Input onChange={(e) => setPassword(e.target.value)} />
        </FormWrapper>
        <BtnWrapper>
          <Button>Confirm</Button>
        </BtnWrapper>
      </Wrapper>
    </>
  );
};

const H1 = styled.h1`
  color: white;
  margin-top: 30px;
`;

const P = styled.p`
  margin-top: 40px;
`;

const Input = styled.input`
  border: none;
  width: 200px;
  height: 30px;
  border-radius: 5px;
  margin-bottom: 30px;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-image: url("./assets/tony-anananana-qOXWUIDZOqM-unsplash.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 400px;
  width: 500px;
  border-radius: 10px;
  margin-top: 100px;
  color: white;
`;

const BtnWrapper = styled.div`
  margin-top: 20px;
`;

export default CreateAcc;
