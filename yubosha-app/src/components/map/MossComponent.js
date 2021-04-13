import React from "react";
import styled from "styled-components";
import { GoLocation } from "react-icons/go";
import { RiPlantLine } from "react-icons/ri";

const MossComponent = ({ name, location, src }) => {
  return (
    <>
      <Wrapper>
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
        <Img src={src} alt={name} />
      </Wrapper>
    </>
  );
};

const Discription = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: var(--soft-gray);
  border-radius: 5px;
  width: 400px;
  height: 300px;
`;

const P = styled.p`
line-height: 30px;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

export default MossComponent;
