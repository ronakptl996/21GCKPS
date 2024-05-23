import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  TextField,
  Chip,
  Stack,
  FormHelperText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./CreateMatrimonialProfile.css";
import HeroSectionHeader from "../../../components/HeroSectionHeader/HeroSectionHeader";
import { toast } from "react-toastify";
import { validateImageType } from "../../../helper/global";
import { matrimonialSchema } from "../../../schemas";

const CreateMatrimonialProfile = () => {
  const [interestInputValue, setInterestInputValue] = useState("");
  const [hobbyInputValue, setHobbyInputValue] = useState("");
  const [daughterStatus, setDaughterStatus] = useState("");
  const [matrimonialImage, setMatrimonialImage] = useState("");
  const [profileDetail, setProfileDetail] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    education: "",
    profession: "",
    gender: "Select Gender",
    achievement: "",
    facebookUserName: "",
    instagramUserName: "",
    contact: "",
    bloodGroup: "o+",
    address: "",
    interest: [],
    hobby: [],
    dob: "",
    yourSelf: "",
    maternalUncle: "",
    mamaVillageName: "",
  });

  const [sonDetails, setSonDetails] = useState([
    {
      surname: "",
      firstname: "",
      secondname: "",
      profession: "",
      education: "",
    },
  ]);

  const initialValues = {
    matrimonialImage: "",
    profileDetail: {
      fullName: "",
      fatherName: "",
      motherName: "",
      education: "",
      profession: "",
      gender: "Select Gender",
      achievement: "",
      facebookUserName: "",
      instagramUserName: "",
      contact: "",
      bloodGroup: "o+",
      address: "",
      interest: [],
      hobby: [],
      dob: "",
      yourSelf: "",
      maternalUncle: "",
      mamaVillageName: "",
    },
    sonDetails: [
      {
        surname: "",
        firstname: "",
        secondname: "",
        profession: "",
        education: "",
      },
    ],
  };

  const { errors, handleBlur, handleSubmit, handleChange, values, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: matrimonialSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  const addSonDetailHandler = () => {
    setSonDetails((prevDetails) => [
      ...prevDetails,
      {
        surname: "",
        firstname: "",
        secondname: "",
        profession: "",
        education: "",
        dob: "",
      },
    ]);
  };

  const handleSonDetailChange = (index, field, value) => {
    setSonDetails((prevSonDetails) => {
      const newSonDetails = [...prevSonDetails];
      newSonDetails[index][field] = value;
      return newSonDetails;
    });
  };

  // Interest Chip
  const handleInterestAddChip = () => {
    if (
      interestInputValue.trim() !== "" &&
      !profileDetail.interest.includes(interestInputValue)
    ) {
      // setChips((prevChips) => [...prevChips, inputValue]);
      setProfileDetail((prevState) => ({
        ...prevState,
        interest: [...profileDetail.interest, interestInputValue],
      }));
      setInterestInputValue("");
    }
  };

  // Delete handleInterestDeleteChip
  const handleInterestDeleteChip = (chipToDelete) => {
    setProfileDetail((prevState) => ({
      ...prevState,
      interest: [
        ...profileDetail.interest.filter((chip) => chip !== chipToDelete),
      ],
    }));
  };

  // Hobby Chip
  const handleHobbyAddChip = () => {
    if (
      hobbyInputValue.trim() !== "" &&
      !profileDetail.hobby.includes(hobbyInputValue)
    ) {
      // setChips((prevChips) => [...prevChips, inputValue]);
      setProfileDetail((prevState) => ({
        ...prevState,
        hobby: [...profileDetail.hobby, hobbyInputValue],
      }));
      setHobbyInputValue("");
    }
  };

  // Delete handleHobbyDeleteChip
  const handleHobbyDeleteChip = (chipToDelete) => {
    setProfileDetail((prevState) => ({
      ...prevState,
      hobby: [...profileDetail.hobby.filter((chip) => chip !== chipToDelete)],
    }));
  };

  // Delete More Details
  const deleteSonDetailHandler = (index) => {
    setSonDetails((prevSonDetails) => {
      const newSonDetails = [...prevSonDetails];
      newSonDetails.splice(index, 1);
      return newSonDetails;
    });
  };

  // image validation
  const handleFileChange = (event, setAvatarFunction) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    // Validate image type
    if (!validateImageType(file)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
      );
      return;
    }
    setAvatarFunction(file);
  };

  // const handleSubmit = async () => {
  //   if (!matrimonialImage) {
  //     toast.error("Please upload image");
  //     return;
  //   }

  //   // Validate image type
  //   if (!validateImageType(matrimonialImage)) {
  //     toast.error(
  //       "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
  //     );
  //     return;
  //   }

  //   const data = {
  //     profileDetail,
  //     sonDetails,
  //   };

  //   const formData = new FormData();

  //   formData.append("data", JSON.stringify(data));
  //   formData.append("matrimonialImage", matrimonialImage);

  //   try {
  //     // dispatch(setLoading(true));
  //     let response = await fetch("/api/add-matrimonial", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     let data = await response.json();
  //     console.log(data);
  //     if (data.success) {
  //       toast.success(data.message);
  //       setProfileDetail({
  //         fullName: "",
  //         fatherName: "",
  //         motherName: "",
  //         education: "",
  //         profession: "",
  //         gender: "Select Gender",
  //         achievement: "",
  //         facebookUserName: "",
  //         instagramUserName: "",
  //         contact: "",
  //         bloodGroup: "o+",
  //         address: "",
  //         interest: [],
  //         hobby: [],
  //         dob: "",
  //         yourSelf: "",
  //         maternalUncle: "",
  //         mamaVillageName: "",
  //       });
  //       setSonDetails([
  //         {
  //           surname: "",
  //           firstname: "",
  //           secondname: "",
  //           profession: "",
  //           education: "",
  //         },
  //       ]);
  //       setMatrimonialImage("");
  //     } else if (!data.success && data.statusCode >= 400) {
  //       toast.error(data.message);
  //     } else {
  //       toast.error("Error, while creating profile");
  //     }
  //   } catch (e) {
  //     toast.error("Something went wrong!");
  //   }
  // };

  return (
    <>
      <HeroSectionHeader
        heading="Matrimonial Profile"
        paragraph="Create your Matrimonial Profile"
      />
      <section className="createMatrimonialProfile">
        <div className="matrimonial-form">
          <form>
            {/* Head of Family */}
            <div className="matrimonial-form-input-wrapper">
              <div className="register-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Fullname"
                  variant="outlined"
                  name="profileDetail.fullName"
                  value={values.profileDetail.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.fullName &&
                    errors?.profileDetail?.fullName
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.fullName &&
                    errors?.profileDetail?.fullName
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Father Full Name"
                  type="text"
                  variant="outlined"
                  name="profileDetail.fatherName"
                  value={values.profileDetail.fatherName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.fatherName &&
                    errors?.profileDetail?.fatherName
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.fatherName &&
                    errors?.profileDetail?.fatherName
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Mother Full Name"
                  type="text"
                  variant="outlined"
                  name="profileDetail.motherName"
                  value={values.profileDetail.motherName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.motherName &&
                    errors?.profileDetail?.motherName
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.motherName &&
                    errors?.profileDetail?.motherName
                  }
                />
              </div>
              <div className="register-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Education"
                  variant="outlined"
                  name="profileDetail.education"
                  value={values.profileDetail.education}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.education &&
                    errors?.profileDetail?.education
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.education &&
                    errors?.profileDetail?.education
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Profession"
                  type="text"
                  variant="outlined"
                  name="profileDetail.profession"
                  value={values.profileDetail.profession}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.profession &&
                    errors?.profileDetail?.profession
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.profession &&
                    errors?.profileDetail?.profession
                  }
                />
                <FormControl
                  error={
                    touched?.profileDetail?.gender &&
                    errors?.profileDetail?.gender
                      ? true
                      : false
                  }
                >
                  <InputLabel id={`demo-simple-select-label`}>
                    Select Gender
                  </InputLabel>
                  <Select
                    labelId={`demo-simple-select-label`}
                    id={`demo-simple-select`}
                    label="Select Gender"
                    name="profileDetail.gender"
                    value={values.profileDetail.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="Select Gender" disabled>
                      Select Gender
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  {touched?.profileDetail?.gender &&
                    errors?.profileDetail?.gender && (
                      <FormHelperText>
                        {errors?.profileDetail?.gender}
                      </FormHelperText>
                    )}
                </FormControl>
              </div>
              <div className="register-input-wrapper">
                <TextField
                  id="outlined-basic"
                  label="Achievement"
                  variant="outlined"
                  name="profileDetail.achievement"
                  value={values.profileDetail.achievement}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.achievement &&
                    errors?.profileDetail?.achievement
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.achievement &&
                    errors?.profileDetail?.achievement
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Facebook Username"
                  variant="outlined"
                  name="profileDetail.facebookUserName"
                  value={values.profileDetail.facebookUserName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.facebookUserName &&
                    errors?.profileDetail?.facebookUserName
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.facebookUserName &&
                    errors?.profileDetail?.facebookUserName
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Instagram Username"
                  variant="outlined"
                  name="profileDetail.instagramUserName"
                  value={values.profileDetail.instagramUserName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.instagramUserName &&
                    errors?.profileDetail?.instagramUserName
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.instagramUserName &&
                    errors?.profileDetail?.instagramUserName
                  }
                />
              </div>
              <div className="register-input-wrapper">
                <div className="donation-image-wrapper">
                  <Button
                    id={`outlined-basic`}
                    variant="contained"
                    component="label"
                    style={{ boxShadow: "none" }}
                  >
                    <CloudUploadIcon style={{ marginRight: "5px" }} /> Upload
                    Photo
                    <input
                      type="file"
                      hidden
                      name="matrimonialImage"
                      onChange={(e) => {
                        handleFileChange(e, (file) =>
                          setMatrimonialImage(file)
                        );
                      }}
                    />
                  </Button>
                  {matrimonialImage && (
                    <div
                      className="donation-image"
                      onClick={() => setMatrimonialImage("")}
                    >
                      <img
                        alt="donation image"
                        src={URL.createObjectURL(matrimonialImage)}
                      />
                    </div>
                  )}
                </div>
                <TextField
                  id={`outlined-basic`}
                  label="Contact No."
                  type="number"
                  variant="outlined"
                  name="profileDetail.contact"
                  value={values.profileDetail.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.contact &&
                    errors?.profileDetail?.contact
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.contact &&
                    errors?.profileDetail?.contact
                  }
                />
                <FormControl
                  error={
                    touched?.profileDetail?.bloodGroup &&
                    errors?.profileDetail?.bloodGroup
                      ? true
                      : false
                  }
                >
                  <InputLabel id={`demo-simple-select-label`}>
                    Blood Group
                  </InputLabel>
                  <Select
                    labelId={`demo-simple-select-label`}
                    id={`demo-simple-select`}
                    label="Blood Group"
                    name="profileDetail.bloodGroup"
                    value={values.profileDetail.bloodGroup}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  {touched?.profileDetail?.bloodGroup &&
                    errors?.profileDetail?.bloodGroup && (
                      <FormHelperText>
                        {errors?.profileDetail?.bloodGroup}
                      </FormHelperText>
                    )}
                </FormControl>
              </div>
              <div className="register-input-wrapper">
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">
                    Village Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Village Name"
                    value={profileDetail.address}
                    onChange={(e) =>
                      setProfileDetail((prevState) => ({
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker label="Choose your DOB" /> */}
                  <DatePicker
                    label="Choose your DOB"
                    value={profileDetail.dob} // Set the value prop to the 'dob' property in your state
                    onChange={(date) =>
                      setProfileDetail((prevState) => ({
                        ...prevState,
                        dob: new Date(date),
                      }))
                    } // Pass the handleDateChange function
                  />
                </LocalizationProvider>
                <TextField
                  id={`outlined-basic`}
                  label="Write about your self (min 250 word)"
                  value={profileDetail.yourSelf}
                  onChange={(e) =>
                    setProfileDetail((prevState) => ({
                      ...prevState,
                      yourSelf: e.target.value,
                    }))
                  }
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
                    {profileDetail?.interest?.map((chip, index) => (
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
                    {profileDetail?.hobby?.map((chip, index) => (
                      <Chip
                        key={index}
                        label={chip}
                        onDelete={() => handleHobbyDeleteChip(chip)}
                        color="primary"
                      />
                    ))}
                  </Stack>
                </div>
                {/* <TextField
                  id="outlined-basic"
                  label="Interest"
                  type="text"
                  variant="outlined"
                  value={profileDetail.interest}
                  onChange={(e) =>
                    setProfileDetail((prevState) => ({
                      ...prevState,
                      interest: e.target.value,
                    }))
                  }
                /> */}
              </div>
              <div className="register-input-wrapper">
                <TextField
                  id={`outlined-basic`}
                  label="Maternal Uncle Name"
                  value={profileDetail.maternalUncle}
                  onChange={(e) =>
                    setProfileDetail((prevState) => ({
                      ...prevState,
                      maternalUncle: e.target.value,
                    }))
                  }
                />
                <TextField
                  id={`outlined-basic`}
                  label="Mama's Village Name"
                  value={profileDetail.mamaVillageName}
                  onChange={(e) =>
                    setProfileDetail((prevState) => ({
                      ...prevState,
                      mamaVillageName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Son / Daughter Details */}
            <div className="matrimonial-form-input-wrapper">
              <div className="son-daughter-details">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Brother/Sister is married or not
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={daughterStatus}
                    onChange={(e) => setDaughterStatus(e.target.value)}
                  >
                    <FormControlLabel
                      value="married"
                      control={<Radio />}
                      label="Married"
                    />
                    <FormControlLabel
                      value="unmarried"
                      control={<Radio />}
                      label="Unmarried"
                    />
                  </RadioGroup>
                </FormControl>
                {daughterStatus == "unmarried" && (
                  <>
                    {sonDetails.map((detail, index) => {
                      return (
                        <div className="son-daughter-wrapper" key={index}>
                          <div className="brother-sister-details">
                            <label>
                              Brother/Sister Details {index > 0 ? index : ""}
                            </label>
                            {index > 0 && (
                              <Button
                                onClick={() => deleteSonDetailHandler(index)}
                                variant="outlined"
                              >
                                Delete Details
                              </Button>
                            )}
                          </div>
                          <div className="register-input-wrapper">
                            <TextField
                              id={`outlined-basic-${index}`}
                              label="Surname"
                              variant="outlined"
                              value={detail.surname}
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
                              value={detail.firstname}
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
                              value={detail.secondname}
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
                              value={detail.profession}
                              onChange={(e) =>
                                handleSonDetailChange(
                                  index,
                                  "profession",
                                  e.target.value
                                )
                              }
                            />
                            <TextField
                              id={`outlined-basic-${index}`}
                              label="Education"
                              variant="outlined"
                              type="text"
                              value={detail.education}
                              onChange={(e) =>
                                handleSonDetailChange(
                                  index,
                                  "education",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                    <div className="add-son-daughter-details-wrapper">
                      <Button variant="outlined" onClick={addSonDetailHandler}>
                        + Add More Details
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <Button
                onClick={handleSubmit}
                fullWidth
                style={{ background: "#a7732b", marginTop: "10px" }}
                variant="contained"
              >
                Create Profile
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateMatrimonialProfile;
