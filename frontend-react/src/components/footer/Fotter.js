import React from "react";
import "./Fotter.css";
import LogoCoreCode from "../images/CoreCode.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <img src={LogoCoreCode} alt="logo" />
      </div>
      <span className="text-muted">Core Code - 2022</span>
    </footer>
  );
};

export default Footer;
