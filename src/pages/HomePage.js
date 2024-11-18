import React, { useCallback, useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Filter from "../components/Filter";
import './HomePage.css';
import { fetchAllEvents } from "../services/Parse";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchAllEvents();
      setEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents); // Initially set filtered events to all events
    };

    loadEvents();
  }, []);


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
