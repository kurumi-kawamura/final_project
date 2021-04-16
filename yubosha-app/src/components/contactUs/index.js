import React, { useContext, useState } from "react";
import styled from "styled-components";
import Header from "../header/index";
import { Btn, DisabledBtn } from "../../decolation/FormItem";
import { AppContext } from "../../context";
import { ENContactUs, ENBtn } from "../../sentence/English";
import { JPContactUs, JPBtn } from "../../sentence/Japanese";

const ContactUs = () => {
  const { lang } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [body, setBody] = useState(null);
  const [emailValid, setEmailValid] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    fetch("/send", {
      method: "POST",
      body: JSON.stringify({ name: name, email: email, message: body }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { status } = json;
        if (status === "success") {
          alert("Message Sent.");
          resetForm();
        } else if (status === "fail") {
          alert("Message failed to send.");
        }
      });
  };

  const resetForm = () => {
    setName(null);
    setEmail(null);
    setBody(null);
    setEmailValid(false);
  };

  const emailValidation = (email) => {
    if (email) {
      const valid = email.includes("@") && email.includes(".");
      if (valid) {
        setEmailValid(true);
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <>
      <Header />
      <Wrapper>
        <H1>Contact us</H1>
        <FormWrapper>
          {lang ? (
            <>
              <Input
                placeholder={ENContactUs.name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder={ENContactUs.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!emailValid && <P>{ENContactUs.emailValid}</P>}
              <TextArea
                placeholder={ENContactUs.askus}
                onChange={(e) => setBody(e.target.value)}
              />
            </>
          ) : (
            <>
              <Input
                placeholder={JPContactUs.name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder={JPContactUs.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!emailValid && <P>{JPContactUs.emailValid}</P>}
              <TextArea
                placeholder={JPContactUs.askus}
                onChange={(e) => setBody(e.target.value)}
              />
            </>
          )}
        </FormWrapper>
        <BtnWrapper>
          {lang ? (
            <>
              {name && emailValidation(email) && body ? (
                <Btn onClick={(e) => submit(e)}>{ENBtn.submit}</Btn>
              ) : (
                <DisabledBtn>{ENBtn.submit}</DisabledBtn>
              )}
              <Btn type="reset" onClick={resetForm}>
                {ENBtn.clear}
              </Btn>
            </>
          ) : (
            <>
              {name && emailValidation(email) && body ? (
                <Btn onClick={(e) => submit(e)}>{JPBtn.submit}</Btn>
              ) : (
                <DisabledBtn>{JPBtn.submit}</DisabledBtn>
              )}
              <Btn type="reset" onClick={resetForm}>
                {JPBtn.clear}
              </Btn>
            </>
          )}
        </BtnWrapper>
      </Wrapper>
    </>
  );
};

const H1 = styled.h1`
  margin-top: 30px;
`;

const Input = styled.input`
  border: none;
  width: 350px;
  height: 30px;
  border-radius: 5px;
  margin-bottom: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  padding: 10px;
`;

const TextArea = styled.textarea`
  width: 350px;
  height: 400px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("./assets/tony-anananana-qOXWUIDZOqM-unsplash.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 600px;
  width: 500px;
  border-radius: 10px;
  margin-top: 50px;
  color: white;
`;

const BtnWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 300px;
`;

const P = styled.p`
  font-size: 13px;
  position: relative;
  top: -15px;
  color: rgba(252, 252, 252, 0.6);
`;

export default ContactUs;
