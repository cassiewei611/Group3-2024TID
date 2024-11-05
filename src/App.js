// src/App.js
import React from "react";
import NavBar from "./components/NavBar";
import CreateEvent from "./pages/CreateEvent";
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <LoginPage />
      <NavBar />
      <CreateEvent />
      <EventDetailPage />
    </div>
)



}

export default App;

