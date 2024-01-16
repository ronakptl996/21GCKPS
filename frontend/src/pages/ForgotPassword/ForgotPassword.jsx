import { Button, TextField } from "@mui/material";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import React from "react";

const ForgotPassword = () => {
  return (
    <section className="forgot-wrapper">
      <HeroSectionHeader heading="Forgot Password" />
      <section className="forgot-inner">
        <div className="register-form">
          <form>
            <div className="job-details">
              <TextField
                style={{ margin: "10px 0" }}
                fullWidth
                id="outlined-basic"
                label="Enter family head mobile no."
                variant="outlined"
              />
              <div>
                <Button
                  fullWidth
                  style={{ background: "#a7732b", marginTop: "10px" }}
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default ForgotPassword;
