import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../context";
import { RiAccountPinCircleLine, RiPlantFill } from "react-icons/ri";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { header } from "../../sentence/Language";
import { useSelector } from "react-redux";
import NavbarSmall from "./Navbar-small";

const Header = () => {
  const { lang, setLang, currentUser, setCurrentUser } = useContext(AppContext);
  const cart = useSelector((state) => state.item.cart);
  const change = () => {
    if(lang==="EN"){

      setLang("JP");
    } else {
      setLang("EN");
    }
  };


  const logout = () => {
    setCurrentUser({});
    localStorage.removeItem("currentUser");
  };

  return (
    <>
    <NavSmallWrapper>
      <NavbarSmall/>
    </NavSmallWrapper>
      <NavWrapper>
        {Object.keys(currentUser).length !== 0 && lang ? (
          <P>Hello {currentUser.userName}!</P>
        ) : null}
        {Object.keys(currentUser).length !== 0 && !lang ? (
          <P>こんにちは {currentUser.userName}さん!</P>
        ) : null}
        {currentUser.admin ? (
          <StyledNavLink exact to="/admin">
            Admin
          </StyledNavLink>
        ) : null}
        <Btn onClick={change}>EN/JP</Btn>
          <>
            <StyledNavLink exact to="/">
              {header[`${lang}home`]}
            </StyledNavLink>
            <StyledNavLink exact to="/about">
              {header[`${lang}about`]}
            </StyledNavLink>
            <StyledNavLink exact to="/map">
              {header[`${lang}map`]}
            </StyledNavLink>
            <StyledNavLink exact to="/shop">
              {header[`${lang}shop`]}
            </StyledNavLink>
            <StyledNavLink exact to="/cart">
              {Object.values(cart).length > 0 ? (
                <Circle>
                  <RiPlantFill style={{ height: "25px" }} />
                </Circle>
              ) : null}
              <FiShoppingCart
                style={{
                  color: "var(--soft-gray)",
                  width: "25px",
                  height: "25px",
                }}
              />
            </StyledNavLink>
            {Object.keys(currentUser).length !== 0 ? (
              <Div>
                <FiLogOut
                  onClick={logout}
                  style={{
                    color: "var(--soft-gray)",
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                  }}
                />
              </Div>
            ) : (
              <StyledNavLink exact to="/signIn">
                <RiAccountPinCircleLine
                  style={{
                    fill: "var(--soft-gray)",
                    width: "25px",
                    height: "25px",
                  }}
                />
              </StyledNavLink>
            )}
          </>
       
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
  /* background-color: rgba(255, 255, 255, 0.5); */
  color: var(--soft-black);

  @media (max-width: 650px) {
    display: none;
  }
`;

const NavSmallWrapper = styled.div`


  @media (min-width: 650px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  padding: 7px 10px;
  margin-top: 5px;
  text-decoration: none;
  position: relative;
  color: var(--soft-gray);

  &:hover {
    text-decoration: underline;
  }
`;

const Div = styled.div`
  padding: 7px 10px;
  margin-top: 5px;
  text-decoration: none;
  position: relative;
  color: var(--soft-gray);
`;

const Btn = styled.button`
  background: none;
  border: none;
  position: relative;
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

const Circle = styled.div`
  position: absolute;
  top: 2px;
  left: 17px;
`;

export default Header;
