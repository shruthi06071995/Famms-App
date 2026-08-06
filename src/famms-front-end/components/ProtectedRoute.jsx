import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Children }) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.token) {
        return <Navigate to="/login" replace />
    }

    return Children;

};

export default ProtectedRoute;