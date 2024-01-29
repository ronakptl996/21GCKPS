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
import dayjs from "dayjs";

const Profile = () => {
  const [profile, setProfile] = useState();

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

  const { id } = useParams();
  const navigate = useNavigate();

  // Sondetails
  const handleSonDetailChange = (index, field, value) => {
    setSonDetails((prevSonDetails) => {
      const newSonDetails = [...prevSonDetails];
      newSonDetails[index][field] = value;
      return newSonDetails;
    });
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/profile/${id}`);
      const data = await response.json();
      if (data.success) {
        // setProfile(data.data);
        const { daughterDetails, headOfFamily, sonDetails, wifeDetails } =
          data.data;

        setHeadOfFamily({
          surname: headOfFamily.surname,
          firstname: headOfFamily.firstname,
          secondname: headOfFamily.secondname,
          email: headOfFamily.email,
          proffession: headOfFamily.proffession,
          contact: headOfFamily.contact,
          education: headOfFamily.education,
          bloodGroup: headOfFamily.bloodGroup,
          dob: headOfFamily.dob,
          address: headOfFamily.address,
          headOfFamilyAvatar: headOfFamily.headOfFamilyAvatar,
        });

        setWifeDetails({
          surname: wifeDetails.surname,
          firstname: wifeDetails.firstname,
          secondname: wifeDetails.secondname,
          proffession: wifeDetails.proffession,
          contact: wifeDetails.contact,
          education: wifeDetails.education,
          bloodGroup: wifeDetails.bloodGroup,
          dob: wifeDetails.dob,
          wifeAvatar: wifeDetails.wifeAvatar,
        });

        setSonDetails(sonDetails);
      }
    } catch (error) {
      console.log(error);
      toast.error("User details not found!");
      navigate("/home");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <section className="profile">
      <div className="profile-inner">
        <div className="family-details">
          <h3>Head Of Family</h3>
          {headOfFamily && (
            <div className="headOfFamily-wrapper">
              <div className="headOfFamily-avatar changeAvatar">
                {headOfFamily.headOfFamilyAvatar && (
                  <img
                    src={headOfFamily.headOfFamilyAvatar}
                    alt={headOfFamily.firstname}
                  />
                )}
                <button>Change Image</button>
              </div>
              <div>
                <div className="headOfFamily-input-wrapper">
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
                <div className="headOfFamily-input-wrapper">
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
                    label="Profession"
                    type="text"
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
                    label="Contact"
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
                <div className="headOfFamily-input-wrapper">
                  <TextField
                    id="outlined-basic"
                    label="Education"
                    type="text"
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
                      value={dayjs(headOfFamily.dob)} // Set the value prop to the 'dob' property in your state
                      // onChange={handleDateChange} // Pass the handleDateChange function
                      onChange={(date) => {
                        setHeadOfFamily((prevState) => ({
                          ...prevState,
                          dob: new Date(date),
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          )}
        </div>

        {wifeDetails && (
          <div className="family-details">
            <h3>Wife Details</h3>
            <div className="headOfFamily-wrapper">
              <div className="headOfFamily-avatar changeAvatar">
                <img src={wifeDetails.wifeAvatar} alt={wifeDetails.firstname} />
                <button>Change Image</button>
              </div>
              <div>
                <div className="headOfFamily-input-wrapper">
                  <TextField
                    id="outlined-basic"
                    label="Surname"
                    variant="outlined"
                    value={wifeDetails.surname}
                    onChange={(e) =>
                      wifeDetails((prevState) => ({
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
                      wifeDetails((prevState) => ({
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
                      wifeDetails((prevState) => ({
                        ...prevState,
                        secondname: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="headOfFamily-input-wrapper">
                  <TextField
                    id="outlined-basic"
                    label="Profession"
                    type="text"
                    variant="outlined"
                    value={wifeDetails.proffession}
                    onChange={(e) =>
                      wifeDetails((prevState) => ({
                        ...prevState,
                        proffession: e.target.value,
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
                      wifeDetails((prevState) => ({
                        ...prevState,
                        education: e.target.value,
                      }))
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    label="Contact"
                    type="number"
                    variant="outlined"
                    value={wifeDetails.contact}
                    onChange={(e) =>
                      wifeDetails((prevState) => ({
                        ...prevState,
                        contact: e.target.value,
                      }))
                    }
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
                      value={wifeDetails.bloodGroup}
                      onChange={(e) =>
                        setWifeDetails((prevState) => ({
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
                      value={dayjs(wifeDetails.dob)} // Set the value prop to the 'dob' property in your state
                      onChange={(date) => {
                        setWifeDetails((prevState) => ({
                          ...prevState,
                          dob: new Date(date),
                        }));
                      }}
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
        )}

        {sonDetails && (
          <div className="family-details">
            {sonDetails.map((son, index) => (
              <div key={son?._id}>
                <h3>Son Details</h3>
                <div className="headOfFamily-wrapper">
                  <div className="headOfFamily-avatar changeAvatar">
                    <img src={son.sonAvatar} alt={son.firstname} />
                    <button>Change Image</button>
                  </div>
                  <div>
                    <div className="headOfFamily-input-wrapper">
                      <TextField
                        id="outlined-basic"
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
                        id="outlined-basic"
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
                        id="outlined-basic"
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
                    <div className="headOfFamily-input-wrapper">
                      <TextField
                        id="outlined-basic"
                        label="Profession"
                        type="text"
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
                        id="outlined-basic"
                        label="Contact"
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
                    </div>
                    <div className="headOfFamily-input-wrapper">
                      <TextField
                        id="outlined-basic"
                        label="Education"
                        type="text"
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
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">
                          Blood Group
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={son.bloodGroup}
                          onChange={(e) =>
                            handleSonDetailChange(
                              index,
                              "bloodGroup",
                              e.target.value
                            )
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
                          value={dayjs(son.dob)} // Set the value prop to the 'dob' property in your state
                          onChange={(date) =>
                            handleSonDetailChange(index, "dob", new Date(date))
                          } // Pass the handleDateChange function
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
        </div>
      </div>
    </section>
  );
};

export default Profile;
