import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoggedInUserDetails } from "../../features/auth/authSlice";
import Loading from "../Loading/Loading";

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

  return isLoading ? <Loading /> : <>{children}</>;
};

export default ProtectedRoute;
