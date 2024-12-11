import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Parse from "../services/Parse"; // Ensure this matches the path to your Parse setup
import { fetchEventDetails } from "../services/Parse";
import "./ProfilePage.css";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState({ myEvents: [], interestedEvents: [] });
  const [loading, setLoading] = useState(true);


  const fetchUserEvents = async (userId) => {
    try {
      const Event = Parse.Object.extend("Event");
      const query = new Parse.Query(Event);
      query.equalTo("created_by", {
        __type: "Pointer",
        className: "_User",
        objectId: userId,
      });

      const results = await query.find();
      return results.map((event) => ({
        id: event.id,
        title: event.get("heading"),
        description: event.get("description"),
        date: event.get("datetime") ? new Date(event.get("datetime")).toISOString().split("T")[0] : null,
        city: event.get("location"),
        image: event.get("image")?.url(),
        petType: event.get("petType"),
      }));
    } catch (error) {
      console.error("Error fetching user events:", error);
      return [];
    }
  };

 
  const fetchInterestedEvents = async (userId) => {
    try {
      const Participant = Parse.Object.extend("Participant");
      const query = new Parse.Query(Participant);
      query.equalTo("user_id", {
        __type: "Pointer",
        className: "_User",
        objectId: userId,
      });
      query.include("event_id");

      const results = await query.find();
      return results.map((record) => {
        const event = record.get("event_id");
        return {
          id: event.id,
          title: event.get("heading"),
          description: event.get("description"),
          date: event.get("datetime") ? new Date(event.get("datetime")).toISOString().split("T")[0] : null,
          city: event.get("location"),
          image: event.get("image")?.url(),
          petType: event.get("petType"),
        };
      });
    } catch (error) {
      console.error("Error fetching interested events:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const currentUser = Parse.User.current();
      if (currentUser) {
        try {
          const username = currentUser.get("username");
          const email = currentUser.get("email");
          const phone = currentUser.get("phone");
          const description = currentUser.get("description");
          const profileImage = currentUser.get("profileImage")?.url();

          setUserData({ username, email, phone, description, profileImage });

          const myEvents = await fetchUserEvents(currentUser.id);
          const interestedEvents = await fetchInterestedEvents(currentUser.id);

          setEvents({ myEvents, interestedEvents });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profilePageContainer">
      {userData && (
        <div className="profileSection">
          <img src={userData.profileImage} alt="Profile" className="profileImage" />
          <h2>{userData.username}</h2>
          <p>{userData.email}</p>
          <p>{userData.phone}</p>
          <p>{userData.description}</p>
        </div>
      )}

      <div className="eventsSection">
        <h3>My Events</h3>
        <div className="eventsContainer">
          {events.myEvents.length > 0 ? (
            events.myEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p>No events created yet.</p>
          )}
        </div>

        <h3>Interested Events</h3>
        <div className="eventsContainer">
          {events.interestedEvents.length > 0 ? (
            events.interestedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p>No events added to your interests yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
