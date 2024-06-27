import React, { useState } from "react";
import "./index.css";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ErrorMessage, useFormik } from "formik";
import {
  setIsLoggedIn,
  setLoggedInUserDetails,
  setLoading,
} from "../../features/auth/authSlice";
import { signInSchema } from "../../schemas";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (data) => {
    try {
      dispatch(setLoading(true));
      let result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
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
              <FormControl
                fullWidth
                sx={{ my: 1.5 }}
                variant="outlined"
                error={touched.password && Boolean(errors.password)}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {touched?.password && errors?.password && (
                  <FormHelperText>{errors?.password}</FormHelperText>
                )}
              </FormControl>

              <div>
                <p className="forgot-password">
                  <Link to="/forgot-password">Forgot Password</Link>
                </p>
                <Button
                  fullWidth
                  style={{ background: "#a7732b", marginTop: "20px" }}
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
