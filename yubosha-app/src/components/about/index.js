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
      <Wrapper>
        <H1>About us</H1>
        {lang ? <p>{ENabout.about}</p> : <p>{JPabout.about}</p>}
        <a
          href="https://camp-fire.jp/projects/view/348317"
          target="_blank"
          rel="noreferrer"
        >
          link
        </a>
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

const H1 = styled.h1`
  margin: 10px;
`;

export default About;
