import React from 'react';
import './EventPicture.css';

const EventPicture = ({ imagePath }) => {
    const defaultImagePath = "images/default-event.jpg";

    return (
        <div className="event-picture">
            <img
                src={imagePath || defaultImagePath}
                alt="Event Poster"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImagePath;
                }}
            />
        </div>
    );
};

export default EventPicture;
