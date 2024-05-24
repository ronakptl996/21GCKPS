import React, { useState } from "react";
import "./index.css";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  setIsLoggedIn,
  setLoggedInUserDetails,
  setLoading,
} from "../../features/auth/authSlice";
import { signInSchema } from "../../schemas";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleBlur, handleChange, errors, handleSubmit, touched } =
    useFormik({
      validationSchema: signInSchema,
      initialValues: initialValues,
      onSubmit: async (values) => {
        await handleLogin(values);
      },
    });

  const handleLogin = async (data) => {
    try {
      dispatch(setLoading(true));
      let result = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await result.json();

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
    } finally {
      dispatch(setLoading(false));
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
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? true : false}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password *"
                type="password"
                variant="outlined"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginTop: "10px" }}
                error={touched.password && errors.password ? true : false}
                helperText={touched.password && errors.password}
              />

              <div>
                <p className="forgot-password">
                  <Link to="/forgot-password">Forgot Password</Link>
                </p>
                <Button
                  fullWidth
                  style={{ background: "#a7732b", marginTop: "10px" }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Login
                </Button>

                <span className="register-link">
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
