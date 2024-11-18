// Import Parse to initialize it on app load
import "./services/Parse";

import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetailPage";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";


function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const hideNavBarPaths = ["/"]; // Specify paths where NavBar should be hidden

  return (
    <>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/event-detail" element={<EventDetail />} />
      </Routes>
    </>
  );
}

export default App;
