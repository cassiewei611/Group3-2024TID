// Filter.js
import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [eventPetType, setEventPetType] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ city, date, eventPetType });
  };

  return (
    <div style={filterContainerStyle}>
      <h3 style={headerStyle}>Filter Events</h3>

      <label style={labelStyle}>City</label>
      <select style={selectStyle} value={city} onChange={(e) => { setCity(e.target.value); handleFilterChange(); }}>
        <option value="">All Cities</option>
        <option value="Copenhagen">Copenhagen</option>
        <option value="Aarhus">Aarhus</option>
        <option value="Odense">Odense</option>
      </select>

      <label style={labelStyle}>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => { setDate(e.target.value); handleFilterChange(); }}
        style={inputStyle}
      />

      <label style={labelStyle}>Pet Type</label>
      <select style={selectStyle} value={eventPetType} onChange={(e) => { setEventPetType(e.target.value); handleFilterChange(); }}>
        <option value="">All pets</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Bird">Bird</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

const filterContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px',
  width: '200px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  marginBottom: '10px',
  color: '#333',
  fontSize: '18px',
};

const labelStyle = {
  fontSize: '14px',
  color: '#666',
};

const selectStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

export default Filter;
