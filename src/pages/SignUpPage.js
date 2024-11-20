import React, { useState } from "react";
import Parse from "../services/Parse";
import "./SignUpPage.css";

const ProfileForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Validation rules for the form
  const validateForm = () => {
    if (!/^[a-zA-Z0-9]{3,14}$/.test(username)) {
      return "Username must be 3-14 characters and contain only letters and numbers.";
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      return "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.";
    }

    if (password !== repeatPassword) {
      return "Passwords do not match.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Invalid email format.";
    }

    if (!/^\+[\d\s-]{7,15}$/.test(phone)) {
      return "Phone number must start with '+' and include only numbers, spaces, or hyphens.";
    }

    if (description.length > 250) {
      return "Description cannot exceed 250 characters.";
    }

    return null;
  };

  const handleSignUp = async () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      const user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
      user.set("description", description);
      user.set("phone", phone);

      // Handle image upload
      if (profileImage) {
        const parseFile = new Parse.File(profileImage.name, profileImage);
        await parseFile.save(); // Save image to Parse
        user.set("profileImage", parseFile); // Attach image to user object
      }

      await user.signUp();
      alert(`User ${username} created successfully!`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      {/* Image Upload Section */}
      <div className="upload-section">
        <label htmlFor="profile-image-upload">
          <div className="image-upload-box">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="preview-image" />
            ) : (
              <span>Upload Profile Image</span>
            )}
          </div>
        </label>
        <input
          id="profile-image-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>

      {/* Form Header */}
      <div className="form-header">Create New Profile</div>

      {/* Display error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Form Fields */}
      <div className="form-section">
        <label>Username:</label>
        <input
          type="text"
          placeholder="3-14 alphanumeric characters"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="At least 8 characters with A-Z, a-z, 0-9, and special char"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Repeat password:</label>
        <input
          type="password"
          placeholder="Must match password"
          className="input-field"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          placeholder="Optional (max. 250 characters)"
          className="input-field"
          style={{ height: "80px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>E-mail:</label>
        <input
          type="email"
          placeholder="example@domain.com"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone number:</label>
        <input
          type="tel"
          placeholder="+12 345-678-9012"
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
