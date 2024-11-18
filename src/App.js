import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetailPage";
<<<<<<< HEAD
import EventDetailPage from "./pages/EventDetailPage";

function App() {
  return (
    <div>
      <NavBar />
      <CreateEvent />
    </div>
=======
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";


// Import Parse to initialize it on app load
import "./services/Parse";

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
>>>>>>> 57e7b7e159dfa8f43546af6bcf32aaac85250ce9
  );
}

export default App;
