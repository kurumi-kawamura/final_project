import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
import { ENsignIn } from "../../sentence/English";
import { JPsignIn } from "../../sentence/Japanese";
import Header from "../header/index";
import styled from "styled-components";
import { Btn, Wrapper } from "../../decolation/FormItem";
import { useHistory } from "react-router";

const CreateAcc = () => {
  const { lang } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [pass, setPass] = useState(null);
  const [sucsess, setSucsess] = useState("idle");
  const history = useHistory();

  const submitNewUser = (e) => {
    e.preventDefault();
    if (name && pass) {
      fetch("/createAcc", {
        method: "POST",
        body: JSON.stringify({ name: name, password: pass }),
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
            setName(null);
            setPass(null);
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
  return (
    <>
      <Header />
      <Wrapper>
        <FormWrapper>
          <H1>Create Account</H1>
          {lang ? <P>{ENsignIn.createAcc}</P> : <P>{JPsignIn.createAcc}</P>}
          <Input onChange={(e) => setName(e.target.value)} />
          {lang ? <P>{ENsignIn.createPass}</P> : <P>{JPsignIn.createPass}</P>}
          <Input onChange={(e) => setPass(e.target.value)} />
        </FormWrapper>
        <BtnWrapper>
          <Btn onClick={submitNewUser}>Confirm</Btn>
        </BtnWrapper>
      </Wrapper>
      {sucsess === "succsess" && <Div>Success!</Div>}
      {sucsess === "error" && <Div>Error! Please try again.</Div>}
      {sucsess === "duplicate" && (
        <Div>
          Someone is using the username already. Please enter different
          username.
        </Div>
      )}
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
  box-sizing: border-box;
  padding: 10px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const Div = styled.div`
  text-align: center;
`;

export default CreateAcc;
