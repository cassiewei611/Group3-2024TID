import React from 'react';
import './EventPicture.css';

const EventPicture = ({ imagePath }) => {
    const defaultImagePath = "images/default-event.jpg"; // Default placeholder image

    return (
        <div className="event-picture">
            <img
                src={imagePath || defaultImagePath}
                alt="Event Poster"
                onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = defaultImagePath; // Fallback to default image
                }}
            />
        </div>
    );
};

export default EventPicture;
