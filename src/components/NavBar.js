import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCreateEventClick = () => {
    navigate("/create-event"); // Navigate to the CreateEvent page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/img/Petish_logo.png" alt="Logo" className="logo-image" />
      </div>
      <div className="create-event">
        <button
          className="create-event-button"
          onClick={handleCreateEventClick}
        >
          Create Event +
        </button>
      </div>
      <div className="profile-button">
        <img src="/img/Profile_pic.png" alt="Button" className="button-image" />
      </div>
    </nav>
  );
};

export default NavBar;
