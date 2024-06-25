import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useDispatch } from "react-redux";
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
import ImageIcon from "@mui/icons-material/Image";
import Swal from "sweetalert2";
import { validateImageType } from "../../helper/global";
import { setLoading } from "../../features/auth/authSlice";

const Profile = () => {
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
    secondname: "",
    profession: "",
    contact: "",
    education: "",
    bloodGroup: "",
    dob: "00",
    avatar: "",
  });

  const { id, villageName } = useParams();
  console.log(villageName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // Delete Details
  const deleteSonDaughterDetailHandler = async (childId, deleteDetail) => {
    if (!childId && !id) {
      toast.error("Son/daughter id or family id is required!");
      return;
    }

    let result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        dispatch(setLoading(true));
        const response = await fetch(`/api/users/delete-son-daughter`, {
          method: "DELETE",
          body: JSON.stringify({
            childId,
            familyId: id,
            deleteDetail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.success) {
            toast.success(data.message);
            fetchProfile();
          }
        } else {
          toast.error("Error while delete details");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  // Modal New Image Upload
  const handleFileChange = (event, setAvatarFunction) => {
    if (!event.target.files[0]) {
      toast.error("No file selected");
      return;
    }

    const file = event.target.files[0];

    // Validate image type
    if (!validateImageType(file)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
      );
      return;
    }
    setAvatarFunction(file);
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/profile/${id}`);

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
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
      } else {
        return await response.json();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("User details not found!");
      navigate("/home");
    }
  };

  // Edit Profile
  const handleEditProfile = async () => {
    try {
      dispatch(setLoading(true));
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

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          toast.success(data.message);
          fetchProfile();
        }
      } else {
        toast.error("Error while edit profile");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Edit Profile Image
  const changeProfileImage = async (e, setAvatarTo, childObjectId) => {
    console.log("E >>", e.target.files[0], setAvatarTo, childObjectId);

    if (!e.target.files[0]) {
      toast.error("No file selected");
      return;
    }

    // Validate image type
    if (!validateImageType(e.target.files[0])) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
      );
      return;
    }

    const formData = new FormData();

    formData.append("avatar", e.target.files[0]);
    formData.append("setAvatarTo", setAvatarTo);
    formData.append("childObjectId", childObjectId);
    formData.append("familyId", id);

    try {
      dispatch(setLoading(true));
      const response = await fetch("/api/users/update-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        if (data && data.success) {
          toast.success(data.message);
          fetchProfile();
        }
      } else {
        toast.error("Error while updating image");
      }
    } catch (error) {
      console.log(error);
      toast.error(error || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearModal = () => {
    setOpen(false);
    setModalForm({
      surname: "",
      firstname: "",
      secondname: "",
      profession: "",
      contact: "",
      education: "",
      bloodGroup: "",
      dob: "00",
      avatar: "",
    });
  };

  // Add Modal Details
  const addModalHandler = async (modalType) => {
    console.log(modalType);
    console.log(modalForm);

    const {
      firstname,
      secondname,
      surname,
      avatar,
      bloodGroup,
      contact,
      education,
      dob,
      profession,
    } = modalForm;
    // console.log("userID:::", userId);
    if (
      [
        firstname,
        secondname,
        surname,
        avatar,
        bloodGroup,
        contact,
        education,
        dob,
        profession,
      ].some((field) => field == "" || field == {})
    ) {
      toast.error("Please, fill the details");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("profileId", id);
    formData.append("firstname", firstname);
    formData.append("secondname", secondname);
    formData.append("surname", surname);
    formData.append("bloodGroup", bloodGroup);
    formData.append("contact", contact);
    formData.append("education", education);
    formData.append("dob", dob);
    formData.append("proffession", profession);
    formData.append(
      "addDetailsTo",
      modalType === "sonDetails" ? "son" : "daughter"
    );

    try {
      dispatch(setLoading(true));
      const response = await fetch("/api/users/profile/add-new-son-daughter", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        if (data && data.success) {
          toast.success(data.message);
          fetchProfile();
          clearModal();
        }
      } else {
        toast.error("Error while add details!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      dispatch(setLoading(false));
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
          <div style={{ display: "flex" }}>
            <TextField
              sx={{ mr: "10px" }}
              margin="dense"
              name="surname"
              label="Surname *"
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
              sx={{ mr: "10px" }}
              margin="dense"
              name="firstname"
              label="Firstname *"
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
              name="secondname"
              label="Secondname *"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.secondname}
            />
          </div>
          <TextField
            margin="dense"
            name="profession"
            label="Profession *"
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
            label="Contact *"
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
            name="education"
            label="Education *"
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
          <div
            style={{
              display: "grid",
              justifyContent: "space-between",
              gridTemplateColumns: "1fr 1fr",
              marginTop: "10px",
              alignItems: "center",
            }}
          >
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
            <FormControl>
              <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={modalForm.bloodGroup}
                onChange={(e) => {
                  setModalForm((prevState) => ({
                    ...prevState,
                    bloodGroup: e.target.value,
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

          <div className="avatar-wrapper modal-avatar-wrapper">
            <Button variant="outlined" component="label">
              Upload Photo
              <input
                type="file"
                hidden
                name="avatar"
                onChange={(e) =>
                  handleFileChange(e, (file) =>
                    setModalForm({
                      ...modalForm,
                      avatar: file,
                    })
                  )
                }
              />
            </Button>
            {modalForm.avatar ? (
              <div
                className="modalForm-avatar"
                onClick={() =>
                  setModalForm((prevState) => ({
                    ...prevState,
                    avatar: "",
                  }))
                }
              >
                <img
                  alt="modalForm-avatar-image"
                  src={URL.createObjectURL(modalForm.avatar)}
                />
              </div>
            ) : (
              <div className="modal-committee-image-wrapper">
                <ImageIcon />
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearModal}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => addModalHandler(addDetails)}
          >
            Add
          </Button>
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
                    src={`${import.meta.env.VITE_BACKEND_URL_PROFILE}/${
                      headOfFamily.headOfFamilyAvatar
                    }`}
                    alt={headOfFamily.firstname}
                  />
                )}
                {!villageName && (
                  <Button variant="outlined" size="small" component="label">
                    Change Image
                    <input
                      type="file"
                      hidden
                      name="avatar"
                      onChange={(e) => changeProfileImage(e, "headOfFamily")}
                    />
                  </Button>
                )}
              </div>
              <div>
                <div className="headOfFamily-input-wrapper">
                  <TextField
                    id="outlined-basic"
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                  <FormControl disabled={villageName && true}>
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
                      disabled={villageName && true}
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
                <div className="headOfFamily-input-wrapper">
                  <FormControl
                    disabled={villageName && true}
                    fullWidth
                    variant="outlined"
                  >
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
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL_PROFILE}/${
                    wifeDetails.wifeAvatar
                  }`}
                  alt={wifeDetails.firstname}
                />
                {!villageName && (
                  <Button variant="outlined" size="small" component="label">
                    Change Image
                    <input
                      type="file"
                      hidden
                      name="avatar"
                      onChange={(e) => changeProfileImage(e, "wifeDetails")}
                    />
                  </Button>
                )}
              </div>
              <div>
                <div className="headOfFamily-input-wrapper">
                  <TextField
                    id="outlined-basic"
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                    disabled={villageName && true}
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
                  <FormControl disabled={villageName && true}>
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
                      disabled={villageName && true}
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
              <section key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label></label>
                  {!villageName && (
                    <Button
                      size="small"
                      onClick={() =>
                        deleteSonDaughterDetailHandler(son._id, "sonDetails")
                      }
                      variant="outlined"
                    >
                      Delete Son
                    </Button>
                  )}
                </div>
                <div className="headOfFamily-wrapper">
                  <div className="headOfFamily-avatar changeAvatar">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL_PROFILE}/${
                        son.sonAvatar
                      }`}
                      alt={son.firstname}
                    />
                    {!villageName && (
                      <Button variant="outlined" size="small" component="label">
                        Change Image
                        <input
                          type="file"
                          hidden
                          name="avatar"
                          onChange={(e) =>
                            changeProfileImage(e, "sonDetails", son._id)
                          }
                        />
                      </Button>
                    )}
                  </div>
                  <div>
                    <div className="headOfFamily-input-wrapper">
                      <TextField
                        id="outlined-basic"
                        disabled={villageName && true}
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
                        disabled={villageName && true}
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
                        disabled={villageName && true}
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
                        disabled={villageName && true}
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
                        disabled={villageName && true}
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
                        disabled={villageName && true}
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
                      <FormControl disabled={villageName && true}>
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
                          disabled={villageName && true}
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
              </section>
            ))}
          {!villageName && (
            <div className="prfoile-add-son-details-wrapper">
              <Button
                size="small"
                onClick={() => addSonDaughterDetailHandler("sonDetails")}
                variant="outlined"
              >
                + Add Son
              </Button>
            </div>
          )}
        </div>

        <div className="family-details profile-son-details">
          <h3>Daughter Details</h3>
          {daughterDetails &&
            daughterDetails.map((daughter, index) => (
              <section key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label></label>
                  {!villageName && (
                    <Button
                      size="small"
                      onClick={() =>
                        deleteSonDaughterDetailHandler(
                          daughter._id,
                          "daughterDetails"
                        )
                      }
                      variant="outlined"
                    >
                      Delete Daughter
                    </Button>
                  )}
                </div>
                <div className="headOfFamily-wrapper" key={daughter.firstname}>
                  <div className="headOfFamily-avatar changeAvatar">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL_PROFILE}/${
                        daughter.daughterAvatar
                      }`}
                      alt={daughter.firstname}
                    />
                    {!villageName && (
                      <Button variant="outlined" size="small" component="label">
                        Change Image
                        <input
                          type="file"
                          hidden
                          name="avatar"
                          onChange={(e) =>
                            changeProfileImage(
                              e,
                              "daughterDetails",
                              daughter._id
                            )
                          }
                        />
                      </Button>
                    )}
                  </div>
                  <div>
                    <div className="headOfFamily-input-wrapper">
                      <TextField
                        id="outlined-basic"
                        disabled={villageName && true}
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
                        disabled={villageName && true}
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
                        disabled={villageName && true}
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
                        disabled={villageName && true}
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
                        disabled={villageName && true}
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
                        disabled={villageName && true}
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
                      <FormControl disabled={villageName && true}>
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
                          disabled={villageName && true}
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
              </section>
            ))}
          {!villageName && (
            <div className="prfoile-add-son-details-wrapper">
              <Button
                size="small"
                onClick={() => addSonDaughterDetailHandler("daughterDetails")}
                variant="outlined"
              >
                + Add Daughter
              </Button>
            </div>
          )}
        </div>
        {!villageName && (
          <Button variant="contained" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        )}
      </div>
    </section>
  );
};

export default Profile;
