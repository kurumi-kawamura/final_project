import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <StyledNavLink exact to = "/contactUs">Contact us</StyledNavLink>
      <a
        href="https://www.youtube.com/channel/UChVt91DKeuMDi4bGlVZ5_Aw"
        target="_blank"
        rel="noreferrer"
      >
        <AiOutlineYoutube
          style={{ width: "30px", height: "30px", fill: "var(--soft-gray)" }}
        />
      </a>

    </>
  );
};

const  StyledNavLink= styled(NavLink)`
text-decoration: none;
color: var(--soft-gray);
position: relative;
bottom: 10px;
right: 20px;
`;
export default Footer;
