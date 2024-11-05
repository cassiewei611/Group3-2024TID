// src/App.js
import React from 'react';
import NavBar from './components/NavBar';
import EventDetailPage from './pages/EventDetailPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <EventDetailPage />
    </div>
  );
}

export default App;
