import React, { useCallback, useState, useEffect, useMemo } from "react";
import EventCard from "../components/EventCard";
import Filter from "../components/Filter";
import './HomePage.css';
import { fetchAllEvents } from "../services/Parse";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({city:null, date:null, petType:null});

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchAllEvents();
      setEvents(fetchedEvents); 
    };

    loadEvents();
  }, []);
//filtering
  const filteredEvents = useMemo(() => {
    return events.filter(
      (event) =>
        (!filters.city || event.city === filters.city) &&
        (!filters.date || event.date === filters.date) &&
        (!filters.petType || event.petType === filters.petType)
    );
  }, [events, filters]);
//rendering 
  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      console.log("Filters Applied:", newFilters);
    },
    [] // 0 dependencies bc it doesn't rely on external variables
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
                    event={event}
                />
            ))}
        </div>
    </div>
);

}

export default HomePage;
