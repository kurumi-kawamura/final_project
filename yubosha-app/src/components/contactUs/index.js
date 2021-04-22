import React, { useContext, useState } from "react";
import styled from "styled-components";
import Header from "../header/index";
import { Btn, DisabledBtn } from "../../decolation/FormItem";
import { AppContext } from "../../context";
import { contactUs, button } from "../../sentence/Language";
import {
  AiOutlineYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";
import { BsCloud } from "react-icons/bs";

const ContactUs = () => {
  const { lang } = useContext(AppContext);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [body, setBody] = useState(null);


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
        .then((res) => {
          console.log(res)
          return res.json()})
        .then((json) => {
          console.log(json)
          const { status } = json;
          if (status === "success") {
            alert("Message Sent.");
            resetForm();
            document.querySelector(".inputFeild").value = "";
            document.querySelector(".inputFeild2").value = "";
            document.querySelector(".inputFeild3").value = "";
          } else if (status === "fail") {
            alert("Message failed to send.");
          }
        });
  };

  const resetForm = () => {
    setName(null);
    setEmail(null);
    setBody(null);
  };

  return (
    <>
      <Header />
      <H1>Contact us</H1>
      <Container>
        <Wrapper>
          <FormWrapper>
              <>
                <Input
                  placeholder={contactUs[`${lang}name`]}
                  onChange={(e) => setName(e.target.value)}
                  className="inputFeild"
                />
                <Input
                  placeholder={contactUs[`${lang}email`]}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inputFeild2"
                />
                <P>{contactUs[`${lang}emailValid`]}</P>
                <TextArea
                  placeholder={contactUs[`${lang}askus`]}
                  onChange={(e) => setBody(e.target.value)}
                  className="inputFeild3"
                />
              </>
          
          </FormWrapper>
          <BtnWrapper>
              <>
                {name && emailValidation(email) && body ? (
                  <Btn onClick={submit}>{button[`${lang}submit`]}</Btn>
                ) : (
                  <DisabledBtn disabled={true}>{button[`${lang}submit`]}</DisabledBtn>
                )}
                <Btn type="reset" onClick={resetForm}>
                  {button[`${lang}clear`]}
                </Btn>
              </>
          </BtnWrapper>
        </Wrapper>

        <IconWrapper>
          <a
            href="https://camp-fire.jp/projects/view/404287"
            target="_blank"
            rel="noreferrer"
          >
            <BsCloud
              style={{
                width: "50px",
                height: "50px",
                fill: "var(--soft-gray)",
              }}
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UChVt91DKeuMDi4bGlVZ5_Aw"
            target="_blank"
            rel="noreferrer"
          >
            <AiOutlineYoutube
              style={{
                width: "50px",
                height: "50px",
                fill: "var(--soft-gray)",
              }}
            />
          </a>
          <a
            href="https://www.instagram.com/yu_bo_sha/"
            target="_blank"
            rel="noreferrer"
          >
            <AiOutlineInstagram
              style={{
                width: "50px",
                height: "50px",
                fill: "var(--soft-gray)",
              }}
            />
          </a>
        </IconWrapper>
      </Container>
    </>
  );
};

const H1 = styled.h1`
  margin-top: 70px;
  margin-bottom: 20px;
  text-align: center;
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  font-size: 13px;
  position: relative;
  top: -15px;
  color: rgba(252, 252, 252, 0.6);
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 200px;
  margin-left: 20px;
`;

export default ContactUs;
