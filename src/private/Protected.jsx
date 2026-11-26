
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Protected=({ children, allowedRole }) => {
    const { user }=useAuth();

    // Check whether user is logged in
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Check whether the logged-in user has the correct role
    if (user.role!==allowedRole) {
        if (user.role==="admin") {
            return <Navigate to="/admindash" replace />;
        } else {
            return <Navigate to="/userdash" replace />;
        }
    }

    return children;
};

export default Protected;
