import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GoLocation } from "react-icons/go";
import { RiPlantLine, RiCloseCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { FaRegComment } from "react-icons/fa";
import Comment from "./Comment";
import { AppContext } from "../../context";

const MossComponent = ({ location, setClicked }) => {
  const moss = useSelector((state) => state.map.info);
  const close = () => {
    setClicked(null);
  };
  const [mossArr, setMossArr] = useState(null);
  const [show, setShow] = useState(false);

  const { currentUser } = useContext(AppContext);

  let arr = [];
  useEffect(() => {
    moss.forEach((m) => {
      if (m.location === location) {
        arr.push(m);
      }
    });
    setMossArr(arr);
    // eslint-disable-next-line
  }, [moss, location]);
  return (
    <>
      <Wrapper>
        <IconWrapper>
          <RiCloseCircleLine onClick={close} />
        </IconWrapper>
        {mossArr ? (
          mossArr.map((moss) => {
            return (
              <MossWrapper key={moss._id}>
                <Discription>
                  <P>
                    <RiPlantLine />
                    {moss.name}
                  </P>
                  <P>
                    <GoLocation />
                    {moss.location}
                  </P>
                </Discription>
                {moss.imgSrc ? (
                  <Img src={moss.imgSrc} alt={moss.name} />
                ) : (
                  <div>No picture avilable</div>
                )}
                <div>
                  <P2>Submitted by {moss.submittedBy}</P2>
                </div>
                <IconWrapper>
                  <FaRegComment onClick={() => setShow(!show)} />
                </IconWrapper>
                <Comment
                  id={moss._id}
                  show={show}
                  comments={moss.comments}
                  currentUser={currentUser}
                />
              </MossWrapper>
            );
          })
        ) : (
          <div>Loading/...</div>
        )}
      </Wrapper>
    </>
  );
};

const MossWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0;
  margin: 10px 0;
`;

const Discription = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-top: 10px;

  &:hover {
  }
`;

const P2 = styled(P)`
  text-align: center;
  color: rgba(54, 54, 54, 0.6);
  margin-top: 10px;
`;

export default MossComponent;
