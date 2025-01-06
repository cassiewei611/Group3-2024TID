import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");


  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUsername(currentUser.get("username"));
    }
  }, []);

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
    setShowDropdown(false);
    localStorage.clear();
    sessionStorage.clear();
  };

  const handleProfileClick = () => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      const userId = currentUser.id;
      navigate(`/profile/${userId}`);
    }
  };


  return (
    <div className="navbar">

      <button className="logo-button" onClick={handleLogoButtonClick}>
        <img src="/img/Petish_logo.png" alt="Logo" className="logo-image" />
      </button>

      <div className="navbar-right">
        <button
          className="create-event-button"
          onClick={handleCreateEventClick}
        >
          Create Event +
        </button>
        <div className="profile-container" onClick={handleProfileIconClick}>
          <button className="profile-button" >
            <img
              src="/img/Profile_pic.png"
              alt="Profile"
              className="button-image"
            />
          </button>
          {username && <div className="username">{username}</div>}
        </div>

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
  );
};

export default NavBar;
