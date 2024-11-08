import React from "react";
import lineUnderLogin from "../assets/Line-under-login.svg";
import logo from "../assets/logo.png";
import mainPicture from "../assets/main-picture.jpeg";
import "./LoginPage.css";
import Button from "../components/Button";

const LoginPage = () => {
  const handleLoginClick = () => {
    console.log("Login clicked");
  };

  const handleSignUpClick = () => {
    console.log("Sign up clicked");
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
            <h2 className="login-title">login</h2>

            <div className="login-username-inputbox">
              <input
                type="text"
                placeholder="Username"
                className="login-input-field"
              />
            </div>

            <div className="login-password-inputbox">
              <input
                type="password"
                placeholder="Password"
                className="login-input-field"
              />
            </div>

            <Button
              label="LOGIN"
              className="login-button"
              onClick={handleLoginClick}
            />
            <Button
              label="SIGN UP"
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
