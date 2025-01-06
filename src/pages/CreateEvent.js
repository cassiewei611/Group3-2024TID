import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "../services/Parse";
import { createEvent } from "../services/Parse";
import "./CreateEvent.css";

const locations = ["Copenhagen", "Aarhus", "Odense"];
const petTypes = ["Dog", "Cat", "Bird", "Other"];
const defaultImageURL = "/img/pet.webp";

const ProfileForm = () => {
  const [location, setLocation] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [petType, setPetType] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Parse.User.currentAsync().then((currentUser) => {
      if (currentUser) {
        setUserId(currentUser.id);
      } else {
        console.error("No user logged in");
      }
    });
  }, []);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const getDefaultImageFile = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch default image: ${response.statusText}`
        );
      }
      const blob = await response.blob();
      return new Parse.File("default_image.jpg", blob);
    } catch (error) {
      console.error("Error fetching default image:", error);
      throw error;
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const parseFile = new Parse.File(file.name, file);
      setImage(parseFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!location || !heading || !description || !datetime || !petType) {
      alert("Please fill in all required fields before creating the event.");
      return;
    }

    try {
      let finalImage;
      if (image) {
        finalImage = image;
      } else {
        finalImage = await getDefaultImageFile(defaultImageURL);
      }

      const datetimeObject = new Date(datetime);
      const eventData = {
        heading,
        description,
        datetime: datetimeObject,
        location,
        petType,
        image: finalImage,
      };

      await createEvent(eventData, userId);

      alert("Event created successfully!");

      setHeading("");
      setDescription("");
      setDatetime("");
      setLocation("");
      setPetType("");
      setImage(null);
      setImagePreview("");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="background-container">
      <form className="form-container2" onSubmit={handleSubmit}>
        <div className="upload-container">
          <div
            className="upload-button"
            onClick={() => document.getElementById("image-upload").click()}
          >
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            ) : (
              <span>Upload Image</span>
            )}
          </div>
        </div>

        <div className="form-header">Create An Event</div>

        <div className="form-section">
          <label>Headline:</label>
          <input
            type="text"
            placeholder="max. 14 characters"
            className="input-field"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />

          <label>Description:</label>
          <textarea
            placeholder="Write something about yourself..."
            className="input-field"
            style={{ height: "80px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Date and Time</label>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="input-field"
          />

          <label>Location</label>
          <select
            className="input-field selectStyle"
            value={location}
            onChange={handleLocationChange}
            required
          >
            <option value="">Select a location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <label>Pet Type</label>
          <select
            className="input-field selectStyle"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            required
          >
            <option value="">Select pet type</option>
            {petTypes.map((pet, index) => (
              <option key={index} value={pet}>
                {pet}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
