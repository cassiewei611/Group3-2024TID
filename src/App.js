// src/App.js
import React from "react";
import NavBar from "./components/NavBar";
import CreateEvent from "./pages/CreateEvent";
import EventDetailPage from './pages/EventDetailPage';

function App() {
  return (
    <div>
      <NavBar />
      <CreateEvent />
      <EventDetailPage />
    </div>
  );

}

export default App;
