import React, { useState, useEffect } from 'react';
import { handleParticipation, checkUserInterest } from '../services/Parse';
import './InterestedButton.css';

const InterestedButton = ({ eventId, userId }) => {
    const [isInterested, setIsInterested] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态

    // Step 1: 在组件挂载时检查用户是否对该事件感兴趣
    useEffect(() => {
        const fetchInterestStatus = async () => {
            try {
                setIsLoading(true); // 开始加载
                const interested = await checkUserInterest(eventId, userId);
                setIsInterested(interested);
            } catch (error) {
                console.error("Error fetching interest status:", error);
            } finally {
                setIsLoading(false); // 加载结束
            }
        };
        fetchInterestStatus();
    }, [eventId, userId]);

    const handleClick = async () => {
        try {
            const updatedInterest = await handleParticipation(eventId, userId);
            if (updatedInterest !== null) {
                setIsInterested(updatedInterest);
            }
        } catch (error) {
            console.error("Error toggling interest:", error);
        }
    };

    if (isLoading) {
        return <button className="interested-button" disabled>Loading...</button>;
    }

    return (
        <button className="interested-button" onClick={handleClick}>
            Interested
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

