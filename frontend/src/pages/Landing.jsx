import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoggedInUserDetails } from "../features/auth/authSlice";
import Login from "./Login/Login";

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
    <p>Loading...</p>
  ) : (
    <>
      <Login />
      {/* <section className="landing-page">
      <div className="landing-page-inner">
        <div className="landing-first">
          <h3>Welcome To</h3>
          <h1>21 Gam Charotar Kadva Patidar Samaj</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
            quasi! Nisi qui modi nostrum debitis est nobis perferendis corporis
            reprehenderit culpa tempore, expedita non rerum consectetur sint,
            esse molestias labore!
          </p>
        </div>
        <div className="landing-second">
          <div className="landing-form">
            <div className="form-header">
              <h2>Login to your account</h2>
              <p>
                Please input your username and password and login to your
                account to get access to your dashboard.
              </p>
            </div>
            <form>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email *"
                type="email"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password *"
                type="text"
                variant="outlined"
                style={{ marginTop: "10px" }}
              />

              <div>
                <Button
                  fullWidth
                  style={{ background: "#a7732b", marginTop: "10px" }}
                  variant="contained"
                >
                  Login
                </Button>

                <span>
                  Haven't any account? <Link to="/register">Sign Up</Link>{" "}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section> */}
    </>
  );
};

export default Landing;
