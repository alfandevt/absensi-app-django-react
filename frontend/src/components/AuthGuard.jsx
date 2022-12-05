import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ isAllowed, redirectPath, element, children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return element ? element : children;
};

export default AuthGuard;
