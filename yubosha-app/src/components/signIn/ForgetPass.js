import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { AppContext } from "../../context";
import { Btn, DisabledBtn } from "../../decolation/FormItem";
import { ENResetPass, ENBtn } from "../../sentence/Language";
import { JPResetPass, JPBtn } from "../../sentence/Japanese";

const ForgotPass = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [users, setUsers] = useState(null);
  const history = useHistory();
  const { lang } = useContext(AppContext);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const { status } = json;
        if (status === 200) {
          setUsers(json.data);
        }
      });
  }, []);

  const change = () => {
    fetch("/updatePassword", {
      method: "POST",
      body: JSON.stringify({ username: username, newPass: newPass }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const { status } = json;
        if (status === 200) {
          history.push("/signIn");
        }
      });
  };

  const check = () => {
    if (email && username) {
      const find = users.find((user) => {
        return user.email === email;
      });
      if (find) {
        if (find.userName === username) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };

  return (
    <>
      <H1>Reset Password</H1>
      <Container>
        <FormWrapper>
          {lang ? (
            <>
              <label>{ENResetPass.username}</label>
              <Input onChange={(e) => setUsername(e.target.value)} />
              <label>{ENResetPass.email}</label>
              <Input onChange={(e) => setEmail(e.target.value)} />
              <label>{ENResetPass.newPass}</label>
              <Input
                type="password"
                onChange={(e) => setNewPass(e.target.value)}
              />
              {check() && newPass.length > 5 ? (
                <Btn onClick={change}>{ENBtn.confirm}</Btn>
              ) : (
                <DisabledBtn disabled={true} onClick={change}>
                  {ENBtn.confirm}
                </DisabledBtn>
              )}
              <P>
                {ENResetPass.warning}
              </P>
            </>
          ) : (
            <>
              <label>{JPResetPass.username}</label>
              <Input onChange={(e) => setUsername(e.target.value)} />
              <label>{JPResetPass.email}</label>
              <Input onChange={(e) => setEmail(e.target.value)} />
              <label>{JPResetPass.newPass}</label>
              <Input
                type="password"
                onChange={(e) => setNewPass(e.target.value)}
              />
              {check() && newPass.length > 5 ? (
                <Btn onClick={change}>{JPBtn.confirm}</Btn>
              ) : (
                <DisabledBtn disabled={true} onClick={change}>
                  {JPBtn.confirm}
                </DisabledBtn>
              )}
              <P>
                {JPResetPass.warning}
              </P>
            </>
          )}
        </FormWrapper>
      </Container>
    </>
  );
};

const H1 = styled.h1`
  text-align: center;
  margin-top: 70px;
`;

const Input = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 5px;
  border: none;
  margin: 20px 0;
  box-sizing: border-box;
  padding: 10px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  text-align: center;
  font-size: 12px;
  width: 250px;
  margin-top: 10px;
`;

export default ForgotPass;
