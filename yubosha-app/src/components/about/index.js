import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { AppContext } from "../../context";
import { ENabout } from "../../sentence/English";
import { JPabout } from "../../sentence/Japanese";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../footer/index";

const About = () => {
  const { lang } = useContext(AppContext);
  let item = useRef(null);
  let mossArticle = useRef(null);
  let secondArticle = useRef(null);
  let pic1 = useRef(null);
  let terrariumPic = useRef(null);
  let pic2 = useRef(null);
  let pic3 = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(item, 3, {
      opacity: 1,
      y: -30,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: item,
        start: "top center",
      },
    });

    gsap.to(mossArticle, 3, {
      opacity: 1,
      y: -30,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: mossArticle,
        start: "20px 80%",
      },
    });

    gsap.to(secondArticle, 3, {
      opacity: 1,
      y: -30,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: secondArticle,
        start: "top center",
      },
    });

    gsap.to(pic1, 3, {
      opacity: 1,
      x: -30,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: pic1,
        start: "20px 80%",
      },
    });

    gsap.to(terrariumPic, 3, {
      opacity: 1,
      x: 30,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: secondArticle,
        start: "20px 150%",
      },
    });

    gsap.to(pic2, 3, {
      opacity: 1,
      x: 30,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: pic2,
        start: "60px 80%",
      },
    });

    gsap.to(pic3, 3, {
      opacity: 1,
      x: -30,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: pic3,
        start: "60px 80%",
      },
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Banner>
        <H1>About us</H1>
      </Banner>
      <Wrapper>
        {lang ? (
          <ExWrapper>
            <H2>About Yubosha</H2>
            <Div>
              <SentenceWrapper>
                <P
                  ref={(el) => {
                    item = el;
                  }}
                  id="firstArticle"
                >
                  {ENabout.about1}
                </P>
              </SentenceWrapper>
              <Img
                ref={(e) => {
                  pic1 = e;
                }}
                src="./assets/nicole-y-c-raiiC47ZV7E-unsplash.jpg"
                alt="yubosha about"
              />
            </Div>
            <H2>Moss Terrarium</H2>
            <Div>
              <Terra
                src="./assets/moss_terrarium_stairs.jpg"
                alt="stairs terrarium"
                ref={(e) => {
                  terrariumPic = e;
                }}
              />
              <PDiv
                ref={(e) => {
                  mossArticle = e;
                }}
              >
                <p>
                  {ENabout.about2}
                </p>
                
              </PDiv>
            </Div>
            <H2>Activity</H2>
            <P
              ref={(e) => {
                secondArticle = e;
              }}
              id="secondAriticle"
            >
              {ENabout.about2}
            </P>
            <Div2>
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
            </Div2>
          </ExWrapper>
        ) : (
          <ExWrapper>
            <H2>About Yubosha</H2>
            <Div>
              <SentenceWrapper>
                <P
                  ref={(el) => {
                    item = el;
                  }}
                  id="firstArticle"
                >
                  {JPabout.about1}
                </P>
              </SentenceWrapper>
              <Img
                ref={(e) => {
                  pic1 = e;
                }}
                src="./assets/nicole-y-c-raiiC47ZV7E-unsplash.jpg"
                alt="yubosha about"
              />
            </Div>
            <H2>Moss Terrarium</H2>
            <Div>
              <Terra
                src="./assets/moss_terrarium_stairs.jpg"
                alt="stairs terrarium"
                ref={(e) => {
                  terrariumPic = e;
                }}
              />
              <PDiv
                ref={(e) => {
                  mossArticle = e;
                }}
              >
                <p>
                  ガラス容器にちいさな自分だけの世界をつくることができます。
                </p>
                <p>
                  条件はありますが、食卓や机のうえなど、とても身近な生活空間で育てることができます。
                </p>
                <p>苔も生きています。</p>
                <p>
                  毎日の生活のなかに苔を取り入れ手入れをしながら一緒に過ごしてみませんか。
                </p>
                <p>きっと、生活のなかに潤いがプラスされるでしょう。</p>
              </PDiv>
            </Div>

            <H2>Activity</H2>
            <P
              ref={(e) => {
                secondArticle = e;
              }}
              id="secondAriticle"
            >
              {JPabout.about2}
            </P>
            <Div2>
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
            </Div2>
          </ExWrapper>
        )}
      </Wrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Div2 = styled(Div)`
  margin-top: 10px;
`;

const SentenceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 800px) {
    width: 500px;
  }
  @media (max-width: 650px) {
    width: 400px;
  }

  @media (max-width: 450px) {
    width: 250px;
  }
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

const Terra = styled(Img)`
  width: 300px;
  height: 250px;
  margin-top: 130px;
  /* border-radius: 50%; */
`;

const P = styled.p`
  margin-top: 70px;
  opacity: 0;
  line-height: 40px;
  text-align: left;
`;

const PDiv = styled.div`
  margin-top: 70px;
  opacity: 0;
  line-height: 40px;
  text-align: left;
`;

const H2 = styled.h2`
  margin-top: 70px;
`;

const FooterWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export default About;
