import React, { useEffect, useState } from "react";
import "./index.css";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";

const JobSeeker = () => {
  const [jobData, setJobData] = useState([]);

  const fetchJobData = async () => {
    try {
      const response = await fetch("/api/job");
      const data = await response.json();
      console.log(data.data);
      if (data.success) {
        setJobData(data.data);
      }
    } catch (error) {
      toast.error("Error, while fetching Job details");
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);
  return (
    <section className="job-seeker-wrapper">
      <HeroSectionHeader heading="Get Your Best Job" />
      <div className="job-seeker">
        <div className="job-seeker-filter">
          {/* <div className="job-seeker-filter-inner">
            <FormControl>
              <InputLabel id={`demo-simple-select-label`}>
                Select Gender
              </InputLabel>
              <Select
                labelId={`demo-simple-select-label`}
                id={`demo-simple-select`}
                value="Male"
                label="Select Gender"
                // value={searchOption.gender}
                // onChange={(e) =>
                //   setSearchOption((prevState) => ({
                //     ...prevState,
                //     gender: e.target.value,
                //   }))
                // }
              >
                <MenuItem value="Select Gender" disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id={`demo-simple-select-label`}>
                Select Gender
              </InputLabel>
              <Select
                labelId={`demo-simple-select-label`}
                id={`demo-simple-select`}
                value="Male"
                label="Select Gender"
                // value={searchOption.gender}
                // onChange={(e) =>
                //   setSearchOption((prevState) => ({
                //     ...prevState,
                //     gender: e.target.value,
                //   }))
                // }
              >
                <MenuItem value="Select Gender" disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id={`demo-simple-select-label`}>
                Select Gender
              </InputLabel>
              <Select
                labelId={`demo-simple-select-label`}
                id={`demo-simple-select`}
                value="Male"
                label="Select Gender"
                // value={searchOption.gender}
                // onChange={(e) =>
                //   setSearchOption((prevState) => ({
                //     ...prevState,
                //     gender: e.target.value,
                //   }))
                // }
              >
                <MenuItem value="Select Gender" disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </div> */}
        </div>
        <div className="job-seeker-card-wrapper">
          {jobData && jobData.length > 0 ? (
            jobData.map((job) => (
              <div className="job-seeker-card" key={job._id}>
                <h4>{job.jobTitle}</h4>
                <h5>{job.companyIndustry}</h5>
                <div className="job-seeker-info">
                  <div className="job-seeker-details">
                    <p className="job-span">
                      {job.minExperience}-{job.maxExperience},
                    </p>
                    <p className="job-span">₹{job.salary}/m,</p>
                    <p className="job-span">{job.jobLocation}</p>
                  </div>
                  <div className="job-seeker-descriptions">
                    <p>{job.companyDescription}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>No Job Found!</h2>
          )}
          {/* <div className="job-seeker-card">
            <h4>Portal Management officer</h4>
            <h5>mycityband</h5>

            <div className="job-seeker-info">
              <div className="job-seeker-details">
                <p className="job-span">3-5 Yrs</p>
                <p className="job-span">₹ 10,000</p>
                <p className="job-span">Ahmedabad, Gujarat</p>
              </div>
              <div className="job-seeker-descriptions">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti aspernatur rerum culpa optio accusamus vero eum
                  quidem! Nulla, harum alias?
                </p>
              </div>
            </div>
          </div>
          <div className="job-seeker-card">
            <h4>Portal Management officer</h4>
            <h5>mycityband</h5>

            <div className="job-seeker-info">
              <div className="job-seeker-details">
                <p className="job-span">3-5 Yrs</p>
                <p className="job-span">₹ 10,000</p>
                <p className="job-span">Ahmedabad, Gujarat</p>
              </div>
              <div className="job-seeker-descriptions">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti aspernatur rerum culpa optio accusamus vero eum
                  quidem! Nulla, harum alias?
                </p>
              </div>
            </div>
          </div>
          <div className="job-seeker-card">
            <h4>Portal Management officer</h4>
            <h5>mycityband</h5>

            <div className="job-seeker-info">
              <div className="job-seeker-details">
                <p className="job-span">3-5 Yrs</p>
                <p className="job-span">₹ 10,000</p>
                <p className="job-span">Ahmedabad, Gujarat</p>
              </div>
              <div className="job-seeker-descriptions">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti aspernatur rerum culpa optio accusamus vero eum
                  quidem! Nulla, harum alias?
                </p>
              </div>
            </div>
          </div>
          <div className="job-seeker-card">
            <h4>Portal Management officer</h4>
            <h5>mycityband</h5>

            <div className="job-seeker-info">
              <div className="job-seeker-details">
                <p className="job-span">3-5 Yrs</p>
                <p className="job-span">₹ 10,000</p>
                <p className="job-span">Ahmedabad, Gujarat</p>
              </div>
              <div className="job-seeker-descriptions">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti aspernatur rerum culpa optio accusamus vero eum
                  quidem! Nulla, harum alias?
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default JobSeeker;
