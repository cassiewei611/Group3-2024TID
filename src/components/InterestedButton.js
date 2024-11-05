// src/components/InterestedButton.js
import React, { useState } from 'react';
import './InterestedButton.css';

const InterestedButton = () => {
    const [isInterested, setIsInterested] = useState(false);

    const handleClick = () => {
        setIsInterested(!isInterested);
    };

    return (
        <button className="interested-button" onClick={handleClick}>
            Interested
            {isInterested ? (
                // Filled star SVG
                <svg
                    className="star-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20px"
                    height="20px"
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ) : (
                // Outlined star SVG
                <svg
                    className="star-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="20px"
                    height="20px"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21l1.18-6.86-5-4.87 6.91-.97L12 2z" />
                </svg>
            )}
        </button>
    );
};

export default InterestedButton;
