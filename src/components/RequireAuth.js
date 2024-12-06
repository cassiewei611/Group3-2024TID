import React from "react";
import { Navigate } from "react-router-dom";
import Parse from "../services/Parse"; 

const RequireAuth = ({ children }) => {
    const currentUser = Parse.User.current(); 

    if (!currentUser) {
        // Redirect to the login page if no user is logged in
        return <Navigate to="/" replace />;
    }

    // Render the child components if the user is logged in
    return children;
};

export default RequireAuth;
