// EventCard.js
import React from 'react';
import Button from './Button';
import './EventCard.css';
import { useNavigate } from 'react-router-dom';

const formatMonth = (date) => {
  return new Date(date).toLocaleString('en-US', { month: 'short' }).toUpperCase();
}

const formatDay = (date) => {
  return new Date(date).getDate();
}

const EventCard = ({ event }) => {
  const handleSend = () => {
    // Define the functionality for handleSend here
    console.log(`Sending information about the event: ${event.title}`);
  }

  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the event detail page with a sample event ID of 1
    navigate('/event-detail');
  }
    ;
  return (
    <div className='cardContainer' onClick={handleCardClick}>
      <div className='imageContainer'>
        <img src={event.image} className='image' />
        <Button onClick={handleSend} label="☆" className="starButton" />
      </div>
      <div className='contentContainer'>
        <div className='dateContainer'>
          <span className='month'>{formatMonth(event.date)}</span>
          <span className='day'>{formatDay(event.date, 'dd')}</span>
        </div>
        <div className='detailsContainer'>
          <h3 className='title'>{event.title}</h3>
          <p className='city'>{event.city}</p>
          <p className='time'>{event.time}</p>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
