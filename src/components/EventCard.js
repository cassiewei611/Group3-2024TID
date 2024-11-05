// EventCard.js
import React from 'react';

const formatMonth = (date) => {
    return new Date(date).toLocaleString('en-US', { month: 'short' }).toUpperCase();
  }
  
const formatDay = (date) => {
    return new Date(date).getDate();
  }

const EventCard = ({ event }) => {
  return (
    <div style={cardContainerStyle}>
        <div style={imageContainerStyle}>
            <img src={event.image} style={imageStyle} />
            <button style={starButtonStyle} onClick={() => event.onSave(event.id)}>☆</button>
        </div>
        <div style={contentContainerStyle}>
            <div style={dateContainer}>
                <span style={monthStyle}>{formatMonth(event.date)}</span>
                <span style={dayStyle}>{formatDay(event.date, 'dd')}</span>
            </div>
             <div style={detailsContainer}>
                <h3 style={titleStyle}>{event.title}</h3>
                <p style={cityStyle}>{event.city}</p>
                <p style={timeStyle}>{event.time}</p>
            </div>
        </div>
    </div>
  );
};

const cardContainerStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '300px',
    margin: '10px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column'
  };

const imageContainerStyle = {
    position: 'relative',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    overflow: 'hidden'
};

const starButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: '2px solid #d3d3d3',  // Light gray border similar to screenshot
    color: '#333',                // Star color
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)'  // Subtle shadow for depth
  };

  const imageStyle = {
    width: '100%',            // Takes up the full width of the container
    height: '200px',          // Set a fixed height that works well for your design
    objectFit: 'cover',       // Ensures the image covers the area without distorting
    objectPosition: 'top',    // Aligns the image to the top when it gets cut off
    borderRadius: '4px'       // Optional: Rounds the corners slightly
  };
  

  const contentContainerStyle = {
    display: 'flex',
    padding: '16px',
    alignItems: 'center',
    gap: '16px'
  };

  const dateContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
  
  const monthStyle = {
    fontSize: '1rem',
    color: '#C0A080', // This tan/rose gold color
    textTransform: 'uppercase',
    fontWeight: 'normal'
  }
  
  const dayStyle = {
    fontSize: '1rem',
    color: '#1A1A1A', // Dark gray/almost black
    fontWeight: 'bold'
  }
  
  const detailsContainer = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  };
  
  const titleStyle = {
    margin: '0',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '1.2'
  };
  
  const cityStyle = {
    margin: '4px 0',
    fontSize: '14px',
    color: '#888'
  };
  
  const timeStyle = {
    fontSize: '12px',
    color: '#888'
  };

export default EventCard;
