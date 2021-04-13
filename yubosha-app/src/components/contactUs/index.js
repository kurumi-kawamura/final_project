import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../header/index";
import { Btn } from "../../decolation/FormItem";
import { AppContext } from "../../context";
import { ENContactUs } from "../../sentence/English";
import { JPContactUs } from "../../sentence/Japanese";

const ContactUs = () => {
  const { lang } = useContext(AppContext);
  return (
    <>
      <Header />
      <Wrapper>
        <H1>Contact us</H1>
        <FormWrapper>
          {lang ? (
            <>
              <Input placeholder={ENContactUs.email} />
              <TextArea placeholder={ENContactUs.askus} />
            </>
          ) : (
            <>
              <Input placeholder={JPContactUs.email} />
              <TextArea placeholder={JPContactUs.askus} />
            </>
          )}
        </FormWrapper>
        <BtnWrapper>
          <Btn>Submit</Btn>
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
  margin-bottom: 30px;
  margin-top: 10px;
  box-sizing: border-box;
  padding: 10px;
`;

const TextArea = styled.textarea`
  width: 350px;
  height: 450px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
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
`;

export default ContactUs;
