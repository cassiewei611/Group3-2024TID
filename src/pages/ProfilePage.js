import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Parse from "../services/Parse";
import { fetchUserEvents, fetchEventDetails } from "../services/Parse"; // Ensure correct import paths
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
        const User = Parse.Object.extend("_User");
        const query = new Parse.Query(User);
        query.equalTo("objectId", targetUserId);
        const user = await query.first();

        if (user) {
          const username = user.get("username");
          const email = user.get("email");
          const phone = user.get("phone");
          const description = user.get("description");
          const profileImage = user.get("profileImage")?.url();

          setUserData({ username, email, phone, description, profileImage });

          const myEvents = await fetchUserEvents(targetUserId);


          // Fetch interested events
          const Participant = Parse.Object.extend("Participant");
          const participantQuery = new Parse.Query(Participant);
          participantQuery.equalTo("user_id", {
            __type: "Pointer",
            className: "_User",
            objectId: targetUserId,
          });
          participantQuery.include("event_id"); // Include the event details in the result

          const participantRecords = await participantQuery.find();

          // Use fetchEventDetails to get full event details
          const interestedEvents = await Promise.all(
            participantRecords.map(async (record) => {
              const eventId = record.get("event_id").id;
              return await fetchEventDetails(eventId);
            })
          );

          setEvents({
            myEvents,
            interestedEvents: interestedEvents.filter(Boolean), // Remove null values
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);


  if (loading) return <div className="loading-container">
    <div className="spinner"></div>
    <p>Loading the profile, please wait...</p>
  </div>

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
