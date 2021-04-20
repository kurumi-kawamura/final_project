import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Header from "../header/index";
import { gsap } from "gsap";
import About from "../about/index";
import { TiArrowSortedDown } from "react-icons/ti";

const Homepage = () => {
  let tl = gsap.timeline();
  useEffect(() => {
    tl.to(".YU", { duration: 1, y: -50, opacity: 1 });
    tl.to(".BO", { duration: 1, y: -50, opacity: 1 });
    tl.to(".SHA", { duration: 1, y: -50, opacity: 1 });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Wrapper>
        <Header />
        <Container>
          <Logo>
            <YU className="YU">YU</YU>
            <BO className="BO">BO</BO>
            <SHA className="SHA">SHA</SHA>
          </Logo>
        </Container>
        <Arrow>
          <TiArrowSortedDown
            style={{
              fiil: "white",
              textAlign: "center",
              width: "50px",
              height: "50px",
              zIndex: 10,
            }}
          />
        </Arrow>
      </Wrapper>
      <About />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const bounce = keyframes`
   0% { transform: translateY(-12px);}
    50% {  transform: translateY(0px); }
    100% { transform: translateY(-12px); }
  
  `;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 70px;
  animation: ${bounce} 1s infinite;
`;

const Wrapper = styled.div`
  background-image: url("./assets/tony-anananana-qOXWUIDZOqM-unsplash.jpg");
  height: 900px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  margin-bottom: 160px;
`;

const YU = styled.span`
  opacity: 0;
`;

const BO = styled(YU)``;

const SHA = styled(YU)``;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 60px;
`;

export default Homepage;
