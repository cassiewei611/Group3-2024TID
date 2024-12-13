import React, { useState, useEffect } from "react";
import { handleParticipation, checkUserInterest } from "../services/Parse";
import "./InterestedButton.css";

const InterestedButton = ({ eventId, userId, updateAttendeesCount }) => {
    const [isInterested, setIsInterested] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //  user is interested in the event?
    useEffect(() => {
        const fetchInterestStatus = async () => {
            try {
                setIsLoading(true);
                if (!userId) {
                    console.error("No userId found");
                    return;
                }
                const interested = await checkUserInterest(eventId, userId);
                console.log("Interest status fetched:", interested); 
                setIsInterested(interested);
            } catch (error) {
                console.error("Error fetching interest status:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchInterestStatus();
        }
    }, [eventId, userId]);


    const handleClick = async () => {
        try {
            const updatedInterest = await handleParticipation(eventId, userId);
            if (updatedInterest !== null) {
                setIsInterested(updatedInterest);

                
                if (updateAttendeesCount) {
                    await updateAttendeesCount();
                }
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
            {isInterested ? (
                <>
                    Interested
                    {/* Solid star SVG for when interested */}
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
                </>
            ) : (
                <>
                    Interested
                    {/* Hollow star SVG for when not interested */}
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
                </>
            )}
        </button>
    );
};

export default InterestedButton;

