import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./index.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const JobPoster = () => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    minExperience: "6 Months",
    maxExperience: "1 Year",
    salary: "",
    opening: "",
    companyContact: "",
    companyEmail: "",
    companyIndustry: "",
    companyDescription: "",
    companyAddress: "",
    createdBy: "",
  });

  const { loggedInUserDetails } = useSelector((store) => store.auth);

  const handleSubmit = async () => {
    setJobDetails((prevState) => ({
      ...prevState,
      createdBy: loggedInUserDetails._id,
    }));
    const {
      jobTitle,
      jobLocation,
      jobDescription,
      minExperience,
      maxExperience,
      salary,
      opening,
      companyContact,
      companyEmail,
      companyIndustry,
      companyDescription,
      companyAddress,
      createdBy,
    } = jobDetails;
    if (
      [
        jobTitle,
        jobLocation,
        jobDescription,
        minExperience,
        maxExperience,
        salary,
        opening,
        companyContact,
        companyEmail,
        companyIndustry,
        companyDescription,
        companyAddress,
        createdBy,
      ].some((field) => field == "")
    ) {
      toast.error("Please, Fill Job field");
      return;
    }

    try {
      const response = await fetch("/api/job/add-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDetails),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setJobDetails({
          jobTitle: "",
          jobLocation: "",
          jobDescription: "",
          minExperience: "6 Months",
          maxExperience: "1 Year",
          salary: "",
          opening: "",
          companyContact: "",
          companyEmail: "",
          companyIndustry: "",
          companyDescription: "",
          companyAddress: "",
          createdBy: "",
        });
      } else {
        toast.error("Error, while add job details");
      }
    } catch (error) {
      toast.error("Error, while add job details");
    }
  };
  return (
    <div className="login">
      <div className="register-form">
        <div className="form-header">
          <h2>Job Poster</h2>
        </div>
        <form>
          <div className="job-details">
            <label>Basic Job Details *</label>
            <TextField
              fullWidth
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              label="Job Title *"
              type="text"
              variant="outlined"
              value={jobDetails.jobTitle}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  jobTitle: e.target.value,
                }))
              }
            />
            <TextField
              fullWidth
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              label="Job Location *"
              type="text"
              variant="outlined"
              value={jobDetails.jobLocation}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  jobLocation: e.target.value,
                }))
              }
            />
            <TextField
              fullWidth
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              label="Job Descriptions *"
              type="text"
              variant="outlined"
              multiline
              rows={2}
              maxRows={4}
              value={jobDetails.jobDescription}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  jobDescription: e.target.value,
                }))
              }
            />
          </div>
          <div className="job-details">
            <label>Candidate Requirement *</label>
            <div className="input-select-wrapper">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Minimum Experience
                </InputLabel>
                <Select
                  style={{ width: "98%" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Minimum Experience"
                  value={jobDetails.minExperience}
                  onChange={(e) =>
                    setJobDetails((prevState) => ({
                      ...prevState,
                      minExperience: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="Fresher">Fresher</MenuItem>
                  <MenuItem value="6 Months">6 Months</MenuItem>
                  <MenuItem value="1 Year">1 Year</MenuItem>
                  <MenuItem value="2 Years">2 Years</MenuItem>
                  <MenuItem value="3 Years">3 Years</MenuItem>
                  <MenuItem value="4 Years">4 Years</MenuItem>
                  <MenuItem value="5 Years">5 Years</MenuItem>
                  <MenuItem value="6 Years">6 Years</MenuItem>
                  <MenuItem value="7 Years">7 Years</MenuItem>
                  <MenuItem value="8 Years">8 Years</MenuItem>
                  <MenuItem value="9 Years">9 Years</MenuItem>
                  <MenuItem value="10 Years">10 Years</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Maximum Experience
                </InputLabel>
                <Select
                  style={{ width: "99%" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Maximum Experience"
                  value={jobDetails.maxExperience}
                  onChange={(e) =>
                    setJobDetails((prevState) => ({
                      ...prevState,
                      maxExperience: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="Fresher">Fresher</MenuItem>
                  <MenuItem value="6 Months">6 Months</MenuItem>
                  <MenuItem value="1 Year">1 Year</MenuItem>
                  <MenuItem value="2 Years">2 Years</MenuItem>
                  <MenuItem value="3 Years">3 Years</MenuItem>
                  <MenuItem value="4 Years">4 Years</MenuItem>
                  <MenuItem value="5 Years">5 Years</MenuItem>
                  <MenuItem value="6 Years">6 Years</MenuItem>
                  <MenuItem value="7 Years">7 Years</MenuItem>
                  <MenuItem value="8 Years">8 Years</MenuItem>
                  <MenuItem value="9 Years">9 Years</MenuItem>
                  <MenuItem value="10 Years">10 Years</MenuItem>
                  <MenuItem value="12 Years">12 Years</MenuItem>
                  <MenuItem value="15 Years">15 Years</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TextField
              fullWidth
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              label="Monthly Salary *"
              type="number"
              variant="outlined"
              value={jobDetails.salary}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  salary: e.target.value,
                }))
              }
            />
            <TextField
              fullWidth
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              label="No Of Openings *"
              type="number"
              variant="outlined"
              value={jobDetails.opening}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  opening: e.target.value,
                }))
              }
            />
          </div>

          <div className="job-details">
            <label>About Your Company *</label>
            <div className="input-job-wrapper">
              <TextField
                fullWidth
                style={{ marginRight: "5px" }}
                id="outlined-basic"
                label="Your Phone Number"
                type="number"
                variant="outlined"
                value={jobDetails.companyContact}
                onChange={(e) =>
                  setJobDetails((prevState) => ({
                    ...prevState,
                    companyContact: e.target.value,
                  }))
                }
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email id"
                type="email"
                variant="outlined"
                value={jobDetails.companyEmail}
                onChange={(e) =>
                  setJobDetails((prevState) => ({
                    ...prevState,
                    companyEmail: e.target.value,
                  }))
                }
              />
            </div>
            <TextField
              style={{ margin: "10px 0" }}
              fullWidth
              id="outlined-basic"
              label="Company Industry"
              variant="outlined"
              value={jobDetails.companyIndustry}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  companyIndustry: e.target.value,
                }))
              }
            />
            <TextField
              style={{ margin: "10px 0" }}
              fullWidth
              id="outlined-basic"
              label="Company Description"
              type="text"
              variant="outlined"
              multiline
              rows={2}
              maxRows={4}
              value={jobDetails.companyDescription}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  companyDescription: e.target.value,
                }))
              }
            />
            <TextField
              style={{ margin: "10px 0" }}
              fullWidth
              id="outlined-basic"
              label="Company Address"
              type="text"
              variant="outlined"
              multiline
              rows={2}
              maxRows={4}
              value={jobDetails.companyAddress}
              onChange={(e) =>
                setJobDetails((prevState) => ({
                  ...prevState,
                  companyAddress: e.target.value,
                }))
              }
            />
            <div>
              <Button
                fullWidth
                style={{ background: "#a7732b", marginTop: "10px" }}
                variant="contained"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPoster;
