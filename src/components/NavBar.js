import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreateEventClick = () => {
    navigate("/create-event");
  };

  const handleLogoButtonClick = () => {
    navigate("/home");
  };

  const handleProfileIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogOutClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="logo-button" onClick={handleLogoButtonClick}>
          <img src="/img/Petish_logo.png" alt="Logo" className="logo-image" />
        </button>
      </div>
      <div className="navbar-right">
        <button
          className="create-event-button"
          onClick={handleCreateEventClick}
        >
          Create Event +
        </button>
        <div className="profile-container">
          <button className="profile-button" onClick={handleProfileIconClick}>
            <img
              src="/img/Profile_pic.png"
              alt="Profile"
              className="button-image"
            />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item-profile"
                onClick={handleProfileClick}
              >
                Profile
              </button>
              <button
                className="dropdown-item-logout"
                onClick={handleLogOutClick}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
