import React from "react";
import "./index.css";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const JobSeeker = () => {
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
        </div>
      </div>
    </section>
  );
};

export default JobSeeker;
