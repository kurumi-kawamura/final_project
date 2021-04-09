import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div></div>
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

export default Footer;
