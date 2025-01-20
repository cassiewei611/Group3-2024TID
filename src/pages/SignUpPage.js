import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "../services/Parse";
import "./SignUpPage.css";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {

      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Image size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrorMessage("Please upload an image file");
        return;
      }


      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    if (!/^[a-zA-Z0-9]{3,14}$/.test(username)) {
      return "Username must be 3-14 characters and contain only letters and numbers.";
    }

    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(password)) {
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

    if (!profileImage) {
      return "Profile image is required.";
    }

    return null;
  };

  const createDefaultACL = () => {
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(false);
    return acl;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {

      const userACL = createDefaultACL();
      const user = new Parse.User();
      user.setACL(userACL);


      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
      user.set("description", description);
      user.set("phone", phone);


      await user.signUp();


      if (profileImage) {
        try {
          const parseFile = new Parse.File(profileImage.name, profileImage);
          await parseFile.save();


          const currentUser = Parse.User.current();
          currentUser.set("profileImage", parseFile);
          await currentUser.save(null, { userACL });
        } catch (fileError) {
          console.error("File upload failed:", fileError);
          setErrorMessage("Account created but profile image upload failed. You can update it later in your profile.");
          navigate("/home");
          return;
        }
      }


      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSignUp}>
      <div className="upload-section">
        <label htmlFor="profile-image-upload">
          <div className="image-upload-box">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="preview-image" />
            ) : (
              <span>Upload Profile Image (max 5MB)</span>
            )}
          </div>
        </label>
        <input
          id="profile-image-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          disabled={isLoading}
        />
      </div>

      <div className="form-header">Create New Profile</div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="form-section">
        <label>Username:</label>
        <input
          type="text"
          placeholder="3-14 alphanumeric characters"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="At least 8 characters with A-Z, a-z, 0-9, and special char"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <label>Repeat password:</label>
        <input
          type="password"
          placeholder="Must match password"
          className="input-field"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          disabled={isLoading}
        />
        <label>Description:</label>
        <textarea
          placeholder="Optional (max. 250 characters)"
          className="input-field"
          style={{ height: "80px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
        <label>E-mail:</label>
        <input
          type="email"
          placeholder="example@domain.com"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <label>Phone number:</label>
        <input
          type="tel"
          placeholder="+12 345-678-9012"
          className="input-field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create user"}
      </button>
    </form>
  );
};

export default ProfileForm;