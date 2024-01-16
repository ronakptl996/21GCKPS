import React from "react";
import "./AdminAddJobPosting.css";
import { Button, TextField } from "@mui/material";

const AdminAddJobPosting = () => {
  return (
    <section className="admin-job-posting">
      <section className="admin-job-posting-inner">
        <h2 className="admin-job-posting-header">Add Job Details</h2>
        <section className="admin-festival-form-wrapper">
          <form className="admin-festival-form">
            <div className="admin-festival-input-wrapper">
              <TextField
                id="outlined-basic"
                label="Job Name*"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Company Name*"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Salary*"
                variant="outlined"
              />
            </div>
            <div className="admin-festival-input-wrapper">
              <TextField
                id="outlined-basic"
                label="Experience in Year*"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Company Address*"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Job Description*"
                variant="outlined"
              />
            </div>
            <div className="committee-btn">
              <Button
                style={{ background: "#a7732b", marginTop: "10px" }}
                variant="contained"
                //   onClick={handleLogin}
              >
                Add Job
              </Button>
            </div>
          </form>
        </section>
      </section>
    </section>
  );
};

export default AdminAddJobPosting;
