import React, { useContext, useState } from "react";
import Header from "../header/index";
import styled from "styled-components";
import { Btn, FormWrapper, Wrapper } from "../../decolation/FormItem";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";
import { ENsignIn } from "../../sentence/English";
import { JPsignIn } from "../../sentence/Japanese";

const SignIn = () => {
  const { lang, setCurrentUser } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [pass, setPass] = useState(null);
  const [success, setSuccess] = useState("idle");

  const logout = () => {
    setCurrentUser(null);
  };

  const signIn = () => {
    fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ name: name, password: pass }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { status } = data;
        if (status === 200) {
          setCurrentUser(name);
          setSuccess("success");
        } else {
          setSuccess("error");
        }
      });
  };
  return (
    <>
      <Header />
      <Wrapper>
        <FormWrapper></FormWrapper>
        {lang ? <H1>{ENsignIn.signIn}</H1> : <H1>{JPsignIn.signIn}</H1>}
        <Input
          placeholder="username:"
          onChange={(e) => setName(e.target.value)}
        />
        <Input2
          placeholder="password:"
          onChange={(e) => setPass(e.target.value)}
        />
        <BtnWrapper>
          <Btn onClick={signIn}>Sign in</Btn>
          <LogoutBtn onClick={logout}>Log out</LogoutBtn>
        </BtnWrapper>
        {lang ? <P>{ENsignIn.noAcc}</P> : <P>{JPsignIn.noAcc}</P>}
        <LinkWrapper>
          <Link exact to="/CreateAcc">
            here
          </Link>
        </LinkWrapper>
      </Wrapper>
      {success === "success" && <Div>Success!</Div>}
      {success === "error" && <Div>Not found!</Div>}
    </>
  );
};


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
  display: flex;
  flex-direction: column;
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

const LogoutBtn = styled.button`
  border-radius: 5px;
  background-color: var(--soft-gray);
  color: white;
  border: none;
  width: 100px;
  height: 30px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 20px;
`;

const Div = styled.div`
  text-align: center;
`;

export default SignIn;
