import React, { useContext, useState } from "react";
import { CgMenuCake } from "react-icons/cg";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context";
import { useSelector } from "react-redux";
import { RiAccountPinCircleLine, RiPlantFill } from "react-icons/ri";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { header } from "../../sentence/Language";

const NavbarSmall = () => {
  const [show, setShow] = useState(false);
  const { lang, setLang, currentUser, setCurrentUser } = useContext(AppContext);
  const cart = useSelector((state) => state.item.cart);
  const home = `${lang}home`
  const about = `${lang}about`
  const map = `${lang}map`
  const shop = `${lang}shop`

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
      <Wrapper>
        <CgMenuCake
          style={{
            width: "40px",
            height: "40px",
            color: "var(--soft-gray)",
            cursor: "pointer",
          }}
          onClick={() => setShow(!show)}
        />
      </Wrapper>
      {show ? (
        <ItemWrapper>
          {Object.keys(currentUser).length !== 0 && lang==="EN" ? (
            <P>Hello {currentUser.userName}!</P>
          ) : null}
          {Object.keys(currentUser).length !== 0 && lang==="JP" ? (
            <P>こんにちは {currentUser.userName}さん!</P>
          ) : null}
          <Line />
          {currentUser.admin ? (
            <>
              <StyledNavLink exact to="/admin">
                Admin
              </StyledNavLink>
              <Line />
            </>
          ) : null}
          <Btn onClick={change}>EN/JP</Btn>
          <Line />
            <>
              <StyledNavLink exact to="/">
                {header[home]}
              </StyledNavLink>
              <Line />
              <StyledNavLink exact to="/about">
                {header[about]}
              </StyledNavLink>
              <Line />
              <StyledNavLink exact to="/map">
                {header[map]}
              </StyledNavLink>
              <Line />
              <StyledNavLink exact to="/shop">
                {header[shop]}
              </StyledNavLink>
              <Line />
              <StyledNavLink exact to="/cart">
                {Object.values(cart).length > 0 ? (
                  <Circle>
                    <RiPlantFill style={{ height: "25px", fill:"#46705a" }} />
                  </Circle>
                ) : null}
                <Div>
                  <FiShoppingCart
                    style={{
                      color: "var(--soft-black)",
                      width: "25px",
                      height: "25px",
                      zIndex: 5,
                    }}
                  />
                </Div>
              </StyledNavLink>
              <Line />
              {Object.keys(currentUser).length !== 0 ? (
                <Div>
                  <FiLogOut
                    onClick={logout}
                    style={{
                      color: "var(--soft-black)",
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                      zIndex: 5,
                    }}
                  />
                </Div>
              ) : (
                <StyledNavLink exact to="/signIn">
                  <RiAccountPinCircleLine
                    style={{
                      fill: "var(--soft-black)",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                </StyledNavLink>
              )}
              <Line />
            </>
         
        </ItemWrapper>
      ) : null}
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 3px;
  z-index: 100;
`;

const ItemWrapper = styled.div`
  position: fixed;
  top: 40px;
  width: 100%;
  background-color: rgba(235, 235, 235, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 35px;
  color: var(--soft-black);
  z-index: 100;

`;

const P = styled.p`
  color: var(--soft-black);
  z-index: 100;
`;

const Line = styled.div`
  background-color: rgba(66, 66, 66, 0.6);
  width: 60%;
  height: 0.5px;
  z-index: 100;
`;

const Btn = styled.button`
  width: 50px;
  height: 34px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--soft-black);
  font-size: 15px;
  text-align: center;
  z-index: 100;
`;

const StyledNavLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  color: var(--soft-black);
  z-index: 100;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  z-index: 100;
`;

const Circle = styled.div`
  position: absolute;
  top: 0px;
  left: 12px;
  z-index: 100;
`;

export default NavbarSmall;
