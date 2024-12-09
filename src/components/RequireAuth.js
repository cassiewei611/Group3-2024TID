import React from "react";
import { Navigate } from "react-router-dom";
import Parse from "../services/Parse"; 

const RequireAuth = ({ children }) => {
    const currentUser = Parse.User.current(); 

    if (!currentUser) {
        
        return <Navigate to="/" replace />;
    }

   
    return children;
};

export default RequireAuth;
