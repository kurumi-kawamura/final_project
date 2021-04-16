import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../context";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { ENheader } from "../../sentence/English";
import { JPheader } from "../../sentence/Japanese";

const Header = () => {
  const { lang, setLang, currentUser } = useContext(AppContext);

  const change = () => {
    setLang(!lang);
  };
  return (
    <>
      <NavWrapper>
        {Object.keys(currentUser).length !== 0 && lang ? (
          <P>Hello {currentUser.userName}!</P>
        ) : null}
        {Object.keys(currentUser).length !== 0 && !lang ? (
          <P>こんにちは {currentUser.userName}さん!</P>
        ) : null}
        <Btn onClick={change}>EN/JP</Btn>
        {lang ? (
          <>
            <StyledNavLink exact to="/">
              {ENheader.home}
            </StyledNavLink>
            <StyledNavLink exact to="/about">
              {ENheader.about}
            </StyledNavLink>
            <StyledNavLink exact to="/map">
              {ENheader.map}
            </StyledNavLink>
            <StyledNavLink exact to="/shop">
              {ENheader.shop}
            </StyledNavLink>
            <StyledNavLink exact to="/cart">
              <FiShoppingCart
                style={{
                  color: "var(--soft-gray)",
                  width: "25px",
                  height: "25px",
                }}
              />
            </StyledNavLink>
            <StyledNavLink exact to="/signIn">
              <RiAccountPinCircleLine
                style={{
                  fill: "var(--soft-gray)",
                  width: "25px",
                  height: "25px",
                }}
              />
            </StyledNavLink>
          </>
        ) : (
          <>
            <StyledNavLink exact to="/">
              {JPheader.home}
            </StyledNavLink>
            <StyledNavLink exact to="/about">
              {JPheader.about}
            </StyledNavLink>
            <StyledNavLink exact to="/map">
              {JPheader.map}
            </StyledNavLink>
            <StyledNavLink exact to="/shop">
              {JPheader.shop}
            </StyledNavLink>
            <StyledNavLink exact to="/cart">
              <FiShoppingCart
                style={{
                  color: "var(--soft-gray)",
                  width: "25px",
                  height: "25px",
                }}
              />
            </StyledNavLink>
            <StyledNavLink exact to="/signIn">
              <RiAccountPinCircleLine
                style={{
                  fill: "var(--soft-gray)",
                  width: "25px",
                  height: "25px",
                }}
              />
            </StyledNavLink>
          </>
        )}
      </NavWrapper>
    </>
  );
};

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  right: 2%;
  top: 1%;
`;

const StyledNavLink = styled(NavLink)`
  padding: 7px 10px;
  margin-top: 5px;
  text-decoration: none;
  position: relative;
  /* left: 80%; */
  color: var(--soft-gray);

  &:hover {
    text-decoration: underline;
  }
`;

const Btn = styled.button`
  background: none;
  border: none;
  position: relative;
  /* left: 79%; */
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
  color: var(--soft-gray);
  position: relative;
  margin-top: 5px;
  padding: 7px 10px;
`;

export default Header;
