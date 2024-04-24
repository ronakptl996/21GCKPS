import { CircularProgress, Modal } from "@mui/material";
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
  return isLoading ? (
    <Modal
      open={true}
      // onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <section className="loading-wrapper">
        <CircularProgress className="loading" />
        <h3>Loading...</h3>
      </section>
    </Modal>
  ) : (
    <>{children}</>
  );
};

export default AdminProtectedRoute;
