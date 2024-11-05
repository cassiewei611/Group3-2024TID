// HomePage.js
import React, { useCallback, useState } from "react";
import EventCard from "../components/EventCard";
import Filter from "../components/Filter";

function HomePage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      image: "/images/event2.jpg",
      title: "Dog Meetup",
      date: "2024-11-10",
      time: "10:00 AM",
      city: "Copenhagen",
      type: "Dog",
    },
    {
      id: 2,
      image: "images/event4.jpg",
      title: "Cat Workshop",
      date: "2024-11-12",
      time: "2:00 PM",
      city: "Aarhus",
      type: "Cat",
    },
    {
      id: 3,
      image: "images/event3.jpg",
      title: "Blackbird watching",
      date: "2024-11-08",
      time: "6:00 PM",
      city: "Odense",
      type: "Bird",
    },
    {
      id: 3,
      image: "images/event3.jpg",
      title: "Blackbird watching",
      date: "2024-11-08",
      time: "6:00 PM",
      city: "Odense",
      type: "Bird",
    },
    {
      id: 3,
      image: "images/event3.jpg",
      title: "Blackbird watching",
      date: "2024-11-08",
      time: "6:00 PM",
      city: "Odense",
      type: "Bird",
    },
    {
      id: 3,
      image: "images/event3.jpg",
      title: "Blackbird watching",
      date: "2024-11-08",
      time: "6:00 PM",
      city: "Odense",
      type: "Bird",
    },
    {
      id: 3,
      image: "images/event3.jpg",
      title: "Blackbird watching",
      date: "2024-11-08",
      time: "6:00 PM",
      city: "Odense",
      type: "Bird",
    },
    // Additional events...
  ]);

  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleFilterChange = useCallback(
    (filters) => {
      const { city, date, eventType } = filters;
      const filtered = events.filter(
        (event) =>
          (!city || event.city === city) &&
          (!date || event.date === date) &&
          (!eventType || event.type === eventType)
      );
      setFilteredEvents(filtered);
      // Step 4: Log filtered events
      console.log("Filtered Events:", filtered);
    },
    [events]
  );

  const handleSaveEvent = (id) => {
    console.log(`Event ${id} saved`);
  };

  return (
    <div style={pageContainerStyle}>
      <Filter onFilterChange={handleFilterChange} />
      <div style={eventsContainerStyle}>
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={{ ...event, onSave: handleSaveEvent }}
          />
        ))}
      </div>
    </div>
  );
}

const pageContainerStyle = {
  display: "flex",
  gap: "20px",
  padding: "20px",
};

const eventsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  flex: 1,
};

export default HomePage;
