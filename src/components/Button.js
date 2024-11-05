import React from "react";
import "../pages/LoginPage.css"; // Use the existing CSS for button styles

const Button = ({ onClick, label, className }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {label}
    </button>
  );
};

export default Button;
