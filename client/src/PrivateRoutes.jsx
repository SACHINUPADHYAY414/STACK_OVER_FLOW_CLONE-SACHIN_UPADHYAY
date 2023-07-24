import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const user = useSelector((state) => state.currentUserReducer);

  return user?.email ? <Outlet /> : <Navigate to="/Auth" />;
};

export default PrivateRoute;
