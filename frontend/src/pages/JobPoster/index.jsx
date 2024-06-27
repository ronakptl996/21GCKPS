import React, { useState } from "react";
import "./index.css";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { setLoading } from "../../features/auth/authSlice";
import { jobPosterValidationSchema } from "../../schemas";

const JobPoster = () => {
  const dispatch = useDispatch();

  const initialValues = {
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    minExperience: "Fresher",
    maxExperience: "1 Year",
    salary: "",
    opening: "",
    companyName: "",
    companyContact: "",
    companyEmail: "",
    companyIndustry: "",
    companyAddress: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: jobPosterValidationSchema,
      onSubmit: async (values, { resetForm }) => {
        console.log("VALUES >>", values);
        await handleForm(values, resetForm);
      },
    });

  const handleForm = async (formData, resetForm) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/job/add-job`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error("Error, while add job details");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="register-form job-poster-form">
      <div className="form-header jobposter-header">
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
            name="jobTitle"
            value={values.jobTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.jobTitle && Boolean(errors?.jobTitle)}
            helperText={touched?.jobTitle && errors?.jobTitle}
          />
          <TextField
            fullWidth
            style={{ margin: "10px 0" }}
            id="outlined-basic"
            label="Job Location *"
            type="text"
            variant="outlined"
            name="jobLocation"
            value={values.jobLocation}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.jobLocation && Boolean(errors?.jobLocation)}
            helperText={touched?.jobLocation && errors?.jobLocation}
          />
          <TextField
            fullWidth
            style={{ margin: "10px 0" }}
            id="outlined-basic"
            label="Job Descriptions *"
            type="text"
            variant="outlined"
            multiline
            minRows={2}
            name="jobDescription"
            value={values.jobDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.jobDescription && Boolean(errors?.jobDescription)}
            helperText={touched?.jobDescription && errors?.jobDescription}
          />
        </div>
        <div className="job-details">
          <label>Candidate Requirement *</label>
          <div className="input-select-wrapper">
            <FormControl
              fullWidth
              error={touched?.minExperience && Boolean(errors?.minExperience)}
            >
              <InputLabel id="demo-simple-select-label">
                Minimum Experience
              </InputLabel>
              <Select
                style={{ width: "98%" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Minimum Experience"
                name="minExperience"
                value={values.minExperience}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="Fresher">Fresher</MenuItem>
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
              {touched?.minExperience && errors?.minExperience && (
                <FormHelperText>{errors?.minExperience}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={touched?.maxExperience && Boolean(errors?.maxExperience)}
            >
              <InputLabel id="demo-simple-select-label">
                Maximum Experience
              </InputLabel>
              <Select
                style={{ width: "99%" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Maximum Experience"
                name="maxExperience"
                value={values.maxExperience}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="Fresher">Fresher</MenuItem>
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
              {touched?.maxExperience && errors?.maxExperience && (
                <FormHelperText>{errors?.maxExperience}</FormHelperText>
              )}
            </FormControl>
          </div>

          <TextField
            fullWidth
            style={{ margin: "10px 0" }}
            id="outlined-basic"
            label="Monthly Salary *"
            type="number"
            variant="outlined"
            name="salary"
            value={values.salary}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.salary && Boolean(errors?.salary)}
            helperText={touched?.salary && errors?.salary}
          />
          <TextField
            fullWidth
            style={{ margin: "10px 0" }}
            id="outlined-basic"
            label="No Of Openings *"
            type="number"
            variant="outlined"
            name="opening"
            value={values.opening}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.opening && Boolean(errors?.opening)}
            helperText={touched?.opening && errors?.opening}
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
              name="companyContact"
              value={values.companyContact}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.companyContact && Boolean(errors?.companyContact)}
              helperText={touched?.companyContact && errors?.companyContact}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email id"
              type="email"
              variant="outlined"
              name="companyEmail"
              value={values.companyEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.companyEmail && Boolean(errors?.companyEmail)}
              helperText={touched?.companyEmail && errors?.companyEmail}
            />
          </div>
          <div className="input-job-wrapper">
            <TextField
              style={{ marginRight: "5px" }}
              fullWidth
              id="outlined-basic"
              label="Company Name"
              variant="outlined"
              name="companyName"
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.companyName && Boolean(errors?.companyName)}
              helperText={touched?.companyName && errors?.companyName}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Company Industry"
              variant="outlined"
              name="companyIndustry"
              value={values.companyIndustry}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched?.companyIndustry && Boolean(errors?.companyIndustry)
              }
              helperText={touched?.companyIndustry && errors?.companyIndustry}
            />
          </div>
          <TextField
            style={{ margin: "10px 0" }}
            fullWidth
            id="outlined-basic"
            label="Company Address"
            type="text"
            variant="outlined"
            multiline
            minRows={2}
            name="companyAddress"
            value={values.companyAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.companyAddress && Boolean(errors?.companyAddress)}
            helperText={touched?.companyAddress && errors?.companyAddress}
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
  );
};

export default JobPoster;
