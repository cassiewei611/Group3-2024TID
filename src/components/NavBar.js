// src/components/NavBar.js
import React from "react";
import "./NavBar.css"; // Import the CSS file

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/img/Petish_logo.png" alt="Logo" className="logo-image" />
      </div>
      <div className="navbar-button">
        <img src="/img/Profile_pic.png" alt="Button" className="button-image" />
      </div>
    </nav>
  );
};
export default NavBar;
