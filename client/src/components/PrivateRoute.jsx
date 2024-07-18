import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const isAuth = JSON.parse(localStorage.getItem("isAuth"));

  if (!isAuth) {
    return <Navigate to="/signIn" />;
  }

  return children;
}
