import React from "react";
import styled from "styled-components";
import Header from "../header/index";
import HPAnimation from "../decolation/homepage_animation";
import Footer from "../footer/index";

const Homepage = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <Logo>
          <span>YU</span>
          <span>BO</span>
          <span>SHA</span>
        </Logo>
        <HPAnimation />
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-image: url("./assets/tony-anananana-qOXWUIDZOqM-unsplash.jpg");
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 92px;
  height: 174px;
  left: 454px;
  top: 330px;
  font-size: 50px;
`;

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 1%;
  right: 2%;
`;

export default Homepage;
