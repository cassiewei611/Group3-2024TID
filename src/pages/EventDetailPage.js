import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetailPage.css';
import EventPicture from '../components/EventPicture';
import CommentsSection from '../components/CommentsSection';
import InterestedButton from '../components/InterestedButton';
import { fetchEventDetails } from '../services/Parse'; // Import the fetchEventDetails function

const EventDetailPage = () => {
    const { eventId } = useParams(); // Get the eventId from the URL
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        const getEventDetails = async () => {
            const details = await fetchEventDetails(eventId);
            setEventDetails(details);
        };

        getEventDetails();
    }, [eventId]);

    if (!eventDetails) return <div>Loading...</div>;

    return (
        <div className="event-detail-page">
            <div className="event-detail-page-container">
                <div className="event-content">
                    <div className="event-picture-container">
                        <EventPicture imagePath={eventDetails.image || "images/event2.jpg"} />
                    </div>

                    <div className="event-description">
                        <div className="event-description-text">
                            <h1 className="event-title">{eventDetails.headline}</h1>
                            <p className="event-author">
                                Posted by <a href={`/profile/${eventDetails.createdBy}`} className="username">User</a>
                            </p>
                            <h2 className="event-date">
                                <strong>{new Date(eventDetails.datetime).toDateString()}</strong>
                            </h2>
                            <p className="event-description-text">
                                {eventDetails.description}
                            </p>
                            <p className="attendees">
                                <a href="/attendees" className="attendee-count">{eventDetails.attendeesCount || 0}</a> people have already joined!
                            </p>
                        </div>
                        <InterestedButton />
                    </div>
                </div>

                <CommentsSection />
            </div>
        </div>
    );
};

export default EventDetailPage;
