import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
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
  const [defaultDate, setDefaultDate] = useState(dayjs());
  const [matrimonialImage, setMatrimonialImage] = useState("");

  const initialValues = {
    interestInputValue: "",
    hobbyInputValue: "",
    daughterStatus: "married",
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
      dob: defaultDate,
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

  const {
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    values,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: matrimonialSchema,
    onSubmit: async (values, { resetForm }) => {
      await submitForm(values, resetForm);
    },
  });

  const addSonDetailHandler = () => {
    setFieldValue("sonDetails", [
      ...values.sonDetails,
      {
        surname: "",
        firstname: "",
        secondname: "",
        profession: "",
        education: "",
      },
    ]);
  };

  const handleSonDetailChange = (index, field, value) => {
    const updatedSonDetails = [...values.sonDetails];
    updatedSonDetails[index][field] = value;
    setFieldValue("sonDetails", updatedSonDetails);
  };

  // Interest Chip
  const handleInterestAddChip = () => {
    if (
      values.interestInputValue.trim() !== "" &&
      !values.profileDetail.interest.includes(values.interestInputValue)
    ) {
      setFieldValue("profileDetail.interest", [
        ...values.profileDetail.interest,
        values.interestInputValue,
      ]);
      setFieldValue("interestInputValue", "");
    }
  };

  // Delete handleInterestDeleteChip
  const handleInterestDeleteChip = (chipToDelete) => {
    setFieldValue(
      "profileDetail.interest",
      values.profileDetail.interest.filter((chip) => chip !== chipToDelete)
    );
  };

  // Hobby Chip
  const handleHobbyAddChip = () => {
    if (
      values.hobbyInputValue.trim() !== "" &&
      !values.profileDetail.hobby.includes(values.hobby)
    ) {
      setFieldValue("profileDetail.hobby", [
        ...values.profileDetail.hobby,
        values.hobbyInputValue,
      ]);
      setFieldValue("hobbyInputValue", "");
    }
  };

  // Delete handleHobbyDeleteChip
  const handleHobbyDeleteChip = (chipToDelete) => {
    setFieldValue(
      "profileDetail.hobby",
      values.profileDetail.hobby.filter((chip) => chip !== chipToDelete)
    );
  };

  // Delete More Details
  const deleteSonDetailHandler = (index) => {
    const updatedSonDetails = values.sonDetails.filter((_, i) => i !== index);
    setFieldValue("sonDetails", updatedSonDetails);
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

  const submitForm = async (data, resetForm) => {
    if (!matrimonialImage) {
      toast.error("Please upload image");
      return;
    }

    // Validate image type
    if (!validateImageType(matrimonialImage)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
      );
      return;
    }

    const profileData = {
      profileDetail: data.profileDetail,
      sonDetails: data.sonDetails,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(profileData));
    formData.append("matrimonialImage", matrimonialImage);

    try {
      let response = await fetch(`/api/add-matrimonial`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      let data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setMatrimonialImage("");
        resetForm();
      } else if (!data.success && data.statusCode >= 400) {
        toast.error(data.message);
      } else {
        toast.error("Error, while creating profile");
      }
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    setDefaultDate(dayjs());
  }, []);

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
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={
                    touched?.profileDetail?.address &&
                    errors?.profileDetail?.address
                      ? true
                      : false
                  }
                >
                  <InputLabel id="demo-simple-select-label">
                    Village Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Village Name"
                    name="profileDetail.address"
                    value={values.profileDetail.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  {touched?.profileDetail?.address &&
                    errors?.profileDetail?.address && (
                      <FormHelperText>
                        {errors?.profileDetail?.address}
                      </FormHelperText>
                    )}
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker label="Choose your DOB" /> */}
                  <DatePicker
                    label="Choose your DOB"
                    value={values.profileDetail.dob}
                    onChange={(date) =>
                      setFieldValue("profileDetail.dob", new Date(date))
                    }
                    disableFuture
                    format="DD-MM-YYYY"
                    error={
                      touched.profileDetail?.dob &&
                      Boolean(errors.profileDetail?.dob)
                    } // Check for errors
                    helperText={
                      touched.profileDetail?.dob && errors.profileDetail?.dob
                    }
                  />
                </LocalizationProvider>
                <TextField
                  id={`outlined-basic`}
                  label="Write about your self (min 50 char)"
                  name="profileDetail.yourSelf"
                  value={values.profileDetail.yourSelf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.yourSelf &&
                    errors?.profileDetail?.yourSelf
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.yourSelf &&
                    errors?.profileDetail?.yourSelf
                  }
                />
              </div>
              <div className="register-input-wrapper">
                <div>
                  <TextField
                    label="Interest"
                    name="interestInputValue"
                    value={values.interestInputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleInterestAddChip();
                      }
                    }}
                    error={
                      touched?.profileDetail?.interest &&
                      errors?.profileDetail?.interest
                        ? true
                        : false
                    }
                    helperText={
                      touched?.profileDetail?.interest &&
                      errors?.profileDetail?.interest
                    }
                  />
                  <Stack direction="row" spacing={1} mt={1}>
                    {values?.profileDetail?.interest?.map((chip, index) => (
                      <Chip
                        key={index}
                        label={chip}
                        size="small"
                        onDelete={() => handleInterestDeleteChip(chip)}
                        color="primary"
                      />
                    ))}
                  </Stack>
                </div>
                <div>
                  <TextField
                    label="Hobby"
                    name="hobbyInputValue"
                    value={values.hobbyInputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleHobbyAddChip();
                      }
                    }}
                    error={
                      touched?.profileDetail?.hobby &&
                      errors?.profileDetail?.hobby
                        ? true
                        : false
                    }
                    helperText={
                      touched?.profileDetail?.hobby &&
                      errors?.profileDetail?.hobby
                    }
                  />
                  <Stack direction="row" spacing={1} mt={1}>
                    {values.profileDetail?.hobby?.map((chip, index) => (
                      <Chip
                        key={index}
                        label={chip}
                        size="small"
                        onDelete={() => handleHobbyDeleteChip(chip)}
                        color="primary"
                      />
                    ))}
                  </Stack>
                </div>
              </div>
              <div className="register-input-wrapper">
                <TextField
                  id={`outlined-basic`}
                  label="Maternal Uncle Name"
                  name="profileDetail.maternalUncle"
                  value={values.profileDetail.maternalUncle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.maternalUncle &&
                    errors?.profileDetail?.maternalUncle
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.maternalUncle &&
                    errors?.profileDetail?.maternalUncle
                  }
                />
                <TextField
                  id={`outlined-basic`}
                  label="Mama's Village Name"
                  name="profileDetail.mamaVillageName"
                  value={values.profileDetail.mamaVillageName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.profileDetail?.mamaVillageName &&
                    errors?.profileDetail?.mamaVillageName
                      ? true
                      : false
                  }
                  helperText={
                    touched?.profileDetail?.mamaVillageName &&
                    errors?.profileDetail?.mamaVillageName
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
                    value={values.daughterStatus}
                    onChange={(e) =>
                      setFieldValue("daughterStatus", e.target.value)
                    }
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
                {values.daughterStatus == "unmarried" && (
                  <>
                    {values?.sonDetails?.map((detail, index) => {
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
                                size="small"
                                color="error"
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
                              onBlur={handleBlur}
                              error={
                                touched?.sonDetails?.[index]?.surname &&
                                errors?.sonDetails?.[index]?.surname
                                  ? true
                                  : false
                              }
                              helperText={
                                touched?.sonDetails?.[index]?.surname &&
                                errors?.sonDetails?.[index]?.surname
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
                              onBlur={handleBlur}
                              error={
                                touched?.sonDetails?.[index]?.firstname &&
                                errors?.sonDetails?.[index]?.firstname
                                  ? true
                                  : false
                              }
                              helperText={
                                touched?.sonDetails?.[index]?.firstname &&
                                errors?.sonDetails?.[index]?.firstname
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
                              onBlur={handleBlur}
                              error={
                                touched?.sonDetails?.[index]?.secondname &&
                                errors?.sonDetails?.[index]?.secondname
                                  ? true
                                  : false
                              }
                              helperText={
                                touched?.sonDetails?.[index]?.secondname &&
                                errors?.sonDetails?.[index]?.secondname
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
                              onBlur={handleBlur}
                              error={
                                touched?.sonDetails?.[index]?.profession &&
                                errors?.sonDetails?.[index]?.profession
                                  ? true
                                  : false
                              }
                              helperText={
                                touched?.sonDetails?.[index]?.profession &&
                                errors?.sonDetails?.[index]?.profession
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
                              onBlur={handleBlur}
                              error={
                                touched?.sonDetails?.[index]?.education &&
                                errors?.sonDetails?.[index]?.education
                                  ? true
                                  : false
                              }
                              helperText={
                                touched?.sonDetails?.[index]?.education &&
                                errors?.sonDetails?.[index]?.education
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                    <div className="add-son-daughter-details-wrapper">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={addSonDetailHandler}
                      >
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
