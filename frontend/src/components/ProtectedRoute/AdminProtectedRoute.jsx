import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { loggedInUserDetails, isLoading } = useSelector((state) => state.auth);
  console.log(isLoading);

  //   useEffect(() => {
  if (!isLoading) {
    if (loggedInUserDetails?.decoded?.isAdmin != "true") {
      return <Navigate to="/home" replace />;
    }
  }
  //   }, [loggedInUserDetails, isLoading]);

  // Render loading state or the protected content
  return isLoading ? <p>Loading...</p> : <>{children}</>;
};

export default AdminProtectedRoute;
