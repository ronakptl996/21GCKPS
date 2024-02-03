import React, { useState } from "react";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import { Button, TextField } from "@mui/material";
import OtpInput from "react-otp-input";
import { auth } from "../../firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import "./ForgotPassword.css";
import CircularProgress from "@mui/material/CircularProgress";

const ForgotPassword = () => {
  const [otp, setOtp] = useState();
  const [phone, setPhone] = useState();
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
            onSignUp();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            toast.error("reCAPTCHA again!");
          },
        },
        auth
      );
    }
  }

  async function onSignUp() {
    const response = await fetch(`/api/users/${phone}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      setLoading(true);
      onCaptchaVerify();

      const appVerifier = window.recaptchaVerifier;
      const formatPh = "+91" + phone;
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP send successfully!");
          // ...
        })
        .catch((error) => {
          setLoading(false);
          // Error; SMS not sent
          // ...
          toast.error("Invalid Captcha");
          console.log("signInWithPhoneNumber error", error);
        });
    } else {
      setLoading(false);
      toast.error("User with phone not found!");
    }
  }

  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
                <Button onClick={onOTPVerify}>Verify OTP</Button>
              </div>
            ) : (
              <div className="job-details forgot-mobile">
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
                <div>
                  <Button
                    fullWidth
                    style={{
                      background: "#a7732b",
                      marginTop: "10px",
                    }}
                    variant="contained"
                    onClick={onSignUp}
                  >
                    {loading && <CircularProgress />}
                    Get OTP
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </section>
  );
};

export default ForgotPassword;
