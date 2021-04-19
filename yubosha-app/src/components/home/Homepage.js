import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../header/index";
import HPAnimation from "../../decolation/homepage_animation";
import Footer from "../footer/index";
import { gsap } from "gsap";

const Homepage = () => {
  useEffect(() => {
    gsap.to(".YU", { duration: 1, x: -100 });
    gsap.to(".BO", { duration: 1, x: 100 });
    gsap.to(".SHA", { duration: 1, x: -100 });
  }, []);
  return (
    <>
      <Wrapper>
        <Header />
        <Container>
          <Logo>
            <span className="YU">YU</span>
            <span className="BO">BO</span>
            <span className="SHA">SHA</span>
          </Logo>
          {/* <AnimationWrapper>
            <HPAnimation />
          </AnimationWrapper> */}
        </Container>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const AnimationWrapper = styled.div``;

const Wrapper = styled.div`
  background-image: url("./assets/tony-anananana-qOXWUIDZOqM-unsplash.jpg");
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  /* position: absolute;
  width: 92px;
  height: 174px;
  left: 454px;
  top: 330px; */
  font-size: 60px;
`;

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 1%;
  right: 2%;
`;

export default Homepage;
