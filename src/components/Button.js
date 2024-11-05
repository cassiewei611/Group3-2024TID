import React from "react";
<<<<<<< HEAD
=======
import "../pages/LoginPage.css"; // Use the existing CSS for button styles
>>>>>>> kenji

const Button = ({ onClick, label, className }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {label}
    </button>
  );
};

export default Button;
