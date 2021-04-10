import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../context";
import { RiAccountPinCircleLine } from "react-icons/ri";

const Header = () => {
  const { lang, setLang, currentUser } = useContext(AppContext);

  const change = () => {
    setLang(!lang);
  };
  return (
    <>
      <NavWrapper>
        {currentUser && <P>Hello {currentUser}</P>}
        <Btn onClick={change}>EN/JP</Btn>
        <StyledNavLink exact to="/">
          Home
        </StyledNavLink>
        <StyledNavLink exact to="/about">
          About
        </StyledNavLink>
        <StyledNavLink exact to="/map">
          Map
        </StyledNavLink>
        <StyledNavLink exact to="/signIn">
          <RiAccountPinCircleLine
            style={{ fill: "var(--soft-gray)", width: "25px", height: "25px" }}
          />
        </StyledNavLink>
      </NavWrapper>
    </>
  );
};

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledNavLink = styled(NavLink)`
  padding: 7px 10px;
  margin-top: 5px;
  text-decoration: none;
  position: relative;
  left: 80%;
  color: var(--soft-gray);

  &:hover {
    text-decoration: underline;
  }
`;

const Btn = styled.button`
  background: none;
  border: none;
  position: relative;
  left: 79%;
  margin-top: 13px;
  font-size: 15px;
  cursor: pointer;

  height: 20px;
  width: 50px;
  color: var(--soft-gray);

  &:hover {
    text-decoration: underline;
  }
`;

const P = styled.p`
  color: white;
`;

export default Header;