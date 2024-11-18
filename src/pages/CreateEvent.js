import React, { useState } from "react";
import { createEvent } from "../services/Parse"; // Import createEvent function
import "./CreateEvent.css";

const locations = ["Copenhagen", "Aarhus", "Odense", "Aalborg"];
const petTypes = ["Dog", "Cat", "Bird", "Other"];

const ProfileForm = ({ userId }) => {
  const [location, setLocation] = useState("");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [petType, setPetType] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // For displaying preview

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview image
      };
      reader.readAsDataURL(file);
      setImage(file); // Save the file for submission
    }
  };

  const handleSubmit = async () => {
    if (!location || !datetime || !petType) {
      alert("Please fill in all required fields before creating the event.");
      return;
    }

    const eventData = {
      headline,
      description,
      datetime,
      location,
      petType,
      image,
    };

    try {
      await createEvent(eventData, userId);

      // Show a success alert
      alert("Event created successfully!");

      // Reset form fields
      setHeadline("");
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
      <div class="upload-container">
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




      {/* Form Header */}
      < div className="form-header" > Create An Event</div >

      {/* Other form fields */}
      < div className="form-section" >
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
      </div >

      {/* Submit Button */}
      < button className="submit-button" onClick={handleSubmit} >
        Create Event
      </button >
    </div >
  );
};

export default ProfileForm;

