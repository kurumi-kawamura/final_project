import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
import { ENsignIn, ENBtn, ENContactUs } from "../../sentence/English";
import { JPsignIn, JPBtn, JPContactUs } from "../../sentence/Japanese";
import Header from "../header/index";
import styled from "styled-components";
import { Btn, Wrapper, DisabledBtn } from "../../decolation/FormItem";
import { useHistory } from "react-router";
import { RiErrorWarningLine } from "react-icons/ri";

const CreateAcc = () => {
  const { lang } = useContext(AppContext);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [sucsess, setSucsess] = useState("idle");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const submitNewUser = (e) => {
    e.preventDefault();
    if (name && pass && email) {
      fetch("/createAcc", {
        method: "POST",
        body: JSON.stringify({ name: name, password: pass, email: email }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const { status } = json;
          if (status === 200) {
            setSucsess("succsess");
            history.push("/signIn");
          } else if (status === 400) {
            setSucsess("duplicate");
            setName(null);
            setPass(null);
          } else {
            setSucsess("error");
            setName(null);
            setPass(null);
          }
        });
    }
  };

  const emailValidation = (email) => {
    if (email) {
      const valid = email.includes("@") && email.includes(".");
      if (valid) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <>
      <Header />
      <H1>Create Account</H1>
      <Wrapper>
        {lang ? (
          <>
            <FormWrapper>
              <P>{ENsignIn.createAcc}</P>
              <Input onChange={(e) => setName(e.target.value)} />
              <P>{ENsignIn.enterEmail}</P>
              <Input onChange={(e) => setEmail(e.target.value)} />
              <p>{ENContactUs.emailValid}</p>
              <P>{ENsignIn.createPass}</P>
              <Input
                type="password"
                onChange={(e) => setPass(e.target.value)}
              />
              <Warning>
                <IconWrapper>
                  <RiErrorWarningLine />
                </IconWrapper>
                <p>{ENsignIn.passRequirement}</p>
              </Warning>
            </FormWrapper>
            <BtnWrapper>
              {name.length > 0 && emailValidation(email) && pass.length > 5 ? (
                <>
                  <Btn onClick={(e) => submitNewUser(e)}>{ENBtn.confirm}</Btn>
                </>
              ) : (
                <>
                  <DisabledBtn disabled={true}>{ENBtn.confirm}</DisabledBtn>
                </>
              )}
            </BtnWrapper>
          </>
        ) : (
          <>
            <FormWrapper>
              <P>{JPsignIn.createAcc}</P>
              <Input onChange={(e) => setName(e.target.value)} />
              <P>{JPsignIn.enterEmail}</P>
              <Input onChange={(e) => setEmail(e.target.value)} />
              <p>{JPContactUs.emailValid}</p>
              <P>{JPsignIn.createPass}</P>
              <Input
                type="password"
                onChange={(e) => setPass(e.target.value)}
              />
              <Warning>
                <IconWrapper>
                  <RiErrorWarningLine />
                </IconWrapper>
                <p>{JPsignIn.passRequirement}</p>
              </Warning>
            </FormWrapper>
            <BtnWrapper>
              {name.length > 0 && pass.length > 5 && emailValidation(email) ? (
                <>
                  <Btn onClick={(e) => submitNewUser(e)}>{JPBtn.confirm}</Btn>
                </>
              ) : (
                <>
                  <DisabledBtn disabled={true}>{JPBtn.confirm}</DisabledBtn>
                </>
              )}
            </BtnWrapper>
          </>
        )}
      </Wrapper>
      {sucsess === "succsess" && <Div>Success!</Div>}
      {sucsess === "error" && (
        <>{lang ? <Div>{ENsignIn.error}</Div> : <Div>{JPsignIn.error}</Div>}</>
      )}
      {sucsess === "duplicate" && (
        <>
          {lang ? (
            <Div>{ENsignIn.duplicate}</Div>
          ) : (
            <Div>{JPsignIn.duplicate}</Div>
          )}
        </>
      )}
    </>
  );
};

const H1 = styled.h1`
  text-align: center;
  margin-top: 70px;
`;

const P = styled.p`
  margin-top: 40px;
`;

const Input = styled.input`
  border: none;
  width: 200px;
  height: 30px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 20px;
  box-sizing: border-box;
  padding: 10px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("/assets/tony-anananana-qOXWUIDZOqM-unsplash.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 450px;
  width: 500px;
  border-radius: 10px;
  margin-top: 60px;
  color: white;

  @media (max-width: 540px) {
    width: 400px;
  }
`;

const BtnWrapper = styled.div`
  margin-top: 20px;
`;

const Div = styled.div`
  text-align: center;
`;

const Warning = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: row;
`;

const IconWrapper = styled.span`
  padding-top: 2px;
  margin-right: 3px;
`;

export default CreateAcc;
