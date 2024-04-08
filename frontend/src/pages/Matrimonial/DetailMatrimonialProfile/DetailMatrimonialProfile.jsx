import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailMatrimonialProfile.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import dayjs from "dayjs";
import { WhatsApp, Instagram, FacebookOutlined } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CityImage from "../../../assets/images/Matrimonial/pro-city.png";
import AgeImage from "../../../assets/images/Matrimonial/pro-age.png";
import EducationImage from "../../../assets/images/Matrimonial/education.png";
import JobImage from "../../../assets/images/Matrimonial/job.png";
import {
  dobFormat,
  indiaTimeFormat,
  isMatrimonialProfile,
} from "../../../helper/global.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";

const DetailMatrimonialProfile = () => {
  const [user, setUser] = useState();

  // Edit Modal useState
  const [interestInputValue, setInterestInputValue] = useState("");
  const [hobbyInputValue, setHobbyInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    education: "",
    profession: "",
    gender: "",
    achievement: "",
    facebookUserName: "",
    instagramUserName: "",
    photo: "",
    contact: "",
    bloodGroup: "",
    maternalUncle: "",
    mamaVillageName: "",
    address: "",
    dob: "",
    interest: "",
    hobby: "",
    yourSelf: "",
    brotherSisterDetails: [],
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { loggedInUserDetails } = useSelector((store) => store.auth);

  // Modal
  const handleClickOpen = (data) => {
    console.log(data);
    setOpen(true);
    setModalForm({
      fullName: data.fullName,
      fatherName: data.fatherName,
      motherName: data.motherName,
      education: data.education,
      profession: data.profession,
      gender: data.gender,
      achievement: data.achievement,
      facebookUserName: data.facebookUserName,
      instagramUserName: data.instagramUserName,
      photo: data.photo,
      contact: data.contact,
      bloodGroup: data.bloodGroup,
      maternalUncle: data.maternalUncle,
      mamaVillageName: data.mamaVillageName,
      address: data.address,
      dob: data.dob,
      interest: data.interest,
      hobby: data.hobby,
      yourSelf: data.yourSelf,
      brotherSisterDetails: data.brotherSisterDetails,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProfile = async (id) => {
    try {
      const response = await fetch(`/api/matrimonial/${id}`);
      const data = await response.json();
      if (data && data.success) {
        setUser(data.data);
      } else {
        toast.error("User not found!");
        navigate("/matrimonial-profile");
      }
    } catch (error) {
      toast.error("User not found!");
      navigate("/matrimonial-profile");
    }
  };

  useEffect(() => {
    fetchProfile(id);
  }, [id]);

  return (
    <section className="DetailMatrimonialProfile">
      {/* Dialog Form */}
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit Matrimonial Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="fullName"
            label="Fullname"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.fullName}
          />
          <TextField
            margin="dense"
            name="fatherName"
            label="Father Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.fatherName}
          />
          <TextField
            margin="dense"
            name="motherName"
            label="Mother Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.motherName}
          />
          <div style={{ display: "flex" }}>
            <TextField
              margin="dense"
              sx={{ mr: "10px" }}
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
            <FormControl
              fullWidth
              margin="dense"
              sx={{ ml: "10px" }}
              variant="standard"
            >
              <InputLabel id="demo-simple-select-standard-label">
                Gender
              </InputLabel>
              <Select
                name="gender"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={modalForm.gender}
                onChange={(e) => {
                  setModalForm((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }));
                }}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ display: "flex" }}>
            <TextField
              margin="dense"
              sx={{ mr: "10px" }}
              name="achievement"
              label="Achievement"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.achievement}
            />
            <TextField
              margin="dense"
              name="facebookUserName"
              label="Facebook ID"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.facebookUserName}
            />
            <TextField
              margin="dense"
              name="instagramUserName"
              label="Instagram ID"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.instagramUserName}
            />
          </div>

          <div style={{ display: "flex" }}>
            <TextField
              margin="dense"
              sx={{ mr: "10px" }}
              name="contact"
              label="Contact"
              type="number"
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
              name="maternalUncle"
              label="Mama's Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.maternalUncle}
            />
            <TextField
              margin="dense"
              sx={{ ml: "10px" }}
              name="mamaVillageName"
              label="Mama's Village"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.mamaVillageName}
            />
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              margin="dense"
              sx={{ mr: "10px" }}
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.address}
            />
            <FormControl
              fullWidth
              margin="dense"
              sx={{ ml: "10px" }}
              variant="standard"
            >
              <InputLabel id="demo-simple-select-standard-label">
                Blood Group
              </InputLabel>
              <Select
                name="bloodGroup"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={modalForm.bloodGroup}
                onChange={(e) => {
                  setModalForm((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }));
                }}
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
          </div>
          <div
            style={{
              display: "grid",
              margin: "10px 0",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullWidth
                margin="dense"
                label="DOB"
                value={dayjs(modalForm.fromDate)}
                onChange={(date) => {
                  setModalForm((prevState) => ({
                    ...prevState,
                    dob: new Date(date),
                  }));
                }}
              />
            </LocalizationProvider>
            <TextField
              margin="dense"
              sx={{ ml: "10px" }}
              name="yourSelf"
              label="About you"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.yourSelf}
            />
          </div>
          <div className="register-input-wrapper">
            <div>
              <TextField
                label="Interest"
                value={interestInputValue}
                onChange={(e) => setInterestInputValue(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleInterestAddChip();
                  }
                }}
              />
              <Stack direction="row" spacing={1} mt={1}>
                {modalForm.interest &&
                  modalForm.interest.map((chip, index) => (
                    <Chip
                      key={index}
                      label={chip}
                      onDelete={() => handleInterestDeleteChip(chip)}
                      color="primary"
                    />
                  ))}
              </Stack>
            </div>
            <div>
              <TextField
                label="Hobby"
                value={hobbyInputValue}
                onChange={(e) => setHobbyInputValue(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleHobbyAddChip();
                  }
                }}
              />
              <Stack direction="row" spacing={1} mt={1}>
                {modalForm?.hobby &&
                  modalForm?.hobby?.map((chip, index) => (
                    <Chip
                      key={index}
                      label={chip}
                      onDelete={() => handleHobbyDeleteChip(chip)}
                      color="primary"
                    />
                  ))}
              </Stack>
            </div>
          </div>
          {/* <div className="avatar-wrapper modal-avatar-wrapper">
            <Button variant="outlined" component="label">
              Upload New Photo
              <input
                type="file"
                hidden
                name="donationImage"
                onChange={changeImageModal}
              />
            </Button>
            {modalForm.donationImage ? (
              <div className="modal-committee-image-wrapper">
                <img
                  alt={modalForm.name}
                  src={`${import.meta.env.VITE_BACKEND_URL}${
                    modalForm.donationImage
                  }`}
                />
              </div>
            ) : (
              <div className="modal-committee-image-wrapper">
                <ImageIcon />
              </div>
            )}
          </div> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained">Edit</Button>
        </DialogActions>
      </Dialog>
      {user && (
        <section className="DetailMatrimonialProfile-inner">
          <div className="DetailMatrimonialProfile-user-img-wrapper">
            <div className="user-profile-image">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL_MATRIMONIAL}${
                  user?.photo
                }`}
                alt={user?.fullName}
              />
            </div>
            <div className="social-btn">
              <div className="social-btn-wrapper facebook">
                <FacebookOutlined /> <span>Facebook</span>
              </div>
              <div className="social-btn-wrapper instagram">
                <Instagram /> <span>Instagram</span>
              </div>
              <div className="social-btn-wrapper whatsapp">
                <WhatsApp /> <span>WhatsApp</span>
              </div>
            </div>
          </div>
          <div className="DetailMatrimonialProfile-user-details">
            <div className="DetailMatrimonialProfile-user-details-inner">
              <div className="Matrimonial-user-details-header">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h1>{user?.fullName}</h1>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleClickOpen(user)}
                    style={{
                      display: isMatrimonialProfile(
                        loggedInUserDetails.matrimonialProfiles,
                        id
                      )
                        ? "block"
                        : "none",
                      marginRight: "20px",
                    }}
                  >
                    Edit Profile
                  </Button>
                </div>
                <ul>
                  <li>
                    <div>
                      <img src={CityImage} alt="city image" />
                      <span>
                        City: <strong>{user?.address}</strong>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <img src={AgeImage} alt="age image" />
                      <span>
                        Age: <strong>{dobFormat(user?.dob)}</strong>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <img src={EducationImage} alt="Education image" />
                      <span>
                        Education: <strong>{user?.education}</strong>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <img src={JobImage} alt="Job image" />
                      <span>
                        Job: <strong>{user?.profession}</strong>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="Matrimonial-user-details-about">
                <h3 className="heading-h3">About</h3>
                <p>{user?.yourSelf}</p>
              </div>

              {user && user?.brotherSisterDetails && (
                <div className="Matrimonial-user-details-brother-sister">
                  <h3 className="heading-h3">Brother / Sister Details</h3>
                  {user.brotherSisterDetails.map((detail) => (
                    <p key={detail.firstname}>
                      {detail.surname} {detail.firstname} {detail.secondname}
                    </p>
                  ))}
                </div>
              )}

              <div className="Matrimonial-user-contact-details">
                <h3 className="heading-h3">Contact Info</h3>
                <ul>
                  <li>
                    <span>
                      <LocalPhoneIcon />
                      <b>Phone:</b>
                      {user?.contact}
                    </span>
                  </li>
                  <li>
                    <span>
                      <Instagram />
                      <b>Instagram:</b>@{user?.instagramUserName}
                    </span>
                  </li>
                  <li>
                    <span>
                      <LocationOnIcon />
                      <b>Address:</b>
                      {user?.address}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="Matrimonial-user-personal-details">
                <h3 className="heading-h3">Personal Information</h3>
                <ul>
                  <li>
                    <b>Name:</b>
                    {user?.fullName}
                  </li>
                  <li>
                    <b>Father Name:</b>
                    {user?.fatherName}
                  </li>
                  <li>
                    <b>Mother Name:</b>
                    {user?.motherName}
                  </li>
                  <li>
                    <b>Education:</b>
                    {user?.education}
                  </li>
                  <li>
                    <b>Contact no.:</b>
                    {user?.contact}
                  </li>
                  <li>
                    <b>DOB.:</b>
                    {indiaTimeFormat(user?.dob)}
                  </li>
                  <li>
                    <b>Blood Group:</b>
                    {user?.bloodGroup}
                  </li>
                </ul>
              </div>

              <div className="Matrimonial-user-personal-details">
                <h3 className="heading-h3">Mosal Details</h3>
                <ul>
                  <li>
                    <b>Mama's Name:</b>
                    {user?.maternalUncle}
                  </li>
                  <li>
                    <b>Village Name:</b>
                    {user?.mamaVillageName}
                  </li>
                </ul>
              </div>

              <div className="Matrimonial-user-hobby-details">
                <h3 className="heading-h3">Hobbies / Interest</h3>
                <ul>
                  {user?.interest.map((data, i) => (
                    <li key={i}>
                      <span>{data}</span>
                    </li>
                  ))}
                  {user?.hobby.map((data, i) => (
                    <li key={i}>
                      <span>{data}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default DetailMatrimonialProfile;
