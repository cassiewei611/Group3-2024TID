// src/components/ProfileForm.js
import React, { useState } from "react";
import "./CreateEvent.css"; // Import the CSS file

const locations = ["Copenhagen", "Aarhus", "Odense", "Aalborg"];

const ProfileForm = () => {
  const [location, setLocation] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  const handleLocationChange = (event) => {
    const input = event.target.value;
    setLocation(input);

    // Filter locations based on the input
    if (input) {
      const filtered = locations.filter((loc) =>
        loc.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setFilteredLocations([]);
  };

  return (
    <div className="form-container">
      {/* Upload Section */}
      <div className="upload-section">Upload</div>

      {/* Form Header */}
      <div className="form-header">Create An Event</div>

      {/* Form Fields */}
      <div className="form-section">
        <label>Headline:</label>
        <input
          type="text"
          placeholder="max. 14 characters"
          className="input-field"
        />

        <label>Description:</label>
        <textarea
          placeholder="Write something about yourself..."
          className="input-field"
          style={{ height: "80px" }} /* inline style for height only */
        />

        <label>Date/time:</label>
        <input
          type="text"
          placeholder="DD/MM/YY hh/mm"
          className="input-field"
        />

        <label>Location</label>
        <input
          type="text"
          placeholder="Copenhagen/Aarhus/Odense/Aalborg"
          className="input-field"
          value={location}
          onChange={handleLocationChange}
        />
        {/* Dropdown for filtered locations */}
        {filteredLocations.length > 0 && (
          <ul className="dropdown">
            {filteredLocations.map((loc, index) => (
              <p
                key={index}
                onClick={() => handleLocationSelect(loc)}
                className="dropdown-item"
              >
                {loc}
              </p>
            ))}
          </ul>
        )}
      </div>

      {/* Submit Button */}
      <button className="submit-button">Create Event</button>
    </div>
  );
};

export default ProfileForm;
