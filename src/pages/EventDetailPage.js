import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './EventDetailPage.css';
import EventPicture from '../components/EventPicture';
import CommentsSection from '../components/CommentsSection';
import InterestedButton from '../components/InterestedButton';
import { fetchEventDetails, fetchEventParticipants } from '../services/Parse';
import Parse from '../services/Parse';

const EventDetailPage = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [attendeesCount, setAttendeesCount] = useState(0);
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAttendeeBox, setShowAttendeeBox] = useState(false);
    const navigate = useNavigate();

    const currentUser = Parse.User.current();

    useEffect(() => {
        const getEventDetails = async () => {
            try {
                setLoading(true);
                const details = await fetchEventDetails(eventId);
                setEventDetails(details);

                const participants = await fetchEventParticipants(eventId);
                setAttendeesCount(participants.length);
                setAttendees(participants);
            } catch (error) {
                console.error("Error fetching event details:", error);
            } finally {
                setLoading(false);
            }
        };

        getEventDetails();
    }, [eventId]);

    const updateAttendeesCount = async () => {
        try {
            const participants = await fetchEventParticipants(eventId);
            setAttendeesCount(participants.length);
            setAttendees(participants);
        } catch (error) {
            console.error("Error updating attendees count:", error);
        }
    };

    const goBack = () => {
        navigate('/home');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading event details, please wait...</p>
            </div>
        );
    }

    if (!eventDetails) {
        return (
            <div className="error-container">
                <p>Sorry, we couldn't find the event you're looking for.</p>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="error-container">
                <p>Error: User not logged in.</p>
            </div>
        );
    }

    return (
        <div className="event-detail-page">
            <button className="back-button" onClick={goBack}>Back to Home</button>
            <div className="event-detail-page-container">
                <div className="event-content">
                    <div className="event-picture-container">
                        <EventPicture imagePath={eventDetails.image} />
                    </div>

                    <div className="event-description">
                        <div className="event-description-text">
                            <h1 className="event-title">{eventDetails.heading}</h1>
                            <p className="event-author">
                                Posted by <Link to={`/profile/${eventDetails.createdBy.id}`} className="username">{eventDetails.createdBy.username}</Link>
                            </p>

                            <h2 className="event-date">
                                <strong>
                                    {eventDetails.date && eventDetails.time
                                        ? `${eventDetails.date}, ${eventDetails.time}`
                                        : "No datetime available"}
                                </strong>
                            </h2>

                            <p className="event-description-text">
                                {eventDetails.description}
                            </p>
                            <p
                                className="attendees"
                                onMouseEnter={() => setShowAttendeeBox(true)}
                                onMouseLeave={() => setShowAttendeeBox(false)}
                            >
                                <span className="attendee-count">{attendeesCount}</span> people have already joined!
                                {showAttendeeBox && (
                                    <div className="attendee-box">
                                        {attendees.map((attendee, index) => (
                                            <div className="attendee-profile-container" key={index}>
                                                <div className="attendee-profile">
                                                    <img
                                                        className="attendee-avatar"
                                                        src={attendee.avatar}
                                                        alt={attendee.username}
                                                    />
                                                </div>
                                                <Link className="attendee-username" to={`/profile/${attendee.userId}`}>
                                                    {attendee.username}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </p>
                        </div>
                        <InterestedButton
                            eventId={eventId}
                            userId={currentUser.id}
                            updateAttendeesCount={updateAttendeesCount}
                        />
                    </div>
                </div>

                <CommentsSection eventId={eventId} userId={currentUser.id} />
            </div>
        </div>
    );
};

export default EventDetailPage;
