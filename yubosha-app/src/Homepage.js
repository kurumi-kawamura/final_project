import React from "react";
import styled from "styled-components";


const Homepage = () => {
  return (
    <>
      <Wrapper>
          Homepage
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

export default Homepage;
