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
      <H1>About us</H1>
      <Wrapper>
        {lang ? (
          <ExWrapper>
            <p>{ENabout.about1}</p>
            <Img src="./assets/yubosha_activity.jpg" alt="yubosha activity" />
            <p>{ENabout.about2}</p>
            <Img src="./assets/yubosha_activity_2.jpg" alt="yubosha activity" />
          </ExWrapper>
        ) : (
          <ExWrapper>
            <p>{JPabout.about1}</p>
            <Img src="./assets/yubosha_activity.jpg" alt="yubosha activity" />
            <p>{JPabout.sbout2}</p>
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

export default About;
