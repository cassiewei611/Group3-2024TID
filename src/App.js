// src/App.js
import React from "react";
import NavBar from "./components/NavBar";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetailPage";

function App() {
  return (
    <div>
      <NavBar />
      <CreateEvent />
    </div>
  );
}

export default App;
