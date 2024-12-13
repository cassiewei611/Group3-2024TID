// Import Parse to initialize it on app load
import Parse from "./services/Parse";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetailPage";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RequireAuth from "./components/RequireAuth"; 


function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const hideNavBarPaths = ["/"];

  const currentUser = Parse.User.current();

  return (
    <>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
         {/* Public Routes */}
        <Route path="/" element={<Login />} />
        {/* Private  Routes */}
        <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
        <Route path="/signup" element={<RequireAuth><SignUpPage /></RequireAuth>} />
        <Route path="/create-event" element={<RequireAuth><CreateEvent /></RequireAuth>} />
        <Route path="/event-detail/:eventId" element={<RequireAuth><EventDetail /></RequireAuth>} />

      </Routes>
    </>
  );
}

export default App;
