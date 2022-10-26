import React from "react";
import "./Header.css";
import logoArnez from "../images/LOGO-ARNEZ11.png";

const Header = () => {
  return (
    <div className="header">
      <img src={logoArnez} alt="logo" />
      <h1>Arnez Todo List</h1>
    </div>
  );
};

export default Header;
