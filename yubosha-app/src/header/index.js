import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <>
      <NavWrapper>
        <StyledNavLink exact to="/">EN/JP</StyledNavLink>
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
left: 1300px;

&:hover{
    text-decoration: underline;
}
`;

export default Header;
