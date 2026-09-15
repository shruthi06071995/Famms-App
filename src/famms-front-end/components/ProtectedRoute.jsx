import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }

    if (userInfo.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;