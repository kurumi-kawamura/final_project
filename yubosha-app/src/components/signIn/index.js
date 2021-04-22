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
import { signIn, button } from "../../sentence/Language";
import { useDispatch } from "react-redux";
import { requestUserInfo } from "../../actions";

const SignIn = () => {
  const dispacth = useDispatch();
  const { lang, setCurrentUser } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [pass, setPass] = useState(null);
  const [success, setSuccess] = useState("idle");
  const history = useHistory();

  const signInFunc = () => {
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
        <>
          <Wrapper>
            <H1>{signIn[`${lang}signIn`]}</H1>
            <FormWrapper></FormWrapper>
            <Input
              placeholder="username:"
              onChange={(e) => setName(e.target.value)}
            />
            <Input2
              placeholder="password:"
              type="password"
              onChange={(e) => setPass(e.target.value)}
            />
            <PassLink>
              <Link to="/forgetPassword" style={{ color: "white" }}>
                {signIn[`${lang}forgetPass`]}
              </Link>
            </PassLink>

            <BtnWrapper>
              {name && pass ? (
                <Btn onClick={signInFunc}>{button[`${lang}signIn`]}</Btn>
              ) : (
                <DisabledBtn>{button[`${lang}signIn`]}</DisabledBtn>
              )}
            </BtnWrapper>
            <P>{signIn[`${lang}noAcc`]}</P>
            <LinkWrapper>
              <Link to="/CreateAcc">{signIn[`${lang}here`]}</Link>
            </LinkWrapper>
          </Wrapper>
          {success === "success" && <Div>Success!</Div>}
          {success === "error" && <Div>{signIn[`${lang}noMatch`]}</Div>}
        </>
      
    </>
  );
};

const H1 = styled.h1`
  text-align: center;
  margin-top: 70px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  position: absolute;
  border: none;
  border-radius: 5px;
  top: 280px;
  padding: 10px;
  box-sizing: border-box;
`;

const Input2 = styled(Input)`
  top: 440px;
`;
const BtnWrapper = styled.div`
  position: absolute;
  top: 650px;
  color: var(--soft-gray);
  display: flex;
  flex-direction: column;
`;

const P = styled.p`
  position: absolute;
  top: 600px;
  font-size: 13px;
  color: var(--soft-black);
`;

const LinkWrapper = styled.div`
  position: absolute;
  top: 620px;
  font-size: 10px;
`;

const PassLink = styled(LinkWrapper)`
  position: absolute;
  top: 485px;
  font-size: 15px;
  color: white;
`;

const Div = styled.div`
  text-align: center;
`;

export default SignIn;
