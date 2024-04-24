import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoggedInUserDetails } from "../../features/auth/authSlice";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Modal,
  Stack,
} from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchLoggedInUserDetails());
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuth) {
        navigate("/login");
      }
    }
  }, [isLoading, isAuth]);

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

export default ProtectedRoute;
