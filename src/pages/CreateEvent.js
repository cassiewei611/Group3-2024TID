import React, { useState, useEffect } from "react";
import Parse from '../services/Parse';
import { createEvent } from "../services/Parse";
import "./CreateEvent.css";

const locations = ["Copenhagen", "Aarhus", "Odense", "Aalborg"];
const petTypes = ["Dog", "Cat", "Bird", "Other"];

const ProfileForm = () => {
  const [location, setLocation] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [petType, setPetType] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [userId, setUserId] = useState("");
  useEffect(() => {
    Parse.User.currentAsync().then(currentUser => {
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


  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const parseFile = new Parse.File(file.name, file); // Convert to Parse.File
      setImage(parseFile); // Save the Parse.File object to state

      // Optional: For preview purposes
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Display preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!location || !datetime || !petType || !userId) {
      alert("Please fill in all required fields before creating the event.");
      return;
    }

    // Convert datetime string to a Date object
    const datetimeObject = new Date(datetime);

    const eventData = {
      heading,
      description,
      datetime: datetimeObject, // Use the Date object here
      location,
      petType,
      image,
    };

    console.log("Event Data:", eventData);

    try {
      await createEvent(eventData, userId);

      alert("Event created successfully!");

      // Reset form fields
      setHeading("");
      setDescription("");
      setDatetime("");
      setLocation("");
      setPetType("");
      setImage("");
      setImagePreview("");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("There was an error creating the event. Please try again.");
    }
  };


  return (
    <div className="form-container">
      <div className="upload-container">
        <div className="upload-button" onClick={() => document.getElementById('image-upload').click()}>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }} // Hide the file input
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

      <button className="submit-button" onClick={handleSubmit}>
        Create Event
      </button>
    </div>
  );
};

export default ProfileForm;
