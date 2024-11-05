import React from 'react';
import './EventDetailPage.css';
import EventPicture from '../components/EventPicture';
import CommentsSection from '../components/CommentsSection';
import InterestedButton from '../components/InterestedButton';

const EventDetailPage = () => {
    return (
        <div className="event-detail-page">
            <div className="event-detail-page-container">
                <div className="event-content">
                    <div className="event-picture-container">
                        <EventPicture imagePath="img/OIP.jpeg" />
                    </div>

                    <div className="event-description">
                        <div className="event-description-text">
                            <h1 className="event-title">ISB Pet Show</h1>
                            <p className="event-author">Posted by <a href="/profile/username" className="username">Jakob_Miller</a></p>
                            <h2 className="event-date"><strong>August 20th</strong></h2>
                            <p className="event-description-text">Come along to the first ever ISB Pet Show and Forever Friend Adoption Drive on Saturday, August 20th, 10:30-12:00 pm.</p>
                            <p className="attendees"><a href="/attendees" className="attendee-count">13</a> people have already joined!
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
