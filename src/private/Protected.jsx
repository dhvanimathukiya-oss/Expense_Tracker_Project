import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Protected=() => {

    const { user }=useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default Protected;