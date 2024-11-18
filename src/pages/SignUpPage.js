// src/components/ProfileForm.js
import React, { useState } from "react";
import Parse from "../services/Parse";
import "./SignUpPage.css"; // Import the CSS file

const ProfileForm = () => {
  // State variables to manage input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    // Basic validation
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      // Create a new Parse.User
      const user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
      user.set("description", description);
      user.set("phone", phone);

      // Call Parse signUp function
      await user.signUp();
      alert(`User ${username} created successfully!`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="upload-section" onClick={handleUploadClick}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
          id="fileInput"
        />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile Preview"
            className="image-preview"
          />
        ) : (
          "Upload"
        )}
      </div>

      <div className="form-header">Create New Profile</div>

      {/* Display error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Form Fields */}
      <div className="form-section">
        <label>Username:</label>
        <input
          type="text"
          placeholder="max. 14 characters"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="max. 14 characters"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Repeat password:</label>
        <input
          type="password"
          placeholder="Can not include Å, Ä, Ö"
          className="input-field"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          placeholder="Write something about yourself..."
          className="input-field"
          style={{ height: "80px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>E-mail:</label>
        <input
          type="email"
          placeholder="example@user.com"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone number:</label>
        <input
          type="tel"
          placeholder="Eg. +12 34-568 78 90"
          className="input-field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button className="submit-button" onClick={handleSignUp}>
        Create user
      </button>
    </div>
  );
};

export default ProfileForm;
