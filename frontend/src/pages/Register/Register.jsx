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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import { handleImageFileValidation } from "../../helper/global";

const Register = () => {
  const navigate = useNavigate();
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
    headOfFamilyAvatar: "",
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
    wifeAvatar: "",
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
      sonAvatar: "",
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
      daughterAvatar: "",
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
        sonAvatar: "",
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
        daughterAvatar: "",
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
      if (
        !headOfFamily.surname ||
        !headOfFamily.firstname ||
        !headOfFamily.secondname ||
        !headOfFamily.email ||
        !headOfFamily.proffession ||
        !headOfFamily.contact
      ) {
        toast.error("Head of family details required!");
        return;
      }
      if (!headOfFamily.headOfFamilyAvatar) {
        toast.error("Head of family image required!");
        return;
      }
      if (!password) {
        toast.error("Please Enter Password!");
        return;
      }
      // Use FormData to append all avatars
      const formData = new FormData();

      // Append headOfFamily avatar
      formData.append("headOfFamilyAvatar", headOfFamily.headOfFamilyAvatar);

      // Append wifeDetails avatar
      formData.append("wifeAvatar", wifeDetails.wifeAvatar);

      // Append sonDetails avatars
      sonDetails.forEach((details, index) => {
        if (
          details &&
          details.firstname &&
          details.secondname &&
          details.surname
        ) {
          formData.append(`sonAvatars[${index}]`, details.sonAvatar);
        }
      });

      // Append daughterDetails avatars
      daughterDetails.forEach((details, index) => {
        if (
          details &&
          details.firstname &&
          details.secondname &&
          details.surname
        ) {
          formData.append(`daughterAvatars[${index}]`, details.daughterAvatar);
        }
      });

      formData.append(`password`, password);
      // Append other non-avatar data
      Object.entries(headOfFamily).forEach(([key, value]) => {
        if (key !== "headOfFamilyAvatar" && value) {
          formData.append(`headOfFamily[${key}]`, value);
        }
      });

      Object.entries(wifeDetails).forEach(([key, value]) => {
        if (key !== "wifeAvatar" && value) {
          formData.append(`wifeDetails[${key}]`, value);
        }
      });

      sonDetails.forEach((details, index) => {
        Object.entries(details).forEach(([key, value]) => {
          if (key !== "sonAvatar" && value) {
            formData.append(`sonDetails[${index}][${key}]`, value);
          }
        });
      });

      daughterDetails.forEach((details, index) => {
        Object.entries(details).forEach(([key, value]) => {
          if (key !== "daughterAvatar" && value) {
            formData.append(`daughterDetails[${index}][${key}]`, value);
          }
        });
      });

      const response = await fetch(`/api/users/register`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (data.statusCode == 401) {
        toast.error(data.message);
        return;
      }
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!");
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
                label="Lastname"
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
                  disableFuture
                  format="DD/MM/YYYY"
                  value={headOfFamily.dob} // Set the value prop to the 'dob' property in your state
                  onChange={handleDateChange} // Pass the handleDateChange function
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="register-input-wrapper">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Village Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="village"
                  label="Village Name"
                  value={headOfFamily.address}
                  onChange={(e) =>
                    setHeadOfFamily((prevState) => ({
                      ...prevState,
                      address: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="Choose Village" disabled>
                    Choose Village
                  </MenuItem>
                  <MenuItem value="moraj">Moraj</MenuItem>
                  <MenuItem value="jinaj">Jinaj</MenuItem>
                  <MenuItem value="rangpur">Rangpur</MenuItem>
                  <MenuItem value="undel">Undel</MenuItem>
                  <MenuItem value="piploi">Piploi</MenuItem>
                  <MenuItem value="malu">Malu</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Create Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="avatar-wrapper donation-image-wrapper">
                <Button variant="contained" component="label">
                  <CloudUploadIcon style={{ marginRight: "1px" }} /> Upload
                  Photo
                  <input
                    type="file"
                    hidden
                    name="headOfFamilyAvatar"
                    onChange={(e) =>
                      handleImageFileValidation(e, (file) =>
                        setHeadOfFamily({
                          ...headOfFamily,
                          headOfFamilyAvatar: file,
                        })
                      )
                    }
                    // onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </Button>
                {headOfFamily.headOfFamilyAvatar && (
                  <div
                    className="donation-image"
                    onClick={() =>
                      setHeadOfFamily((prevState) => ({
                        ...prevState,
                        headOfFamilyAvatar: "",
                      }))
                    }
                  >
                    <img
                      alt="donation image"
                      src={URL.createObjectURL(headOfFamily.headOfFamilyAvatar)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Wife Details */}
          <div className="job-details">
            <label>Wife Details*</label>
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
                label="Lastname"
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
                  disableFuture
                  format="DD/MM/YYYY"
                  value={wifeDetails.dob}
                  onChange={(date) => {
                    setWifeDetails((prevState) => ({
                      ...prevState,
                      dob: new Date(date),
                    }));
                  }}
                />
              </LocalizationProvider>
              <div className="avatar-wrapper donation-image-wrapper">
                <Button variant="contained" component="label">
                  <CloudUploadIcon style={{ marginRight: "1px" }} /> Upload
                  Photo
                  <input
                    type="file"
                    hidden
                    name="wifeAvatar"
                    onChange={(e) =>
                      handleImageFileValidation(e, (file) =>
                        setWifeDetails({ ...wifeDetails, wifeAvatar: file })
                      )
                    }
                  />
                </Button>
                {wifeDetails.wifeAvatar && (
                  <div
                    className="donation-image"
                    onClick={() =>
                      setWifeDetails((prevState) => ({
                        ...prevState,
                        wifeAvatar: "",
                      }))
                    }
                  >
                    <img
                      alt="donation image"
                      src={URL.createObjectURL(wifeDetails.wifeAvatar)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Son / Daughter Details */}
          <div className="job-details">
            <label>Son / Daughter Details</label>
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
                            size="small"
                            onClick={() => deleteSonDetailHandler(index)}
                            variant="outlined"
                            color="error"
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
                          label="Lastname"
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
                            disableFuture
                            format="DD/MM/YYYY"
                            onChange={(date) =>
                              handleSonDetailChange(
                                index,
                                "dob",
                                new Date(date)
                              )
                            }
                          />
                        </LocalizationProvider>
                        <div className="avatar-wrapper donation-image-wrapper">
                          <Button variant="contained" component="label">
                            <CloudUploadIcon style={{ marginRight: "1px" }} />{" "}
                            Upload Photo
                            <input
                              type="file"
                              hidden
                              name="sonAvatar"
                              onChange={(e) =>
                                handleImageFileValidation(e, (file) =>
                                  handleSonDetailChange(
                                    index,
                                    "sonAvatar",
                                    file
                                  )
                                )
                              }
                            />
                          </Button>
                          {sonDetails[index].sonAvatar && (
                            <div
                              className="donation-image"
                              onClick={() =>
                                handleSonDetailChange(index, "sonAvatar", "")
                              }
                            >
                              <img
                                alt="donation image"
                                src={URL.createObjectURL(
                                  sonDetails[index].sonAvatar
                                )}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="add-son-details-wrapper">
                <Button
                  onClick={addSonDetailHandler}
                  variant="outlined"
                  size="small"
                >
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
                            size="small"
                            onClick={() => deleteDaughterDetailHandler(index)}
                            variant="outlined"
                            color="error"
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
                          label="Lastname"
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
                            disableFuture
                            format="DD/MM/YYYY"
                            onChange={(date) =>
                              handleDaughterDetailChange(
                                index,
                                "dob",
                                new Date(date)
                              )
                            }
                          />
                        </LocalizationProvider>
                        <div className="avatar-wrapper donation-image-wrapper">
                          <Button variant="contained" component="label">
                            <CloudUploadIcon style={{ marginRight: "1px" }} />{" "}
                            Upload Photo
                            <input
                              type="file"
                              hidden
                              name="daughterAvatar"
                              onChange={(e) =>
                                handleImageFileValidation(e, (file) =>
                                  handleDaughterDetailChange(
                                    index,
                                    "daughterAvatar",
                                    file
                                  )
                                )
                              }
                            />
                          </Button>
                          {daughterDetails[index].daughterAvatar && (
                            <div
                              className="donation-image"
                              onClick={() =>
                                handleDaughterDetailChange(
                                  index,
                                  "daughterAvatar",
                                  ""
                                )
                              }
                            >
                              <img
                                alt="donation image"
                                src={URL.createObjectURL(
                                  daughterDetails[index].daughterAvatar
                                )}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="add-son-details-wrapper">
                <Button
                  onClick={addDaughterDetailHandler}
                  variant="outlined"
                  size="small"
                >
                  + Add Daughter Details
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
