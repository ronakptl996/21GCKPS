import React from "react";
import { useParams } from "react-router-dom";
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
import dayjs from "dayjs";

const FamilyProfile = () => {
  const { villageName } = useParams();

  return (
    <section className="profile">
      <div className="profile-inner">
        <div className="family-details">
          <h3>Head Of Family</h3>
          {/* {headOfFamily && ( */}
          <div className="headOfFamily-wrapper">
            <div className="headOfFamily-avatar changeAvatar">
              {/* {headOfFamily.headOfFamilyAvatar && ( */}
              <img
                src=""
                // alt={headOfFamily.firstname}
              />
              {/* )} */}
              <button>Change Image</button>
            </div>
            <div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  //   value={headOfFamily.surname}
                  //   onChange={(e) =>
                  //     setHeadOfFamily((prevState) => ({
                  //       ...prevState,
                  //       surname: e.target.value,
                  //     }))
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  //   value={headOfFamily.firstname}
                  //   onChange={(e) =>
                  //     setHeadOfFamily((prevState) => ({
                  //       ...prevState,
                  //       firstname: e.target.value,
                  //     }))
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  //   value={headOfFamily.secondname}
                  //   onChange={(e) =>
                  //     setHeadOfFamily((prevState) => ({
                  //       ...prevState,
                  //       secondname: e.target.value,
                  //     }))
                  //   }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  //   value={headOfFamily.email}
                  //   onChange={(e) =>
                  //     setHeadOfFamily((prevState) => ({
                  //       ...prevState,
                  //       email: e.target.value,
                  //     }))
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Profession"
                  type="text"
                  variant="outlined"
                  //   value={headOfFamily.proffession}
                  //   onChange={(e) =>
                  //     setHeadOfFamily((prevState) => ({
                  //       ...prevState,
                  //       proffession: e.target.value,
                  //     }))
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  type="number"
                  variant="outlined"
                  //   value={headOfFamily.contact}
                  //   onChange={(e) =>
                  //     setHeadOfFamily((prevState) => ({
                  //       ...prevState,
                  //       contact: e.target.value,
                  //     }))
                  //   }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Education"
                  type="text"
                  variant="outlined"
                  //   value={headOfFamily.education}
                  //   onChange={(e) =>
                  //     setHeadOfFamily((prevState) => ({
                  //       ...prevState,
                  //       education: e.target.value,
                  //     }))
                  //   }
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={headOfFamily.bloodGroup}
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
                    // value={dayjs(headOfFamily.dob)} // Set the value prop to the 'dob' property in your state
                    // onChange={handleDateChange} // Pass the handleDateChange function
                    // onChange={(date) => {
                    //   setHeadOfFamily((prevState) => ({
                    //     ...prevState,
                    //     dob: new Date(date),
                    //   }));
                    // }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>

        {/* {wifeDetails && ( */}
        <div className="family-details">
          <h3>Wife Details</h3>
          <div className="headOfFamily-wrapper">
            <div className="headOfFamily-avatar changeAvatar">
              <img src="" />
              <button>Change Image</button>
            </div>
            <div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  //   value={wifeDetails.surname}
                  //   onChange={(e) =>
                  //     setWifeDetails((prevState) => ({
                  //       ...prevState,
                  //       surname: e.target.value,
                  //     }))
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  //   value={wifeDetails.firstname}
                  //   onChange={(e) =>
                  //     setWifeDetails((prevState) => ({
                  //       ...prevState,
                  //       firstname: e.target.value,
                  //     }))
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  //   value={wifeDetails.secondname}
                  //   onChange={(e) =>
                  //     setWifeDetails((prevState) => ({
                  //       ...prevState,
                  //       secondname: e.target.value,
                  //     }))
                  //   }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Profession"
                  type="text"
                  variant="outlined"
                  //   value={wifeDetails.proffession}
                  //   onChange={(e) =>
                  //     setWifeDetails((prevState) => ({
                  //       ...prevState,
                  //       proffession: e.target.value,
                  //     }))
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Education"
                  type="text"
                  variant="outlined"
                  //   value={wifeDetails.education}
                  //   onChange={(e) =>
                  //     setWifeDetails((prevState) => ({
                  //       ...prevState,
                  //       education: e.target.value,
                  //     }))
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  type="number"
                  variant="outlined"
                  //   value={wifeDetails.contact}
                  //   onChange={(e) =>
                  //     setWifeDetails((prevState) => ({
                  //       ...prevState,
                  //       contact: e.target.value,
                  //     }))
                  //   }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={wifeDetails.bloodGroup}
                    // onChange={(e) =>
                    //   setWifeDetails((prevState) => ({
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
                    // value={dayjs(wifeDetails.dob)} // Set the value prop to the 'dob' property in your state
                    // onChange={(date) => {
                    //   setWifeDetails((prevState) => ({
                    //     ...prevState,
                    //     dob: new Date(date),
                    //   }));
                    // }}
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
        {/* )} */}

        <div className="family-details">
          <h3>Son Details</h3>
          {/* {sonDetails &&
            sonDetails.map((son, index) => ( */}
          <div className="headOfFamily-wrapper" key="{son.firstname}">
            <div className="headOfFamily-avatar changeAvatar">
              <img src="" alt="" />
              <button>Change Image</button>
            </div>
            <div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  //   value={son.surname}
                  //   onChange={(e) =>
                  //     handleSonDetailChange(index, "surname", e.target.value)
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  //   value={son.firstname}
                  //   onChange={(e) =>
                  //     handleSonDetailChange(index, "firstname", e.target.value)
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  //   value={son.secondname}
                  //   onChange={(e) =>
                  //     handleSonDetailChange(index, "secondname", e.target.value)
                  //   }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Profession"
                  type="text"
                  variant="outlined"
                  //   value={son.proffession}
                  //   onChange={(e) =>
                  //     handleSonDetailChange(index, "proffession", e.target.value)
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  type="number"
                  variant="outlined"
                  //   value={son.contact}
                  //   onChange={(e) =>
                  //     handleSonDetailChange(index, "contact", e.target.value)
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Education"
                  type="text"
                  variant="outlined"
                  //   value={son.education}
                  //   onChange={(e) =>
                  //     handleSonDetailChange(index, "education", e.target.value)
                  //   }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={son.bloodGroup}
                    // onChange={(e) =>
                    //   handleSonDetailChange(index, "bloodGroup", e.target.value)
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
                    // value={dayjs(son.dob)} // Set the value prop to the 'dob' property in your state
                    // onChange={(date) =>
                    //   handleSonDetailChange(index, "dob", new Date(date))
                    // } // Pass the handleDateChange function
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>

        <div className="family-details">
          <h3>Daughter Details</h3>
          {/* {daughterDetails &&
            daughterDetails.map((daughter, index) => ( */}
          <div className="headOfFamily-wrapper" key="{daughter.firstname}">
            <div className="headOfFamily-avatar changeAvatar">
              <img src="" alt="{daughter.firstname}" />
              <button>Change Image</button>
            </div>
            <div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  //   value={daughter.surname}
                  //   onChange={(e) =>
                  //     handleDaughterDetailChange(index, "surname", e.target.value)
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  //   value={daughter.firstname}
                  //   onChange={(e) =>
                  //     handleDaughterDetailChange(
                  //       index,
                  //       "firstname",
                  //       e.target.value
                  //     )
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  //   value={daughter.secondname}
                  //   onChange={(e) =>
                  //     handleDaughterDetailChange(
                  //       index,
                  //       "secondname",
                  //       e.target.value
                  //     )
                  //   }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Proffession"
                  type="text"
                  variant="outlined"
                  //   value={daughter.proffession}
                  //   onChange={(e) =>
                  //     handleDaughterDetailChange(
                  //       index,
                  //       "proffession",
                  //       e.target.value
                  //     )
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  type="number"
                  variant="outlined"
                  //   value={daughter.contact}
                  //   onChange={(e) =>
                  //     handleDaughterDetailChange(index, "contact", e.target.value)
                  //   }
                />
                <TextField
                  id="outlined-basic"
                  label="Education"
                  type="text"
                  variant="outlined"
                  //   value={daughter.education}
                  //   onChange={(e) =>
                  //     handleDaughterDetailChange(
                  //       index,
                  //       "education",
                  //       e.target.value
                  //     )
                  //   }
                />
              </div>
              <div className="headOfFamily-input-wrapper">
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={daughter.bloodGroup}
                    // onChange={(e) =>
                    //   handleDaughterDetailChange(
                    //     index,
                    //     "bloodGroup",
                    //     e.target.value
                    //   )
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
                    // value={dayjs(daughter.dob)} // Set the value prop to the 'dob' property in your state
                    // onChange={(date) =>
                    //   handleDaughterDetailChange(index, "dob", new Date(date))
                    // } // Pass the handleDateChange function
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
    </section>
  );
};

export default FamilyProfile;
