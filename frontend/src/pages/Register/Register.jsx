import React, { useState } from "react";
import "./index.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";

const Register = () => {
  // Head of family
  const [password, setPassword] = useState("");
  const [headOfFamily, setHeadOfFamily] = useState({
    surname: "",
    firstname: "",
    secondname: "",
    email: "",
    proffession: "",
    contact: "",
    education: "",
    bloodGroup: "o+",
    dob: "",
    address: "",
  });

  const [wifeDetails, setWifeDetails] = useState({
    surname: "",
    firstname: "",
    secondname: "",
    proffession: "",
    contact: "",
    education: "",
    bloodGroup: "o+",
    dob: "",
  });

  // Add Multiple Son Details
  const [sonDetails, setSonDetails] = useState([
    {
      surname: "",
      firstname: "",
      secondname: "",
      proffession: "",
      contact: "",
      education: "",
      bloodGroup: "o+",
      dob: "",
    },
  ]);

  const [daughterDetails, setDaughterDetails] = useState([
    {
      surname: "",
      firstname: "",
      secondname: "",
      proffession: "",
      contact: "",
      education: "",
      bloodGroup: "o+",
      dob: "",
    },
  ]);

  const handleSonDetailChange = (index, field, value) => {
    setSonDetails((prevSonDetails) => {
      const newSonDetails = [...prevSonDetails];
      newSonDetails[index][field] = value;
      return newSonDetails;
    });
  };

  const handleDaughterDetailChange = (index, field, value) => {
    setDaughterDetails((prevDaughterDetails) => {
      const newDaughterDetails = [...prevDaughterDetails];
      newDaughterDetails[index][field] = value;
      return newDaughterDetails;
    });
  };

  const addSonDetailHandler = () => {
    setSonDetails((prevSonDetails) => [
      ...prevSonDetails,
      {
        surname: "",
        firstname: "",
        secondname: "",
        proffession: "",
        contact: "",
        education: "",
        bloodGroup: "o+",
        dob: "",
      },
    ]);
  };

  const addDaughterDetailHandler = () => {
    setDaughterDetails((prevDaughterDetails) => [
      ...prevDaughterDetails,
      {
        surname: "",
        firstname: "",
        secondname: "",
        proffession: "",
        contact: "",
        education: "",
        bloodGroup: "o+",
        dob: "",
      },
    ]);
  };

  const deleteSonDetailHandler = (index) => {
    setSonDetails((prevSonDetails) => {
      const newSonDetails = [...prevSonDetails];
      newSonDetails.splice(index, 1);
      return newSonDetails;
    });
  };

  const deleteDaughterDetailHandler = (index) => {
    setDaughterDetails((prevDaughterDetails) => {
      const newDaughterDetails = [...prevDaughterDetails];
      newDaughterDetails.splice(index, 1);
      return newDaughterDetails;
    });
  };

  // DOB function to set value in useState
  const handleDateChange = (date) => {
    setHeadOfFamily((prevState) => ({
      ...prevState,
      dob: new Date(date),
    }));
  };

  // Register Data
  const handleSubmit = async () => {
    try {
      console.log(
        "headOfFamily",
        headOfFamily,
        "wifeDetails",
        wifeDetails,
        "sonDetails",
        sonDetails,
        "daughterDetails",
        daughterDetails
      );

      const registerData = {
        password,
        headOfFamily,
        wifeDetails,
        sonDetails,
        daughterDetails,
      };

      let response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      let data = await response.json();
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        <Navigate to="/login" replace />;
      }
    } catch (error) {
      console.log(`Error while register user!! ${error}`);
    }
  };

  return (
    <div className="register">
      <HeroSectionHeader
        heading="Create an account"
        paragraph="Please Provide your valid informations to register!"
      />
      <div className="register-form">
        <form>
          {/* Head of Family */}
          <div className="job-details">
            <label>Head of Family*</label>
            <div className="register-input-wrapper">
              <TextField
                id="outlined-basic"
                label="Surname"
                variant="outlined"
                value={headOfFamily.surname}
                onChange={(e) =>
                  setHeadOfFamily((prevState) => ({
                    ...prevState,
                    surname: e.target.value,
                  }))
                }
              />
              <TextField
                id="outlined-basic"
                label="Firstname"
                variant="outlined"
                value={headOfFamily.firstname}
                onChange={(e) =>
                  setHeadOfFamily((prevState) => ({
                    ...prevState,
                    firstname: e.target.value,
                  }))
                }
              />
              <TextField
                id="outlined-basic"
                label="Secondname"
                variant="outlined"
                value={headOfFamily.secondname}
                onChange={(e) =>
                  setHeadOfFamily((prevState) => ({
                    ...prevState,
                    secondname: e.target.value,
                  }))
                }
              />
            </div>
            <div className="register-input-wrapper">
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                value={headOfFamily.email}
                onChange={(e) =>
                  setHeadOfFamily((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
              <TextField
                id="outlined-basic"
                label="Proffession"
                variant="outlined"
                value={headOfFamily.proffession}
                onChange={(e) =>
                  setHeadOfFamily((prevState) => ({
                    ...prevState,
                    proffession: e.target.value,
                  }))
                }
              />
              <TextField
                id="outlined-basic"
                label="Contact No."
                type="number"
                variant="outlined"
                value={headOfFamily.contact}
                onChange={(e) =>
                  setHeadOfFamily((prevState) => ({
                    ...prevState,
                    contact: e.target.value,
                  }))
                }
              />
            </div>
            <div className="register-input-wrapper">
              <TextField
                id="outlined-basic"
                label="Education"
                variant="outlined"
                value={headOfFamily.education}
                onChange={(e) =>
                  setHeadOfFamily((prevState) => ({
                    ...prevState,
                    education: e.target.value,
                  }))
                }
              />
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Blood Group
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={headOfFamily.bloodGroup}
                  onChange={(e) =>
                    setHeadOfFamily((prevState) => ({
                      ...prevState,
                      bloodGroup: e.target.value,
                    }))
                  }
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
                  value={headOfFamily.dob} // Set the value prop to the 'dob' property in your state
                  onChange={handleDateChange} // Pass the handleDateChange function
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div>
              <TextField
                fullWidth
                label="Address"
                id="fullWidth"
                value={headOfFamily.address}
                onChange={(e) =>
                  setHeadOfFamily((prevState) => ({
                    ...prevState,
                    address: e.target.value,
                  }))
                }
              />
            </div>
            <div className="register-input-wrapper">
              <TextField
                id="outlined-basic"
                label="Create Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Wife Details */}
          <div className="job-details">
            <label>Wife Name*</label>
            <div className="register-input-wrapper">
              <TextField
                id="outlined-basic"
                label="Surname"
                variant="outlined"
                value={wifeDetails.surname}
                onChange={(e) =>
                  setWifeDetails((prevState) => ({
                    ...prevState,
                    surname: e.target.value,
                  }))
                }
              />
              <TextField
                id="outlined-basic"
                label="Firstname"
                variant="outlined"
                value={wifeDetails.firstname}
                onChange={(e) =>
                  setWifeDetails((prevState) => ({
                    ...prevState,
                    firstname: e.target.value,
                  }))
                }
              />
              <TextField
                id="outlined-basic"
                label="Secondname"
                variant="outlined"
                value={wifeDetails.secondname}
                onChange={(e) =>
                  setWifeDetails((prevState) => ({
                    ...prevState,
                    secondname: e.target.value,
                  }))
                }
              />
            </div>
            <div className="register-input-wrapper">
              <TextField
                id="outlined-basic"
                label="Proffession"
                variant="outlined"
                value={wifeDetails.proffession}
                onChange={(e) =>
                  setWifeDetails((prevState) => ({
                    ...prevState,
                    proffession: e.target.value,
                  }))
                }
              />
              <TextField
                id="outlined-basic"
                label="Contact No."
                type="number"
                variant="outlined"
                value={wifeDetails.contact}
                onChange={(e) =>
                  setWifeDetails((prevState) => ({
                    ...prevState,
                    contact: e.target.value,
                  }))
                }
              />
              <TextField
                id="outlined-basic"
                label="Education"
                type="text"
                variant="outlined"
                value={wifeDetails.education}
                onChange={(e) =>
                  setWifeDetails((prevState) => ({
                    ...prevState,
                    education: e.target.value,
                  }))
                }
              />
            </div>
            <div className="register-input-wrapper">
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Blood Group
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Blood Group"
                  value={wifeDetails.bloodGroup}
                  onChange={(e) =>
                    setWifeDetails((prevState) => ({
                      ...prevState,
                      bloodGroup: e.target.value,
                    }))
                  }
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
                <DatePicker
                  label="Choose your DOB"
                  value={wifeDetails.dob}
                  onChange={(date) => {
                    setWifeDetails((prevState) => ({
                      ...prevState,
                      dob: new Date(date),
                    }));
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>

          {/* Son / Daughter Details */}
          <div className="job-details">
            <label>Son / Daughter Details*</label>
            <div className="son-details-wrapper">
              {sonDetails.map((son, index) => {
                return (
                  <div className="son-daughter-details" key={index}>
                    <div className="son-daughter-wrapper">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <label>Son {index > 0 && index + 1}</label>
                        {index > 0 && (
                          <Button
                            onClick={() => deleteSonDetailHandler(index)}
                            variant="outlined"
                          >
                            Delete Son
                          </Button>
                        )}
                      </div>
                      <div className="register-input-wrapper">
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Surname"
                          variant="outlined"
                          value={son.surname}
                          onChange={(e) =>
                            handleSonDetailChange(
                              index,
                              "surname",
                              e.target.value
                            )
                          }
                        />
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Firstname"
                          variant="outlined"
                          value={son.firstname}
                          onChange={(e) =>
                            handleSonDetailChange(
                              index,
                              "firstname",
                              e.target.value
                            )
                          }
                        />
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Secondname"
                          variant="outlined"
                          value={son.secondname}
                          onChange={(e) =>
                            handleSonDetailChange(
                              index,
                              "secondname",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="register-input-wrapper">
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Proffession"
                          variant="outlined"
                          value={son.proffession}
                          onChange={(e) =>
                            handleSonDetailChange(
                              index,
                              "proffession",
                              e.target.value
                            )
                          }
                        />
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Contact No."
                          type="number"
                          variant="outlined"
                          value={son.contact}
                          onChange={(e) =>
                            handleSonDetailChange(
                              index,
                              "contact",
                              e.target.value
                            )
                          }
                        />
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Education"
                          variant="outlined"
                          value={son.education}
                          onChange={(e) =>
                            handleSonDetailChange(
                              index,
                              "education",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="register-input-wrapper">
                        <FormControl>
                          <InputLabel id={`demo-simple-select-label-${index}`}>
                            Blood Group
                          </InputLabel>
                          <Select
                            labelId={`demo-simple-select-label-${index}`}
                            id={`demo-simple-select-${index}`}
                            value={son.bloodGroup}
                            label="Blood Group"
                            onChange={(e) =>
                              handleSonDetailChange(
                                index,
                                "bloodGroup",
                                e.target.value
                              )
                            }
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
                          <DatePicker
                            label="Choose your DOB"
                            value={son.dob}
                            onChange={(date) =>
                              handleSonDetailChange(
                                index,
                                "dob",
                                new Date(date)
                              )
                            }
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="add-son-details-wrapper">
                <Button onClick={addSonDetailHandler} variant="outlined">
                  + Add Son Details
                </Button>
              </div>
            </div>

            <div className="son-details-wrapper">
              {daughterDetails.map((daughter, index) => {
                return (
                  <div className="son-daughter-details" key={index}>
                    <div className="son-daughter-wrapper">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <label>Daughter {index > 0 && index + 1}</label>
                        {index > 0 && (
                          <Button
                            onClick={() => deleteDaughterDetailHandler(index)}
                            variant="outlined"
                          >
                            Delete Daughter
                          </Button>
                        )}
                      </div>
                      <div className="register-input-wrapper">
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Surname"
                          variant="outlined"
                          value={daughter.surname}
                          onChange={(e) =>
                            handleDaughterDetailChange(
                              index,
                              "surname",
                              e.target.value
                            )
                          }
                        />
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Firstname"
                          variant="outlined"
                          value={daughter.firstname}
                          onChange={(e) =>
                            handleDaughterDetailChange(
                              index,
                              "firstname",
                              e.target.value
                            )
                          }
                        />
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Secondname"
                          variant="outlined"
                          value={daughter.secondname}
                          onChange={(e) =>
                            handleDaughterDetailChange(
                              index,
                              "secondname",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="register-input-wrapper">
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Proffession"
                          variant="outlined"
                          value={daughter.proffession}
                          onChange={(e) =>
                            handleDaughterDetailChange(
                              index,
                              "proffession",
                              e.target.value
                            )
                          }
                        />
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Contact No."
                          type="number"
                          variant="outlined"
                          value={daughter.contact}
                          onChange={(e) =>
                            handleDaughterDetailChange(
                              index,
                              "contact",
                              e.target.value
                            )
                          }
                        />
                        <TextField
                          id={`outlined-basic-${index}`}
                          label="Education"
                          variant="outlined"
                          value={daughter.education}
                          onChange={(e) =>
                            handleDaughterDetailChange(
                              index,
                              "education",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="register-input-wrapper">
                        <FormControl>
                          <InputLabel id={`demo-simple-select-label-${index}`}>
                            Blood Group
                          </InputLabel>
                          <Select
                            labelId={`demo-simple-select-label-${index}`}
                            id={`demo-simple-select-${index}`}
                            value={daughter.bloodGroup}
                            label="Blood Group"
                            onChange={(e) =>
                              handleDaughterDetailChange(
                                index,
                                "bloodGroup",
                                e.target.value
                              )
                            }
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
                          <DatePicker
                            label="Choose your DOB"
                            value={daughter.dob}
                            onChange={(date) =>
                              handleDaughterDetailChange(
                                index,
                                "dob",
                                new Date(date)
                              )
                            }
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="add-son-details-wrapper">
                <Button onClick={addDaughterDetailHandler} variant="outlined">
                  + Add Daughter
                </Button>
              </div>
            </div>
            <div>
              <Button
                onClick={handleSubmit}
                fullWidth
                style={{ background: "#a7732b", marginTop: "10px" }}
                variant="contained"
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
