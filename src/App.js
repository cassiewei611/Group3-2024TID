// src/App.js
import React from "react";
import NavBar from "./components/NavBar";
import CreateEvent from "./pages/CreateEvent";
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from "./pages/LoginPage";
import React from 'react';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <LoginPage />
      <NavBar />
      <CreateEvent />
      <EventDetailPage />
      <NavBar />
      <HomePage />
    </div>
  )



}

export default App;

