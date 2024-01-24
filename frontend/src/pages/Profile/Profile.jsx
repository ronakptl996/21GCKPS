import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Profile = () => {
  const [profile, setProfile] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/profile/${id}`);
      const data = await response.json();
      if (data.success) {
        setProfile(data.data);
      }
    } catch (error) {
      toast.error("Error, while fetching User Details");
      navigate("/home");
    }
  };

  useEffect(() => {
    // fetchProfile();
  }, []);
  return (
    <section className="profile">
      <div className="profile-inner">
        <div className="family-details">
          <h3>Head Of Family</h3>
          <div className="headOfFamily-wrapper">
            <div className="headOfFamily-avatar changeAvatar">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/father-son-quotes-1619064384.jpg"
                alt=""
              />
              <button>Change Image</button>
            </div>
            <div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Profession"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  type="number"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Education"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"o+"}
                    // onChange={(e) =>
                    //   setHeadOfFamily((prevState) => ({
                    //     ...prevState,
                    //     bloodGroup: e.target.value,
                    //   }))
                    // }
                    label="Blood Group"
                  >
                    <MenuItem value="o+">O+</MenuItem>
                    <MenuItem value="o-">O-</MenuItem>
                    <MenuItem value="a+">A+</MenuItem>
                    <MenuItem value="a-">A-</MenuItem>
                    <MenuItem value="b+">B+</MenuItem>
                    <MenuItem value="b-">B-</MenuItem>
                    <MenuItem value="ab+">AB+</MenuItem>
                    <MenuItem value="ab-">AB-</MenuItem>
                    <MenuItem value="ab">AB</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker label="Choose your DOB" /> */}
                  <DatePicker
                    label="Choose your DOB"
                    // value={headOfFamily.dob} // Set the value prop to the 'dob' property in your state
                    // onChange={handleDateChange} // Pass the handleDateChange function
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>

        <div className="family-details">
          <h3>Wife Details</h3>
          <div className="headOfFamily-wrapper">
            <div className="headOfFamily-avatar changeAvatar">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/father-son-quotes-1619064384.jpg"
                alt=""
              />
              <button>Change Image</button>
            </div>
            <div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Profession"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  type="number"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Education"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"o+"}
                    // onChange={(e) =>
                    //   setHeadOfFamily((prevState) => ({
                    //     ...prevState,
                    //     bloodGroup: e.target.value,
                    //   }))
                    // }
                    label="Blood Group"
                  >
                    <MenuItem value="o+">O+</MenuItem>
                    <MenuItem value="o-">O-</MenuItem>
                    <MenuItem value="a+">A+</MenuItem>
                    <MenuItem value="a-">A-</MenuItem>
                    <MenuItem value="b+">B+</MenuItem>
                    <MenuItem value="b-">B-</MenuItem>
                    <MenuItem value="ab+">AB+</MenuItem>
                    <MenuItem value="ab-">AB-</MenuItem>
                    <MenuItem value="ab">AB</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker label="Choose your DOB" /> */}
                  <DatePicker
                    label="Choose your DOB"
                    // value={headOfFamily.dob} // Set the value prop to the 'dob' property in your state
                    // onChange={handleDateChange} // Pass the handleDateChange function
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>

        <div className="family-details">
          <h3>Son Details</h3>
          <div className="headOfFamily-wrapper">
            <div className="headOfFamily-avatar changeAvatar">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/father-son-quotes-1619064384.jpg"
                alt=""
              />
              <button>Change Image</button>
            </div>
            <div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Profession"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  type="number"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Education"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"o+"}
                    // onChange={(e) =>
                    //   setHeadOfFamily((prevState) => ({
                    //     ...prevState,
                    //     bloodGroup: e.target.value,
                    //   }))
                    // }
                    label="Blood Group"
                  >
                    <MenuItem value="o+">O+</MenuItem>
                    <MenuItem value="o-">O-</MenuItem>
                    <MenuItem value="a+">A+</MenuItem>
                    <MenuItem value="a-">A-</MenuItem>
                    <MenuItem value="b+">B+</MenuItem>
                    <MenuItem value="b-">B-</MenuItem>
                    <MenuItem value="ab+">AB+</MenuItem>
                    <MenuItem value="ab-">AB-</MenuItem>
                    <MenuItem value="ab">AB</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker label="Choose your DOB" /> */}
                  <DatePicker
                    label="Choose your DOB"
                    // value={headOfFamily.dob} // Set the value prop to the 'dob' property in your state
                    // onChange={handleDateChange} // Pass the handleDateChange function
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <h3>Son Details</h3>
          <div className="headOfFamily-wrapper">
            <div className="headOfFamily-avatar changeAvatar">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/father-son-quotes-1619064384.jpg"
                alt=""
              />
              <button>Change Image</button>
            </div>
            <div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Profession"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  type="number"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Education"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"o+"}
                    // onChange={(e) =>
                    //   setHeadOfFamily((prevState) => ({
                    //     ...prevState,
                    //     bloodGroup: e.target.value,
                    //   }))
                    // }
                    label="Blood Group"
                  >
                    <MenuItem value="o+">O+</MenuItem>
                    <MenuItem value="o-">O-</MenuItem>
                    <MenuItem value="a+">A+</MenuItem>
                    <MenuItem value="a-">A-</MenuItem>
                    <MenuItem value="b+">B+</MenuItem>
                    <MenuItem value="b-">B-</MenuItem>
                    <MenuItem value="ab+">AB+</MenuItem>
                    <MenuItem value="ab-">AB-</MenuItem>
                    <MenuItem value="ab">AB</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker label="Choose your DOB" /> */}
                  <DatePicker
                    label="Choose your DOB"
                    // value={headOfFamily.dob} // Set the value prop to the 'dob' property in your state
                    // onChange={handleDateChange} // Pass the handleDateChange function
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>

        <div className="family-details">
          <h3>Daughter Details</h3>
          <div className="headOfFamily-wrapper">
            <div className="headOfFamily-avatar changeAvatar">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/father-son-quotes-1619064384.jpg"
                alt=""
              />
              <button>Change Image</button>
            </div>
            <div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Profession"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  type="number"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Education"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"o+"}
                    // onChange={(e) =>
                    //   setHeadOfFamily((prevState) => ({
                    //     ...prevState,
                    //     bloodGroup: e.target.value,
                    //   }))
                    // }
                    label="Blood Group"
                  >
                    <MenuItem value="o+">O+</MenuItem>
                    <MenuItem value="o-">O-</MenuItem>
                    <MenuItem value="a+">A+</MenuItem>
                    <MenuItem value="a-">A-</MenuItem>
                    <MenuItem value="b+">B+</MenuItem>
                    <MenuItem value="b-">B-</MenuItem>
                    <MenuItem value="ab+">AB+</MenuItem>
                    <MenuItem value="ab-">AB-</MenuItem>
                    <MenuItem value="ab">AB</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker label="Choose your DOB" /> */}
                  <DatePicker
                    label="Choose your DOB"
                    // value={headOfFamily.dob} // Set the value prop to the 'dob' property in your state
                    // onChange={handleDateChange} // Pass the handleDateChange function
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <h3>Daughter Details</h3>
          <div className="headOfFamily-wrapper">
            <div className="headOfFamily-avatar changeAvatar">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/father-son-quotes-1619064384.jpg"
                alt=""
              />
              <button>Change Image</button>
            </div>
            <div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Profession"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  type="number"
                  variant="outlined"
                  // value={headOfFamily.firstname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     firstname: e.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Education"
                  type="text"
                  variant="outlined"
                  // value={headOfFamily.surname}
                  // onChange={(e) =>
                  //   setHeadOfFamily((prevState) => ({
                  //     ...prevState,
                  //     surname: e.target.value,
                  //   }))
                  // }
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"o+"}
                    // onChange={(e) =>
                    //   setHeadOfFamily((prevState) => ({
                    //     ...prevState,
                    //     bloodGroup: e.target.value,
                    //   }))
                    // }
                    label="Blood Group"
                  >
                    <MenuItem value="o+">O+</MenuItem>
                    <MenuItem value="o-">O-</MenuItem>
                    <MenuItem value="a+">A+</MenuItem>
                    <MenuItem value="a-">A-</MenuItem>
                    <MenuItem value="b+">B+</MenuItem>
                    <MenuItem value="b-">B-</MenuItem>
                    <MenuItem value="ab+">AB+</MenuItem>
                    <MenuItem value="ab-">AB-</MenuItem>
                    <MenuItem value="ab">AB</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker label="Choose your DOB" /> */}
                  <DatePicker
                    label="Choose your DOB"
                    // value={headOfFamily.dob} // Set the value prop to the 'dob' property in your state
                    // onChange={handleDateChange} // Pass the handleDateChange function
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
