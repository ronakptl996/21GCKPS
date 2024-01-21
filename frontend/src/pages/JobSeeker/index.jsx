import React, { useEffect, useState } from "react";
import "./index.css";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import ApartmentIcon from "@mui/icons-material/Apartment";
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
                <div className="job-seeker-header">
                  <div>
                    <h4>{job.jobTitle}</h4>
                    <h5>{job.companyName}</h5>
                  </div>
                  <div>
                    <button>Apply Now</button>
                  </div>
                </div>

                <div className="job-seeker-info">
                  <div className="job-seeker-details">
                    <p className="job-span">
                      <WorkOutlineIcon /> {job.minExperience}-
                      {job.maxExperience}
                    </p>
                    <p className="job-span">
                      <CurrencyRupeeIcon />
                      {job.salary}
                    </p>
                    <p className="job-span">
                      <LocationOnIcon />{" "}
                      <span className="jobLocation">Job Location: </span>
                      {job.jobLocation}
                    </p>
                    <p className="job-span">Opening: {job.opening}</p>
                  </div>
                  <div className="job-seeker-descriptions">
                    <p className="job-span">
                      <DescriptionIcon />
                      {job.jobDescription}
                    </p>
                  </div>
                  <div className="job-seeker-details">
                    <p className="job-span">
                      <PhoneIcon fontSize="small" /> {job.companyContact}
                    </p>
                    <p className="job-span">
                      <MailIcon fontSize="small" />
                      {job.companyEmail}
                    </p>
                  </div>
                  <div className="job-seeker-details">
                    <p className="job-span">
                      <ApartmentIcon fontSize="small" />
                      {job.companyIndustry}
                    </p>
                    <p className="job-span">
                      <LocationOnIcon fontSize="small" />
                      {job.companyAddress}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2>No Job Found!</h2>
          )}
          {/* <div className="job-seeker-card">
            <div className="job-seeker-header">
              <div>
                <h4>Portal Management officer</h4>
                <h5>Company Name</h5>
              </div>
              <div>
                <button>Apply Now</button>
              </div>
            </div>

            <div className="job-seeker-info">
              <div className="job-seeker-details">
                <p className="job-span">
                  <WorkOutlineIcon /> 3-5 Yrs
                </p>
                <p className="job-span">
                  <CurrencyRupeeIcon />
                  10,000
                </p>
                <p className="job-span">
                  <LocationOnIcon />{" "}
                  <span className="jobLocation">Job Location: </span>
                  Ahmedabad, Gujarat
                </p>
                <p className="job-span">Opening</p>
              </div>
              <div className="job-seeker-descriptions">
                <p className="job-span">
                  <DescriptionIcon />
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti aspernatur rerum culpa optio accusamus vero eum
                  quidem! Nulla, harum alias? Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Corrupti aspernatur rerum culpa
                  optio accusamus vero eum quidem! Nulla, harum alias? Lorem,
                  ipsum dolor sit amet consectetur adipisicing elit. Corrupti
                  aspernatur rerum
                </p>
              </div>
              <div className="job-seeker-details">
                <p className="job-span">
                  <PhoneIcon fontSize="small" /> 9876543210
                </p>
                <p className="job-span">
                  <MailIcon fontSize="small" />
                  abc@gmail.com
                </p>
              </div>
              <div className="job-seeker-details">
                <p className="job-span">
                  <ApartmentIcon fontSize="small" /> slfkujb diukj eiukj eiu
                  kjidu kjm
                </p>
                <p className="job-span">
                  <LocationOnIcon fontSize="small" />
                  1218-20 ,12th Floor ,Summit Business Bay, Opp PVR Cinema, Near
                  Western Express Highway-Metro Station, Andheri.
                </p>
              </div>
            </div>
          </div> */}
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
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default JobSeeker;
