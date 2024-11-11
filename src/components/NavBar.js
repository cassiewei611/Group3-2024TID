import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/img/Petish_logo.png" alt="Logo" className="logo-image" />
      </div>
      <div className="create-event">
        <button className="Create-event-button">Create event +</button>
      </div>
      <div className="profile-button">
        <img src="/img/Profile_pic.png" alt="Button" className="button-image" />
      </div>
    </nav>
  );
};
export default NavBar;
