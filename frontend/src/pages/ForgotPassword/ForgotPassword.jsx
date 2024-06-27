import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";

const ForgotPassword = () => {
  const [otp, setOtp] = useState();
  const [phone, setPhone] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${phone}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        toast.success("OTP sent successfully");
        setLoading(false);
        setShowOTP(true);
        sessionStorage.setItem("forgotId", data.data.forgotId);
        sessionStorage.setItem("contact", data.data.phone);
      } else {
        toast.error("Error while sent OTP");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      const forgotId = sessionStorage.getItem("forgotId");

      if (!forgotId) {
        toast.error("Please try again!");
        return;
      }

      const response = await fetch(`/api/users/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ forgotId, otp }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setShowOTP(false);
        setLoading(false);
        setForgot(true);
        toast.success(data.message);
        sessionStorage.removeItem("forgotId");
        sessionStorage.setItem("forgotInput", true);
      } else if (!data.success && data.statusCode == 400) {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error while verifying OTP");
    }
  };

  const forgotPassword = async () => {
    setLoading(true);
    try {
      if (newPassword != confirmPassword) {
        toast.error("Password must be same");
        return;
      }

      const contact = sessionStorage.getItem("contact");
      if (!contact) {
        toast.error("Please try again!");
        return;
      }

      const response = await fetch(`/api/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, contact }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        sessionStorage.removeItem("forgotInput");
        sessionStorage.removeItem("contact");
        setForgot(false);
        navigate("/login");
      } else if ((data.statusCode = 400)) {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("forgotId")) {
      setShowOTP(true);
    }
    if (sessionStorage.getItem("forgotInput")) {
      setForgot(true);
    }
  }, []);

  return (
    <section className="forgot-wrapper">
      <HeroSectionHeader heading="Forgot Password" />
      <section className="forgot-inner">
        <div className="register-form">
          <div id="recaptcha-container"></div>
          <form>
            {showOTP ? (
              <div className="otp-wrapper">
                <h3>Enter OTP</h3>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  className="opt-container"
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input {...props} />}
                />
                <Button onClick={verifyOTP} variant="contained">
                  {loading && <CircularProgress />} Verify OTP
                </Button>
              </div>
            ) : (
              <div className="job-details">
                {forgot ? (
                  <>
                    <TextField
                      style={{ margin: "10px 0" }}
                      fullWidth
                      type="text"
                      id="outlined-basic"
                      label="New Password"
                      variant="outlined"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                      style={{ margin: "10px 0" }}
                      fullWidth
                      type="text"
                      id="outlined-basic"
                      label="Confirm Password"
                      variant="outlined"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div>
                      <Button
                        fullWidth
                        style={{
                          background: "#a7732b",
                          marginTop: "10px",
                        }}
                        variant="contained"
                        onClick={forgotPassword}
                      >
                        {loading && <CircularProgress />}
                        Forgot Password
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="forgot-mobile">
                      <TextField
                        style={{ margin: "10px 0" }}
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        label="Enter Family Head Mobile No."
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <Button
                        fullWidth
                        style={{
                          background: "#a7732b",
                          marginTop: "10px",
                        }}
                        variant="contained"
                        onClick={onSubmit}
                      >
                        {loading && <CircularProgress />}
                        Get OTP
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </form>
        </div>
      </section>
    </section>
  );
};

export default ForgotPassword;
