import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import dayjs from "dayjs";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Profile = () => {
  const [profile, setProfile] = useState();
  const [addDetails, setAddDetails] = useState("");

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

  // Edit Modal useState
  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    surname: "",
    firstname: "",
    lastname: "",
    profession: "",
    contact: "",
    education: "",
    bloodGroup: "",
    dob: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Add Son Details
  const addSonDaughterDetailHandler = (detail) => {
    setAddDetails(detail);
    setOpen(true);
  };

  // Son Details
  const handleSonDetailChange = (index, field, value) => {
    setSonDetails((prevSonDetails) => {
      const newSonDetails = [...prevSonDetails];
      newSonDetails[index][field] = value;
      return newSonDetails;
    });
  };

  // Daughter details
  const handleDaughterDetailChange = (index, field, value) => {
    setDaughterDetails((prevDaughterDetails) => {
      const newDaughterDetails = [...prevDaughterDetails];
      newDaughterDetails[index][field] = value;
      return newDaughterDetails;
    });
  };

  // Delete Detials
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
        setDaughterDetails(daughterDetails);
      }
    } catch (error) {
      console.log(error);
      toast.error("User details not found!");
      navigate("/home");
    }
  };

  // Edit Profile
  const handleEditProfile = async () => {
    try {
      const response = await fetch(`/api/users/profile/update/${id}`, {
        method: "POST",
        body: JSON.stringify({
          headOfFamily,
          wifeDetails,
          sonDetails,
          daughterDetails,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <section className="profile">
      {/* Dialog Form */}
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Add {addDetails == "sonDetails" ? "Son" : "Daughter"} Details
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="surname"
            label="Surname"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.surname}
          />
          <TextField
            margin="dense"
            name="firstname"
            label="Firstname"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.firstname}
          />
          <TextField
            margin="dense"
            name="profession"
            label="Profession"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.profession}
          />
          <TextField
            margin="dense"
            name="contact"
            label="Contact"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.contact}
          />
          <TextField
            margin="dense"
            name="education"
            label="Education"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.education}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={dayjs(modalForm.dob)}
              onChange={(date) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  dob: new Date(date),
                }));
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

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
                <div className="headOfFamily-input-wrapper">
                  <TextField
                    id="outlined-basic"
                    label="Profession"
                    type="text"
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
                  <TextField
                    id="outlined-basic"
                    label="Contact"
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

        <div className="family-details profile-son-details">
          <h3>Son Details</h3>
          {sonDetails &&
            sonDetails.map((son, index) => (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label></label>
                  <Button
                    size="small"
                    onClick={() => deleteSonDetailHandler(index)}
                    variant="outlined"
                  >
                    Delete Son
                  </Button>
                </div>
                <div className="headOfFamily-wrapper" key={son.firstname}>
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
                    </div>
                    <div className="headOfFamily-input-wrapper">
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
              </>
            ))}
          <div className="prfoile-add-son-details-wrapper">
            <Button
              size="small"
              onClick={() => addSonDaughterDetailHandler("sonDetails")}
              variant="outlined"
            >
              + Add Son
            </Button>
          </div>
        </div>

        <div className="family-details profile-son-details">
          <h3>Daughter Details</h3>
          {daughterDetails &&
            daughterDetails.map((daughter, index) => (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label></label>
                  <Button
                    size="small"
                    onClick={() => deleteDaughterDetailHandler(index)}
                    variant="outlined"
                  >
                    Delete Daughter
                  </Button>
                </div>
                <div className="headOfFamily-wrapper" key={daughter.firstname}>
                  <div className="headOfFamily-avatar changeAvatar">
                    <img
                      src={daughter.daughterAvatar}
                      alt={daughter.firstname}
                    />
                    <button>Change Image</button>
                  </div>
                  <div>
                    <div className="headOfFamily-input-wrapper">
                      <TextField
                        id="outlined-basic"
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
                        id="outlined-basic"
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
                        id="outlined-basic"
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
                    <div className="headOfFamily-input-wrapper">
                      <TextField
                        id="outlined-basic"
                        label="Proffession"
                        type="text"
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
                        id="outlined-basic"
                        label="Contact"
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
                        id="outlined-basic"
                        label="Education"
                        type="text"
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
                    <div className="headOfFamily-input-wrapper">
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">
                          Blood Group
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={daughter.bloodGroup}
                          onChange={(e) =>
                            handleDaughterDetailChange(
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
                          value={dayjs(daughter.dob)} // Set the value prop to the 'dob' property in your state
                          onChange={(date) =>
                            handleDaughterDetailChange(
                              index,
                              "dob",
                              new Date(date)
                            )
                          } // Pass the handleDateChange function
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
              </>
            ))}
          <div className="prfoile-add-son-details-wrapper">
            <Button
              size="small"
              // onClick={addDaughterDetailHandler}
              variant="outlined"
            >
              + Add Daughter
            </Button>
          </div>
        </div>
        <Button variant="contained" onClick={handleEditProfile}>
          Edit Profile
        </Button>
      </div>
    </section>
  );
};

export default Profile;
