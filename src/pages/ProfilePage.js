import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Parse from "../services/Parse";
import {
  fetchUserEvents, fetchUserInfo, fetchInterestedEvents,
} from "../services/Parse";
import "./ProfilePage.css";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState({ myEvents: [], interestedEvents: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const targetUserId = userId || Parse.User.current().id;

        const userInfo = await fetchUserInfo(targetUserId);
        setUserData(userInfo);

        const myEvents = await fetchUserEvents(targetUserId);

        const interestedEvents = await fetchInterestedEvents(targetUserId);

        setEvents({
          myEvents,
          interestedEvents,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading the profile, please wait...</p>
      </div>
    );

  return (
    <div className="profilePageContainer">
      {userData && (
        <div className="profileSection">
          <img src={userData.profileImage} alt="Profile" className="profileImage" />
          <div className="profileDetails">
            <h1 className="profileTitle">{userData.username}</h1>
            <p className="profileInformation">{userData.description}</p>
          </div>
        </div>
      )}

      <div className="eventsSection">
        <div className="eventsCategory">
          <span className="eventSectionTitle">My Events</span>
          <div className="myEventsScroller">
            {events.myEvents.length > 0 ? (
              events.myEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="noEventsMessage">No events created yet.</p>
            )}
          </div>
        </div>
        <div className="eventsCategory">
          <span className="eventSectionTitle">Interested Events</span>
          <div className="myEventsScroller">
            {events.interestedEvents.length > 0 ? (
              events.interestedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="noEventsMessage">No events added to your interests yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
