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
    <div className="container">
      <div className="left-box">
        <img src={mainPicture} alt="Main" className="main-picture" />
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="right-box">
        <div className="login-box">
          <h2 className="login-title">login</h2>
          

          <div className="username-inputbox">
            <input type="text" placeholder="Username" className="input-field" />
          </div>

          <div className="password-inputbox">
            <input type="password" placeholder="Password" className="input-field" />
          </div>

          <Button label="LOGIN" className="login-button" onClick={handleLoginClick} />
          <Button label="SIGN UP" className="signup-button" onClick={handleSignUpClick} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
