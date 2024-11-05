// src/App.js
import React from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetailPage";
import LogInPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <NavBar />
      <HomePage />
    </div>
  );
}

export default App;
