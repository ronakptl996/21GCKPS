import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchLoggedInUserDetails } from "../../features/auth/authSlice";

const AdminProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(fetchLoggedInUserDetails());
  //   }, [dispatch]);

  const { loggedInUserDetails, isLoading } = useSelector((state) => state.auth);
  console.log(isLoading);

  //   useEffect(() => {
  if (!isLoading) {
    if (loggedInUserDetails?.isAdmin != "true") {
      return <Navigate to="/home" replace />;
    }
  }
  //   }, [loggedInUserDetails, isLoading]);

  // Render loading state or the protected content
  return isLoading ? <p>Loading...</p> : <>{children}</>;
};

export default AdminProtectedRoute;
