import React from "react";
import { CgMenuCake } from "react-icons/cg";
import styled from "styled-components";

const NavbarSmall = () => {
  return (
    <>
      <Wrapper>
        <CgMenuCake
          style={{
            width: "40px",
            height: "40px",
            color: "var(--soft-gray)",
            cursor: "pointer",
          }}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 3px;
`;

export default NavbarSmall;
