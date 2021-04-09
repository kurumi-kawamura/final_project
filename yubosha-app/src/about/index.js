import React from "react";
import Header from "../header/index";
import styled from "styled-components";

const About = () => {
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <div>About</div>
    </>
  );
};

const HeaderWrapper = styled.div`
  color: var(--soft-black);
`;

export default About;
