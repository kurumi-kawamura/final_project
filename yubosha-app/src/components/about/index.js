import React, { useContext } from "react";
import Header from "../header/index";
import styled from "styled-components";
import { AppContext } from "../../context";
import { ENabout } from "../../sentence/English";
import { JPabout } from "../../sentence/Japanese";

const About = () => {
  const { lang } = useContext(AppContext);
  return (
    <>
      <Header />

      <Banner>
        <H1>About us</H1>
      </Banner>
      <Wrapper>
        {lang ? (
          <ExWrapper>
            <H2>About Yubosha</H2>
            <P>{ENabout.about1}</P>
            <H2>Activity</H2>
            <P>{ENabout.about2}</P>
            <Img src="./assets/yubosha_activity.jpg" alt="yubosha activity" />
            <Img src="./assets/yubosha_activity_2.jpg" alt="yubosha activity" />
          </ExWrapper>
        ) : (
          <ExWrapper>
            <H2>About Yubosha</H2>
            <P>{JPabout.about1}</P>
            <H2>Activity</H2>
            <P>{JPabout.about2}</P>
            <Img src="./assets/yubosha_activity.jpg" alt="yubosha activity" />
            <Img src="./assets/yubosha_activity_2.jpg" alt="yubosha activity" />
          </ExWrapper>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  color: var(--soft-black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  background-image: url("./assets/tony-anananana-qOXWUIDZOqM-unsplash.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  /* background-position: center; */
  color: white;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const ExWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  margin: 70px;
  text-align: center;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
  margin: 50px;
  border-radius: 10px;
`;

const P = styled.p`
  margin-top: 30px;
`;

const H2 = styled.h2`
  margin-top: 30px;
`;

export default About;
