import React, { useState, useEffect } from 'react';
import { toggleParticipation, checkUserInterest } from '../services/Parse';
import './InterestedButton.css';

const InterestedButton = ({ eventId, userId }) => {
    const [isInterested, setIsInterested] = useState(false);

    // Step 1: 在组件挂载时检查用户是否对该事件感兴趣
    useEffect(() => {
        const fetchInterestStatus = async () => {
            try {
                const interested = await checkUserInterest(eventId, userId);
                setIsInterested(interested);
            } catch (error) {
                console.error("Error fetching interest status:", error);
            }
        };
        fetchInterestStatus();
    }, [eventId, userId]);

    const handleClick = async () => {
        try {
            // Step 2: 点击按钮时切换感兴趣状态
            const updatedInterest = await toggleParticipation(eventId, userId);
            setIsInterested(updatedInterest);
        } catch (error) {
            console.error("Error toggling interest:", error);
        }
    };

    return (
        <button className="interested-button" onClick={handleClick}>
            {isInterested ? "Interested" : "Not Interested"}
            {isInterested ? (
                // 实心星星 SVG
                <svg className="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ) : (
                // 空心星星 SVG
                <svg className="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20px" height="20px">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21l1.18-6.86-5-4.87 6.91-.97L12 2z" />
                </svg>
            )}
        </button>
    );
};

export default InterestedButton;
