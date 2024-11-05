// src/App.js
import React from "react";
import NavBar from "./components/NavBar";
import CreateEvent from "./pages/CreateEvent";
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <NavBar />
      <LoginPage />
      <CreateEvent />
      <EventDetailPage />
      <HomePage />
    </div>
  )



}

export default App;

