import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../context";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { ENheader } from "../../sentence/English";
import { JPheader } from "../../sentence/Japanese";
import { useSelector } from "react-redux";

const Header = () => {
  const { lang, setLang, currentUser, setCurrentUser } = useContext(AppContext);
  const cart = useSelector((state) => state.item.cart);

  const change = () => {
    setLang(!lang);
  };

  const logout = () => {
    setCurrentUser({});
    localStorage.removeItem("currentUser");
  };

  console.log(Object.keys(currentUser).length);
  return (
    <>
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
              {Object.values(cart).length > 0 ? <Circle></Circle> : null}
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
  width: 12px;
  height: 12px;
  background-color: var(--soft-gray);
  border-radius: 50%;
  position: absolute;
  top: 11px;
  left: -2px;
`;

export default Header;
