import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleParticipation, checkUserInterest } from "../services/Parse";
import Button from "./Button";
import "./EventCard.css";
import Parse from "../services/Parse";

const formatMonth = (date) => {
  return new Date(date).toLocaleString("en-US", { month: "short" }).toUpperCase();
};

const formatDay = (date) => {
  return new Date(date).getDate();
};

const EventCard = ({ event }) => {
  const [isInterested, setIsInterested] = useState(false); // State to track interest
  const [isLoading, setIsLoading] = useState(true); // Loading state for interest status
  const navigate = useNavigate();
  const currentUser = Parse.User.current();

  useEffect(() => {
    const fetchInterestStatus = async () => {
      if (!currentUser) {
        console.error("User not logged in.");
        setIsLoading(false);
        return;
      }

      try {
        const interested = await checkUserInterest(event.id, currentUser.id); // Check if user is interested
        setIsInterested(interested);
      } catch (error) {
        console.error("Error fetching interest status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterestStatus();
  }, [event.id, currentUser]);

  const handleStarClick = async (e) => {
    e.stopPropagation(); // Prevent triggering the card click event

    if (!currentUser) {
      console.error("User not logged in.");
      return;
    }

    try {
      const updatedInterest = await handleParticipation(event.id, currentUser.id); // Toggle interest
      setIsInterested(updatedInterest); // Update the state
    } catch (error) {
      console.error("Error toggling interest:", error);
    }
  };

  const handleCardClick = () => {
    navigate(`/event-detail/${event.id}`);
  };

  return (
    <div className="cardContainer" onClick={handleCardClick}>
      <div className="imageContainer">
        <img src={event.image} className="image" alt={event.title} />
        {isLoading ? (
          <Button label="Loading..." className="starButton" disabled />
        ) : (
          <Button
            onClick={handleStarClick}
            label={isInterested ? "★" : "☆"} // Dynamic label
            className={`starButton ${isInterested ? "interested" : ""}`} // Dynamic style
          />
        )}
      </div>
      <div className="contentContainer">
        <div className="dateContainer">
          <span className="month">{formatMonth(event.date)}</span>
          <span className="day">{formatDay(event.date)}</span>
        </div>
        <div className="detailsContainer">
          <h3 className="title">{event.heading}</h3>
          <p className="city">{event.city}</p>
          <p className="time">{event.time}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
