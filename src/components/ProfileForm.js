import React from "react";
import "./ProfileForm.css"; // Import the CSS file

const ProfileForm = () => {
  return (
    <div className="formContainer">
      {/* Upload Section */}
      <div className="uploadSection">Upload</div>

      {/* Form Header */}
      <div className="formHeader">Create New Profile</div>

      {/* Form Fields */}
      <div className="formSection">
        <label>Username:</label>
        <input
          type="text"
          placeholder="max. 14 characters"
          className="inputField"
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="max. 14 characters"
          className="inputField"
        />

        <label>Repeat password:</label>
        <input
          type="password"
          placeholder="Can not include Å, Ä, Ö"
          className="inputField"
        />

        <label>Description:</label>
        <textarea
          placeholder="Write something about yourself..."
          className="inputField description"
        />

        <label>E-mail:</label>
        <input
          type="email"
          placeholder="example@user.com"
          className="inputField"
        />

        <label>Phone number:</label>
        <input
          type="tel"
          placeholder="Eg. +12 34-568 78 90"
          className="inputField"
        />
      </div>

      {/* Submit Button */}
      <button className="submitButton">Create user</button>
    </div>
  );
};

export default ProfileForm;
