import React, { useContext } from "react";
import { AiOutlineYoutube, AiOutlineInstagram } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../context";
import { footer } from "../../sentence/Language";

const Footer = () => {
  const { lang } = useContext(AppContext);
  return (
    <>
        <StyledNavLink exact to="/contactUs">
          {footer[`${lang}contactUs`]}
        </StyledNavLink>

      <a
        href="https://www.youtube.com/channel/UChVt91DKeuMDi4bGlVZ5_Aw"
        target="_blank"
        rel="noreferrer"
      >
        <AiOutlineYoutube
          style={{ width: "30px", height: "30px", fill: "var(--soft-gray)", marginRight:"10px" }}
        />
      </a>
      <a
        href="https://www.instagram.com/yu_bo_sha/"
        target="_blank"
        rel="noreferrer"
      >
        <AiOutlineInstagram
          style={{ width: "30px", height: "30px", fill: "var(--soft-gray)" }}
        />
      </a>
    </>
  );
};

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--soft-gray);
  margin-right: 15px;
  position: relative;
  bottom: 10px;

  &:hover{
    text-decoration: underline;
  }
`;

export default Footer;
