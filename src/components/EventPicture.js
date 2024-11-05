import React from 'react';
import './EventPicture.css';

const EventPicture = ({ imagePath }) => {
    return (
        <div className="event-picture">
            <img src={imagePath} alt="Event Poster" />
        </div>
    );
};

export default EventPicture;
