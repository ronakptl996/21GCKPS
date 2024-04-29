import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoggedInUserDetails } from "../features/auth/authSlice";
import Login from "./Login/Login";
import Loading from "../components/Loading/Loading";

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchLoggedInUserDetails());
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isAuth) {
        navigate("/home");
      }
    }
  }, [isLoading, isAuth]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Login />
    </>
  );
};

export default Landing;
