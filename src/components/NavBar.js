import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCreateEventClick = () => {
    navigate("/create-event"); // Navigate to the CreateEvent page
  };

  const handleLogoButtonClick = () => {
    navigate("/home"); // Navigate to the Sign Up page
  };

  return (
    <div class="navbar">
      <div class="navbar-left">
        <button class="logo-button" onClick={handleLogoButtonClick}>
          <img src="/img/Petish_logo.png" alt="Logo" class="logo-image" />
        </button>
      </div>
      <div class="navbar-right">
        <button class="create-event-button" onClick={handleCreateEventClick}>
          Create Event +{" "}
        </button>
        <button class="profile-button">
          <img src="/img/Profile_pic.png" alt="Profile" class="button-image" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;