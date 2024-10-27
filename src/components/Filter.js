// Filter.js
import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [eventType, setEventType] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ city, date, eventType });
  };

  return (
    <div style={filterContainerStyle}>
      <select style={selectStyle} value={city} onChange={(e) => { setCity(e.target.value); handleFilterChange(); }}>
        <option value="">All Cities</option>
        <option value="Copenhagen">Copenhagen</option>
        <option value="Aarhus">Aarhus</option>
        <option value="Odense">Odense</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => { setDate(e.target.value); handleFilterChange(); }}
        style={inputStyle}
      />

      <select style={selectStyle} value={eventType} onChange={(e) => { setEventType(e.target.value); handleFilterChange(); }}>
        <option value="All pet"> All pet</option>
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
  gap: '8px',
  marginBottom: '16px'
};

const selectStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

export default Filter;
