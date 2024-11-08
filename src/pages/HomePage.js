import React, { useCallback, useState } from "react";
import EventCard from "../components/EventCard";
import Filter from "../components/Filter";
import './HomePage.css';

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
      id: 4,
      image: "images/event3.jpg",
      title: "Blackbird watching",
      date: "2024-11-08",
      time: "6:00 PM",
      city: "Odense",
      type: "Bird",
    },
    {
      id: 5,
      image: "images/event3.jpg",
      title: "Blackbird watching",
      date: "2024-11-08",
      time: "6:00 PM",
      city: "Odense",
      type: "Bird",
    },
    {
      id: 6,
      image: "images/event3.jpg",
      title: "Blackbird watching",
      date: "2024-11-08",
      time: "6:00 PM",
      city: "Odense",
      type: "Bird",
    },
    {
      id: 7,
      image: "images/event3.jpg",
      title: "Blackbird watching",
      date: "2024-11-08",
      time: "6:00 PM",
      city: "Odense",
      type: "Bird",
    }
    // More events here...
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
      // Log filtered events
      console.log("Filtered Events:", filtered);
    },
    [events]
  );

  const handleSaveEvent = (id) => {
    console.log(`Event ${id} saved`);
  };

  return (
    <div className="homePageContainer">
      <Filter onFilterChange={handleFilterChange} />
      <div className="eventsContainer">
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

export default HomePage;
