import React, { useContext, useEffect, useRef } from "react";
import Header from "../header/index";
import styled from "styled-components";
import { AppContext } from "../../context";
import { ENabout } from "../../sentence/English";
import { JPabout } from "../../sentence/Japanese";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const { lang } = useContext(AppContext);
  let item = useRef(null);
  let secondArticle = useRef(null);
  let pic1 = useRef(null);
  let pic2 = useRef(null);
  let pic3 = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(item, 3, {
      opacity: 1,
      y: -30,
      ease: Power3.easeOut,
      scrollTrigger: { trigger: item, markers: true },
    });

    gsap.to(secondArticle, 3, {
      opacity: 1,
      y: -30,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: secondArticle,
        markers: true,
        start: "top center",
        end: "bottom top",
      },
    });

    gsap.to(pic1, 3, {
      opacity: 1,
      x: -30,
      ease: Power3.easeOut,
      scrollTrigger: { trigger: pic1, markers: true },
    });

    gsap.to(pic2, 3, {
      opacity: 1,
      x: -30,
      ease: Power3.easeOut,
      scrollTrigger: { trigger: pic2, markers: true },
    });

    gsap.to(pic3, 3, {
      opacity: 1,
      x: -30,
      ease: Power3.easeOut,
      scrollTrigger: { trigger: pic3, markers: true },
    });
  }, []);

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
            <P
              ref={(el) => {
                item = el;
              }}
              id="firstArticle"
            >
              {ENabout.about1}
            </P>
            <Img
              ref={(e) => {
                pic1 = e;
              }}
              src="./assets/nicole-y-c-raiiC47ZV7E-unsplash.jpg"
              alt="yubosha about"
            />
            <H2>Activity</H2>
            <P
              ref={(e) => {
                secondArticle = e;
              }}
              id="secondAriticle"
            >
              {ENabout.about2}
            </P>
            <Img
              ref={(e) => {
                pic2 = e;
              }}
              src="./assets/yubosha_activity.jpg"
              alt="yubosha activity"
            />
            <Img
              ref={(e) => {
                pic3 = e;
              }}
              src="./assets/yubosha_activity_2.jpg"
              alt="yubosha activity"
            />
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
  text-align: center;
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
  opacity: 0;
`;

const P = styled.p`
  margin-top: 70px;
  opacity: 0;
  line-height: 30px;
`;

const H2 = styled.h2`
  margin-top: 30px;
`;

export default About;
