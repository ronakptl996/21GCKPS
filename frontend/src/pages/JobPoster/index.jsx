import React from "react";
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

const JobPoster = () => {
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
            />
            <TextField
              fullWidth
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              label="Job Location *"
              type="text"
              variant="outlined"
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
                  value="1 Years"
                  label="Minimum Experience"
                >
                  <MenuItem value="Fresher">Fresher</MenuItem>
                  <MenuItem value="6 Months">6 Months</MenuItem>
                  <MenuItem value="1 Years">1 Years</MenuItem>
                  <MenuItem value="a-">2 Years</MenuItem>
                  <MenuItem value="b+">3 Years</MenuItem>
                  <MenuItem value="b-">4 Years</MenuItem>
                  <MenuItem value="ab+">5 Years</MenuItem>
                  <MenuItem value="ab-">6 Years</MenuItem>
                  <MenuItem value="ab">7 Years</MenuItem>
                  <MenuItem value="ab">8 Years</MenuItem>
                  <MenuItem value="ab">9 Years</MenuItem>
                  <MenuItem value="ab">10 Years</MenuItem>
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
                  value="1 Years"
                  label="Maximum Experience"
                >
                  <MenuItem value="Fresher">Fresher</MenuItem>
                  <MenuItem value="6 Months">6 Months</MenuItem>
                  <MenuItem value="1 Years">1 Years</MenuItem>
                  <MenuItem value="a-">2 Years</MenuItem>
                  <MenuItem value="b+">3 Years</MenuItem>
                  <MenuItem value="b-">4 Years</MenuItem>
                  <MenuItem value="ab+">5 Years</MenuItem>
                  <MenuItem value="ab-">6 Years</MenuItem>
                  <MenuItem value="ab">7 Years</MenuItem>
                  <MenuItem value="ab">8 Years</MenuItem>
                  <MenuItem value="ab">9 Years</MenuItem>
                  <MenuItem value="ab">10 Years</MenuItem>
                  <MenuItem value="ab">12 Years</MenuItem>
                  <MenuItem value="ab">15 Years</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TextField
              fullWidth
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              label="Monthly Salary *"
              type="text"
              variant="outlined"
            />
            <TextField
              fullWidth
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              label="No Of Openings *"
              type="number"
              variant="outlined"
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
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email id"
                type="email"
                variant="outlined"
              />
            </div>
            <TextField
              style={{ margin: "10px 0" }}
              fullWidth
              id="outlined-basic"
              label="Company Industry"
              variant="outlined"
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
            />
            <TextField
              style={{ margin: "10px 0" }}
              fullWidth
              id="outlined-basic"
              label="Job Address"
              type="text"
              variant="outlined"
              multiline
              rows={2}
              maxRows={4}
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
    </div>
  );
};

export default JobPoster;
