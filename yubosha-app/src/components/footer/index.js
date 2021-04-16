import React, { useContext } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../context";
import { ENFooter } from "../../sentence/English";
import { JPFooter } from "../../sentence/Japanese";

const Footer = () => {
  const { lang } = useContext(AppContext);
  return (
    <>
      {lang ? (
        <StyledNavLink exact to="/contactUs">
          {ENFooter.contactUs}
        </StyledNavLink>
      ) : (
        <StyledNavLink exact to="/contactUs">
          {JPFooter.contactUs}
        </StyledNavLink>
      )}

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

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--soft-gray);
  margin-right: 15px;
  position: relative;
  bottom: 10px;
`;

export default Footer;
