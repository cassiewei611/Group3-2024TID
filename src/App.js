// src/App.js
import React from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetailPage";

function App() {
  return (
    <div>
      <NavBar />
      <EventDetail />
    </div>
  );
}

export default App;
