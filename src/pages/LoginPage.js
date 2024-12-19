import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "../services/Parse";
import "./LoginPage.css";
import Button from "../components/Button";

// const lineUnderLogin = "/img/Line-under-login.svg";
const logo = "/img/logo.png";
const mainPicture = "/img/main-picture.jpeg";


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginClick = async () => {
    try {
      // Call Parse logIn function
      await Parse.User.logIn(username, password);
      console.log("Login successful");
      navigate("/home"); // Navigate to the Home page on success
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the Sign Up page
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-left-box">
          <img src={mainPicture} alt="Main" className="login-main-picture" />
          <img src={logo} alt="Logo" className="login-logo" />
        </div>
        <div className="login-right-box">
          <div className="login-box">
            <h2 className="login-title">Login</h2>

            {/* Display error message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="login-username-inputbox">
              <input
                type="text"
                placeholder="Username"
                className="login-input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login-password-inputbox">
              <input
                type="password"
                placeholder="Password"
                className="login-input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              label="Login"
              className="login-button"
              onClick={handleLoginClick}
            />
            <Button
              label="Sign Up"
              className="signup-button"
              onClick={handleSignUpClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
