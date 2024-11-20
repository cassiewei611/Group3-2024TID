import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetailPage.css';
import EventPicture from '../components/EventPicture';
import CommentsSection from '../components/CommentsSection';
import InterestedButton from '../components/InterestedButton';
import { fetchEventDetails, fetchParticipantCount } from '../services/Parse';



const EventDetailPage = ({ userId }) => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [attendeesCount, setAttendeesCount] = useState(0);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const getEventDetails = async () => {
            try {
                setLoading(true);
                const details = await fetchEventDetails(eventId);
                setEventDetails(details);

                // Fetch the number of participants
                const count = await fetchParticipantCount(eventId)
                setAttendeesCount(count);
            } catch (error) {
                console.error("Error fetching event details:", error);
            } finally {
                setLoading(false);
            }
        };

        getEventDetails();
    }, [eventId, userId]);


    // Callback to update attendees count when participation status changes
    const updateAttendeesCount = async () => {
        try {
            const count = await fetchParticipantCount(eventId);
            setAttendeesCount(count);
        } catch (error) {
            console.error("Error updating attendees count:", error);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
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

    return (
        <div className="event-detail-page">
            <div className="event-detail-page-container">
                <div className="event-content">
                    <div className="event-picture-container">
                        <EventPicture imagePath={eventDetails.image} />
                    </div>

                    <div className="event-description">
                        <div className="event-description-text">
                            <h1 className="event-title">{eventDetails.heading}</h1>
                            <p className="event-author">
                                Posted by <a href={`/profile/${eventDetails.createdBy.id}`} className="username">{eventDetails.createdBy.username}</a>
                            </p>

                            <h2 className="event-date">
                                <strong>
                                    {new Date(eventDetails.datetime).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })}
                                </strong>
                            </h2>

                            <p className="event-description-text">
                                {eventDetails.description}
                            </p>
                            <p className="attendees">
                                <a href="/attendees" className="attendee-count">{attendeesCount}</a> people have already joined!
                            </p>
                        </div>
                        {/* Pass eventId and userId to InterestedButton */}
                        <InterestedButton
                            eventId={eventId}
                            userId={userId}
                            updateAttendeesCount={updateAttendeesCount} // Pass callback to update attendees count
                        />
                    </div>
                </div>

                <CommentsSection />
            </div>
        </div>
    );
};

export default EventDetailPage;
