import React from "react";
import "./SignUpPages.css";

const ProfileForm = () => {
  return (
    <div className="form-container">
      <div className="upload-section">Upload</div>

      <div className="form-header">Create New Profile</div>

      <div className="form-section">
        <label>Username:</label>
        <input
          type="text"
          placeholder="max. 14 characters"
          className="input-field"
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="max. 14 characters"
          className="input-field"
        />

        <label>Repeat password:</label>
        <input
          type="password"
          placeholder="Can not include Å, Ä, Ö"
          className="input-field"
        />

        <label>Description:</label>
        <textarea
          placeholder="Write something about yourself..."
          className="input-field"
          style={{ height: "80px" }}
        />

        <label>E-mail:</label>
        <input
          type="email"
          placeholder="example@user.com"
          className="input-field"
        />

        <label>Phone number:</label>
        <input
          type="tel"
          placeholder="Eg. +12 34-568 78 90"
          className="input-field"
        />
      </div>

      <button className="submit-button">Create user</button>
    </div>
  );
};

export default ProfileForm;
