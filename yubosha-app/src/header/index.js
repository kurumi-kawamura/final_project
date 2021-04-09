import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <>
      <NavWrapper>
        <Btn>EN/JP</Btn>
        <StyledNavLink exact to="/">Home</StyledNavLink>
        <StyledNavLink exact to="/about">About</StyledNavLink>
        <StyledNavLink exact to="/map">Map</StyledNavLink>
      </NavWrapper>
    </>
  );
};

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledNavLink = styled(NavLink)`
padding: 5px 10px;
text-decoration: none;
position: relative;
left: 80%;


&:hover{
    text-decoration: underline;
}
`;

const Btn = styled.button`
background: none;
border: none;
position: relative;
left: 80%;
font-size: 15px;
cursor: pointer;
padding: 5px 10px;

&:hover{
    text-decoration: underline;
}
`;

export default Header;
