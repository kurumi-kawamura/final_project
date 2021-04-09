import React from "react";
import Header from "../header/index";
import styled from "styled-components";

const About = () => {
  return (
    <>
      <Wrapper>
        <Header />

        <div>About</div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  color: var(--soft-black);
`;

export default About;
