import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetailPage";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = 'HuKo8mIdhoVZSdGmhrpUrVbbAbpD2Kxfj2ce436R';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'QXQMc0yr5pt3G8tlLqldSGPnw9pOJ3XEYL51Yq9';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

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
