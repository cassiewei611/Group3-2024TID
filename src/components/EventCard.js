// EventCard.js
import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div style={cardStyle}>
      <img src={event.image} alt={event.title} style={imageStyle} />
      <h3>{event.title}</h3>
      <p>{event.date} - {event.time}</p>
      <p>{event.city}</p>
      <button style={buttonStyle} onClick={() => event.onSave(event.id)}>
        ⭐ Interest
      </button>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  width: '30%',
  margin: '10px',
  boxSizing: 'border-box'
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '4px'
};

const buttonStyle = {
  background: '#ffd700',
  border: 'none',
  padding: '8px',
  cursor: 'pointer'
};

export default EventCard;
