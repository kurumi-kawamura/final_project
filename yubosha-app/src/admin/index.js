import React from "react";
import Header from "../components/header/index";
import styled from "styled-components";

const Admin = () => {
  return (
    <>
      <Header />
      <H1>Admin</H1>
    </>
  );
};

const H1 = styled.h1`
  margin-top: 70px;
  text-align: center;
`;

export default Admin;
