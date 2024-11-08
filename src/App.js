// src/App.js
import React from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetailPage";
import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = 'HuKo8mIdhoVZSdGmhrpUrVbbAbpD2Kxfj2ce436R';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'QXQMc0yr5pt3G8tlLqldSGPnw9pOJ3XEYL51Yq9';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <div>
      <NavBar />
      <CreateEvent />
    </div>
  );
}

export default App;
