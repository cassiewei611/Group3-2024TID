import React, { useState, useEffect } from 'react';
import './Filter.css'

const Filter = ({ onFilterChange }) => {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [eventPetType, setEventPetType] = useState('');

  // Use useEffect to call onFilterChange when any filter value changes
  useEffect(() => {
    onFilterChange({ city, date, eventType: eventPetType });
  }, [city, date, eventPetType, onFilterChange]);

  return (
    <div className='filterContainerStyle'>
      <label className='labelStyle'>City</label>
      <select className='selectStyle' value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">All Cities</option>
        <option value="Copenhagen">Copenhagen</option>
        <option value="Aarhus">Aarhus</option>
        <option value="Odense">Odense</option>
      </select>

      <label style={labelStyle}>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className='inputStyle'
      />

      <label className='labelStyle'>Pet Type</label>
      <select className='electStyle' value={eventPetType} onChange={(e) => setEventPetType(e.target.value)}>
        <option value="">All pets</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Bird">Bird</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

export default Filter;
