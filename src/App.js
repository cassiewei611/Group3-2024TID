import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RequireAuth from "./components/RequireAuth";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetailPage";
import NavBar from "./components/NavBar";

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

  return (
    <>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/create-event"
          element={
            <RequireAuth>
              <CreateEvent />
            </RequireAuth>
          }
        />
        <Route
          path="/event-detail/:eventId"
          element={
            <RequireAuth>
              <EventDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;

