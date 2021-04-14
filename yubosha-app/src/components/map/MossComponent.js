import React from "react";
import styled from "styled-components";
import { GoLocation } from "react-icons/go";
import { RiPlantLine, RiCloseCircleLine } from "react-icons/ri";

const MossComponent = ({ name, location, src, setClicked, submit }) => {
  console.log(src);
  const close = () => {
    setClicked(null);
  };
  return (
    <>
      <Container>
        <Wrapper>
          <IconWrapper>
            <RiCloseCircleLine onClick={close} />
          </IconWrapper>
          <Discription>
            <P>
              <RiPlantLine />
              {name}
            </P>
            <P>
              <GoLocation />
              {location}
            </P>
          </Discription>
          {src ? <Img src={src} alt={name} /> : <div>No picture avilable</div>}
        </Wrapper>
        <p>Submitted by {submit}</p>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--soft-gray);
  border-radius: 5px;
  width: 400px;
  height: 300px;
`;

const Discription = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const P = styled.p`
  line-height: 30px;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const IconWrapper = styled.div`
  cursor: pointer;

  &:hover {
  }
`;

export default MossComponent;
