import React, { useContext, useState } from "react";
import Header from "../header/index";
import styled from "styled-components";
import Button from "../../decolation/Button";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../context";
import { ENsignIn } from "../../sentence/English";
import { JPsignIn } from "../../sentence/Japanese";

const SignIn = () => {
  const { lang, setCurrentUser, userName, password } = useContext(AppContext);
  const [pass, setPass] = useState(null);
  const [enteredUserName, setEnteredUserName] = useState(null);

  const history = useHistory();

  const signIn = () => {
    if (password === pass && userName === enteredUserName) {
      history.push("/");
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <FormWrapper></FormWrapper>
        {lang ? <H1>{ENsignIn.signIn}</H1> : <H1>{JPsignIn.signIn}</H1>}
        <Input
          placeholder="username:"
          onChange={(e) => setEnteredUserName(e.target.value)}
        />
        <Input2
          placeholder="password:"
          onChange={(e) => setPass(e.target.value)}
        />
        <BtnWrapper>
          <Button onClick={signIn}>Sign in</Button>
        </BtnWrapper>
        {lang ? <P>{ENsignIn.noAcc}</P> : <P>{JPsignIn.noAcc}</P>}
        <LinkWrapper>
          <Link exact to="/CreateAcc">
            here
          </Link>
        </LinkWrapper>
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
  height: 400px;
  width: 500px;
  border-radius: 10px;
  margin-top: 100px;
`;

const H1 = styled.h1`
  position: absolute;
  top: 200px;
  color: white;
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

const P = styled.p`
  position: absolute;
  top: 560px;
  font-size: 13px;
  color: var(--soft-black);
`;

const LinkWrapper = styled.div`
  position: absolute;
  top: 575px;
  font-size: 10px;
`;

export default SignIn;
