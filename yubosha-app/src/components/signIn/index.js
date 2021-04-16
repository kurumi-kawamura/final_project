import React, { useContext, useState } from "react";
import Header from "../header/index";
import styled from "styled-components";
import {
  Btn,
  Wrapper,
  DisabledBtn,
  FormWrapper,
} from "../../decolation/FormItem";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../context";
import { ENsignIn, ENBtn } from "../../sentence/English";
import { JPsignIn, JPBtn } from "../../sentence/Japanese";
import { useDispatch } from "react-redux";
import { requestUserInfo } from "../../actions";

const SignIn = () => {
  const dispacth = useDispatch();
  const { lang, setCurrentUser } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [pass, setPass] = useState(null);
  const [success, setSuccess] = useState("idle");
  const history = useHistory();

  const logout = () => {
    setCurrentUser({});
    localStorage.removeItem("currentUser");
  };

  const signIn = () => {
    dispacth(requestUserInfo());
    fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ name: name, password: pass }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status === 200) {
          setCurrentUser(json.data);
          localStorage.setItem("currentUser", JSON.stringify(json.data));
          setSuccess("success");
          setName(null);
          setPass(null);
          history.push("/");
        } else {
          setSuccess("error");
        }
      });
  };
  return (
    <>
      <Header />

      {lang ? (
        <>
          <Wrapper>
            <FormWrapper></FormWrapper>
            <H1>{ENsignIn.signIn}</H1>
            <Input
              placeholder="username:"
              onChange={(e) => setName(e.target.value)}
            />
            <Input2
              placeholder="password:"
              onChange={(e) => setPass(e.target.value)}
            />

            <BtnWrapper>
              {name && pass ? (
                <Btn onClick={signIn}>{ENBtn.signIn}</Btn>
              ) : (
                <DisabledBtn>{ENBtn.signIn}</DisabledBtn>
              )}

              <LogoutBtn onClick={logout}>{ENBtn.logOut}</LogoutBtn>
            </BtnWrapper>
            <P>{ENsignIn.noAcc}</P>
            <LinkWrapper>
              <Link to="/CreateAcc">here</Link>
            </LinkWrapper>
          </Wrapper>
          {success === "success" && <Div>Success!</Div>}
          {success === "error" && <Div>{ENsignIn.noMatch}</Div>}
        </>
      ) : (
        <>
          <Wrapper>
            <FormWrapper></FormWrapper>
            <H1>{JPsignIn.signIn}</H1>
            <Input
              placeholder="username:"
              onChange={(e) => setName(e.target.value)}
            />
            <Input2
              placeholder="password:"
              onChange={(e) => setPass(e.target.value)}
            />
            <BtnWrapper>
              {name && pass ? (
                <Btn onClick={signIn}>{JPBtn.signIn}</Btn>
              ) : (
                <DisabledBtn>{JPBtn.signIn}</DisabledBtn>
              )}

              <LogoutBtn onClick={logout}>{JPBtn.logOut}</LogoutBtn>
            </BtnWrapper>
            <P>{JPsignIn.noAcc}</P>
            <LinkWrapper>
              <Link to="/CreateAcc">here</Link>
            </LinkWrapper>
          </Wrapper>
          {success === "success" && <Div>Success!</Div>}
          {success === "error" && <Div>{JPsignIn.noMatch}</Div>}
        </>
      )}
    </>
  );
};

const H1 = styled.h1`
  position: absolute;
  top: 160px;
  color: white;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  position: absolute;
  border: none;
  border-radius: 5px;
  top: 260px;
  padding: 10px;
  box-sizing: border-box;
`;

const Input2 = styled(Input)`
  top: 360px;
`;

const BtnWrapper = styled.div`
  position: absolute;
  top: 570px;
  color: var(--soft-gray);
  display: flex;
  flex-direction: column;
`;

const P = styled.p`
  position: absolute;
  top: 520px;
  font-size: 13px;
  color: var(--soft-black);
`;

const LinkWrapper = styled.div`
  position: absolute;
  top: 540px;
  font-size: 10px;
`;

const LogoutBtn = styled.button`
  border-radius: 5px;
  background-color: var(--soft-gray);
  color: white;
  border: none;
  width: 120px;
  height: 40px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 20px;
`;

const Div = styled.div`
  text-align: center;
`;

export default SignIn;
