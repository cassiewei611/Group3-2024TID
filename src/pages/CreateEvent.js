// src/components/ProfileForm.js
import React, { useState } from "react";
import "./CreateEvent.css"; // Import the CSS file

const locations = ["Copenhagen", "Aarhus", "Odense", "Aalborg"];
const petTypes = ["Dog", "Cat", "Bird", "Other"];

const ProfileForm = () => {
  const [location, setLocation] = useState("");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [eventPetType, setEventPetType] = useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = () => {
    // Check if location, datetime, and pet type are selected
    if (!location) {
      alert("Please select a location before creating the event.");
      return;
    }
    if (!datetime) {
      alert("Please select a date and time for the event.");
      return;
    }
    if (!eventPetType) {
      alert("Please select a pet type for the event.");
      return;
    }

    // Logic to create the event goes here
    console.log("Event created with the following details:", {
      headline,
      description,
      datetime,
      location,
      eventPetType,
    });
  };

  return (
    <div className="form-container">
      <button className="upload-button">Upload</button>

      {/* Form Header */}
      <div className="form-header">Create An Event</div>

      {/* Form Fields */}
      <div className="form-section">
        <label>Headline:</label>
        <input
          type="text"
          placeholder="max. 14 characters"
          className="input-field"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
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
          value={eventPetType}
          onChange={(e) => setEventPetType(e.target.value)}
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

      {/* Submit Button */}
      <button className="submit-button" onClick={handleSubmit}>
        Create Event
      </button>
    </div>
  );
};

export default ProfileForm;
