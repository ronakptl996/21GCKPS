import React, { useState } from "react";
import "./index.css";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setIsLoggedIn,
  setLoggedInUserDetails,
} from "../../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let data = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let response = await data.json();
      console.log(response);

      if (response.success) {
        toast.success(response.message);
        dispatch(setLoggedInUserDetails(data.data));
        navigate("/home");
      } else {
        dispatch(setIsLoggedIn(false));
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong while login!!");
    }
  };

  return (
    <section className="landing-page">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password *"
                type="password"
                variant="outlined"
                style={{ marginTop: "10px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <Button
                  fullWidth
                  style={{ background: "#a7732b", marginTop: "10px" }}
                  variant="contained"
                  onClick={handleLogin}
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
    </section>
  );
};

export default Login;
