import React, { useState } from "react";
import "./BusinessPackages.css";
import { useDispatch } from "react-redux";
import HeroSectionHeader from "../../../components/HeroSectionHeader/HeroSectionHeader";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { validateImageType } from "../../../helper/global";
import { setLoading } from "../../../features/auth/authSlice";

const BusinessPackeages = () => {
  // Modal useState
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState({
    open: "Start Time",
    close: "Close Time",
    openMeridiem: "AM/PM",
    closeMeridiem: "AM/PM",
  });
  const [provideServices, setProvideServices] = useState("");
  const [modalForm, setModalForm] = useState({
    businessOwner: "",
    businessName: "",
    businessContact: "",
    businessEmail: "",
    businessAddress: "",
    businessLogo: "",
    businessVisitingCard: "",
    provideServices: [],
    openingHours: "",
    businessWebsite: "",
    businessInstagramUsername: "",
    businessTwitterUsername: "",
    businessFacebookUsername: "",
    quickInfo: "",
    detailedInfo: "",
    yearOfEstablishment: "",
    businessCategory: "",
    packageType: "",
  });

  const dispatch = useDispatch();

  // *OPEN MODAL
  const openModal = (packageType) => {
    setModalForm((prevState) => ({
      ...prevState,
      packageType: packageType,
    }));
    setOpen(true);
  };

  // *Interest Chip
  const handleProvideServiceAddChip = () => {
    if (
      provideServices.trim() !== "" &&
      !modalForm.provideServices.includes(provideServices)
    ) {
      // setChips((prevChips) => [...prevChips, inputValue]);
      setModalForm((prevState) => ({
        ...prevState,
        provideServices: [...modalForm.provideServices, provideServices],
      }));
      setProvideServices("");
    }
  };

  // *Delete handleServicesDeleteChip
  const handleServicesDeleteChip = (chipToDelete) => {
    setModalForm((prevState) => ({
      ...prevState,
      provideServices: [
        ...modalForm.provideServices.filter((chip) => chip !== chipToDelete),
      ],
    }));
  };

  // *Submit Modal Form
  const handleSubmit = async () => {
    // Package type FREE then upload businessVisitingCard
    if (modalForm.packageType == "FREE") {
      if (!modalForm.businessVisitingCard) {
        toast.error("Please upload business visiting card");
        return;
      }

      // Validate image type
      if (!validateImageType(modalForm.businessVisitingCard)) {
        toast.error(
          "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
        );
        return;
      }
    }

    // Package type ELITE | PREMIUM then upload businessVisitingCard and businessLogo
    else if (modalForm.packageType !== "FREE") {
      if (!modalForm.businessVisitingCard) {
        toast.error("Please upload business visiting card");
        return;
      }

      if (!modalForm.businessLogo) {
        toast.error("Please upload business logo");
        return;
      }

      // Validate image type
      if (!validateImageType(modalForm.businessVisitingCard)) {
        toast.error(
          "Invalid visiting card file type. Only JPEG, PNG, GIF, and WEBP are allowed."
        );
        return;
      }

      if (!validateImageType(modalForm.businessLogo)) {
        toast.error(
          "Invalid logo file type. Only JPEG, PNG, GIF, and WEBP are allowed."
        );
        return;
      }
    }

    modalForm.openingHours = `${hour.open} ${hour.openMeridiem} to ${hour.close} ${hour.closeMeridiem}`;

    const formData = new FormData();
    formData.append("businessVisitingCard", modalForm.businessVisitingCard);
    formData.append("businessLogo", modalForm.businessLogo);
    formData.append("businessData", JSON.stringify(modalForm));

    try {
      dispatch(setLoading(true));
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/business/add`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result && result.success) {
          toast.success("Business details add successfully");
          closeModal();
        }
      } else {
        toast.error("Error while purchase business package");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const closeModal = () => {
    setOpen(false);
    setModalForm({
      businessOwner: "",
      businessName: "",
      businessContact: "",
      businessEmail: "",
      businessAddress: "",
      businessLogo: "",
      businessVisitingCard: "",
      provideServices: [],
      openingHours: "",
      businessWebsite: "",
      businessInstagramUsername: "",
      businessTwitterUsername: "",
      businessFacebookUsername: "",
      quickInfo: "",
      detailedInfo: "",
      yearOfEstablishment: "",
      businessCategory: "",
      packageType: "",
    });

    setHour({
      open: "Start Time",
      close: "Close Time",
      openMeridiem: "AM/PM",
      closeMeridiem: "AM/PM",
    });
  };

  return (
    <section className="businessPackages">
      {/* Dialog Form */}
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ fontWeight: "600" }}>
          {`Create Your ${modalForm.packageType} Business Listing`}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name of Owner"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                businessOwner: e.target.value,
              }));
            }}
            value={modalForm.businessOwner}
          />
          <TextField
            margin="dense"
            label="Business Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                businessName: e.target.value,
              }));
            }}
            value={modalForm.businessName}
          />
          <div style={{ display: "flex" }}>
            <TextField
              style={{ paddingRight: "20px" }}
              margin="dense"
              label="Business Contact"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  businessContact: e.target.value,
                }));
              }}
              value={modalForm.businessContact}
            />
            <TextField
              margin="dense"
              label="Business Email"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  businessEmail: e.target.value,
                }));
              }}
              value={modalForm.businessEmail}
            />
          </div>
          <TextField
            margin="dense"
            label="Business Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                businessAddress: e.target.value,
              }));
            }}
            value={modalForm.businessAddress}
          />
          <FormControl margin="dense" fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">
              Choose Business Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Choose Business Category"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  businessCategory: e.target.value,
                }));
              }}
              value={modalForm.businessCategory}
            >
              <MenuItem value="Choose Business Category" disabled>
                Choose Business Category
              </MenuItem>
              <MenuItem value="Agriculture">Agriculture</MenuItem>
              <MenuItem value="Services">Services</MenuItem>
              <MenuItem value="Manufacturing">Manufacturing</MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Information Technology">
                Information Technology
              </MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Finance and Banking">
                Finance and Banking
              </MenuItem>
              <MenuItem value="Real Estate">Real Estate</MenuItem>
              <MenuItem value="Hospitality">Hospitality</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* // ^UPLOAD DATA FOR ELITE PACKAGE */}
          {modalForm.packageType !== "FREE" && (
            <>
              <div className="businessPackage-services">
                <TextField
                  variant="standard"
                  label="Type and press Enter to add a service (e.g., 'Cleaning', 'Maintenance')"
                  value={provideServices}
                  onChange={(e) => setProvideServices(e.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleProvideServiceAddChip();
                    }
                  }}
                />
                <Stack direction="row" spacing={1} mt={1}>
                  {modalForm?.provideServices?.map((chip, index) => (
                    <Chip
                      key={index}
                      size="small"
                      label={chip}
                      onDelete={() => handleServicesDeleteChip(chip)}
                      color="primary"
                    />
                  ))}
                </Stack>
              </div>
              <TextField
                label="Business Quick Info"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setModalForm((prevState) => ({
                    ...prevState,
                    quickInfo: e.target.value,
                  }));
                }}
                value={modalForm.quickInfo}
              />
              <div className="openingHours-wrapper">
                <Input disabled placeholder="Business Hour" />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Start Time"
                  variant="standard"
                  onChange={(e) => {
                    setHour((prevState) => ({
                      ...prevState,
                      open: e.target.value,
                    }));
                  }}
                  value={hour.open}
                >
                  <MenuItem value="Start Time" disabled>
                    Start time
                  </MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="11">11</MenuItem>
                  <MenuItem value="12">12</MenuItem>
                </Select>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="AM/PM"
                  variant="standard"
                  onChange={(e) => {
                    setHour((prevState) => ({
                      ...prevState,
                      openMeridiem: e.target.value,
                    }));
                  }}
                  value={hour.openMeridiem}
                >
                  <MenuItem value="AM/PM" disabled>
                    AM/PM
                  </MenuItem>
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </Select>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Close Time"
                  variant="standard"
                  onChange={(e) => {
                    setHour((prevState) => ({
                      ...prevState,
                      close: e.target.value,
                    }));
                  }}
                  value={hour.close}
                >
                  <MenuItem value="Close Time" disabled>
                    End time
                  </MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="11">11</MenuItem>
                  <MenuItem value="12">12</MenuItem>
                </Select>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="AM/PM"
                  variant="standard"
                  onChange={(e) => {
                    setHour((prevState) => ({
                      ...prevState,
                      closeMeridiem: e.target.value,
                    }));
                  }}
                  value={hour.closeMeridiem}
                >
                  <MenuItem value="AM/PM" disabled>
                    AM/PM
                  </MenuItem>
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </Select>
              </div>
            </>
          )}

          {/* // ^UPLOAD DATA FOR PREMIER PACKAGE */}
          {modalForm.packageType === "PREMIUM" && (
            <>
              <div style={{ display: "flex" }}>
                <TextField
                  style={{ paddingRight: "20px" }}
                  margin="dense"
                  label="Website URL"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setModalForm((prevState) => ({
                      ...prevState,
                      businessWebsite: e.target.value,
                    }));
                  }}
                  value={modalForm.businessWebsite}
                />
                <TextField
                  margin="dense"
                  label="Year of Establishment"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setModalForm((prevState) => ({
                      ...prevState,
                      yearOfEstablishment: e.target.value,
                    }));
                  }}
                  value={modalForm.yearOfEstablishment}
                />
              </div>

              <Grid container spacing={1} my={0}>
                <Grid item xs={4}>
                  <TextField
                    label="Business Instagram"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setModalForm((prevState) => ({
                        ...prevState,
                        businessInstagramUsername: e.target.value,
                      }));
                    }}
                    value={modalForm.businessInstagramUsername}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Business Twitter"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setModalForm((prevState) => ({
                        ...prevState,
                        businessTwitterUsername: e.target.value,
                      }));
                    }}
                    value={modalForm.businessTwitterUsername}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Business Facebook"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setModalForm((prevState) => ({
                        ...prevState,
                        businessFacebookUsername: e.target.value,
                      }));
                    }}
                    value={modalForm.businessFacebookUsername}
                  />
                </Grid>
              </Grid>

              <TextField
                margin="dense"
                label="Detailed Info (min 200 characters)"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setModalForm((prevState) => ({
                    ...prevState,
                    detailedInfo: e.target.value,
                  }));
                }}
                value={modalForm.detailedInfo}
              />
            </>
          )}

          {/* // ^IMAGE UPLOAD */}
          <Grid container spacing={0} my={1}>
            <Grid item xs={6}>
              <div className="businessmodal-image-wrapper">
                <Button variant="outlined" size="small" component="label">
                  Upload Visiting Card
                  <input
                    type="file"
                    hidden
                    name="businessVisitingCard"
                    onChange={(e) => {
                      setModalForm((prevState) => ({
                        ...prevState,
                        businessVisitingCard: e.target.files[0],
                      }));
                    }}
                  />
                </Button>
                {/* <div> */}
                {modalForm.businessVisitingCard ? (
                  <div
                    className="businessmodal-image donation-image"
                    onClick={() =>
                      setModalForm((prevState) => ({
                        ...prevState,
                        businessVisitingCard: "",
                      }))
                    }
                  >
                    <img
                      alt="businessVisitingCard"
                      src={URL.createObjectURL(modalForm.businessVisitingCard)}
                    />
                  </div>
                ) : (
                  <div className="businessmodal-image">
                    <ImageIcon />
                  </div>
                )}
                {/* </div> */}
              </div>
            </Grid>

            <Grid item xs={6}>
              {/* IMAGE FOR BUSINESS LOGO */}
              {modalForm.packageType !== "FREE" && (
                <div className="businessmodal-image-wrapper">
                  <Button variant="outlined" size="small" component="label">
                    Upload Business Logo
                    <input
                      type="file"
                      hidden
                      name="businessLogo"
                      onChange={(e) => {
                        setModalForm((prevState) => ({
                          ...prevState,
                          businessLogo: e.target.files[0],
                        }));
                      }}
                    />
                  </Button>
                  {/* <div> */}
                  {modalForm.businessLogo ? (
                    <div
                      className="businessmodal-image donation-image"
                      onClick={() =>
                        setModalForm((prevState) => ({
                          ...prevState,
                          businessLogo: "",
                        }))
                      }
                    >
                      <img
                        alt="businessLogo"
                        src={URL.createObjectURL(modalForm.businessLogo)}
                      />
                    </div>
                  ) : (
                    <div className="businessmodal-image">
                      <ImageIcon />
                    </div>
                  )}
                  {/* </div> */}
                </div>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <HeroSectionHeader heading="Select Your Business Packages" />
      <div className="businessPackages-wrapper">
        <div className="businessPackages-card">
          <div className="package-top">
            <div className="businessPackages-card-header">
              <p className="pricing">
                <p className="save-pricing">Free</p>
              </p>
              <p className="price-desc">
                Everything you need to create your website
              </p>
            </div>
            <div className="businessPackages-card-pricing">
              <div className="package-price">
                ₹0.00 <span>/mo</span>
              </div>
            </div>
          </div>
          <div className="packages-features">
            <h3>What is included</h3>
            <ul>
              <li>
                <DoneIcon fontSize="small" />
                Visiting Card Upload
              </li>
              <li>
                <DoneIcon fontSize="small" />
                Business Name
              </li>
              <li>
                <DoneIcon fontSize="small" /> Business Contact
              </li>
              <li>
                <DoneIcon fontSize="small" /> Business Email Id
              </li>
              <li>
                <DoneIcon fontSize="small" /> Busines Address
              </li>
              <li>
                <DoneIcon fontSize="small" />
                Business Category
              </li>
              <li>
                <CloseIcon fontSize="small" /> Business Photo Upload
              </li>
              <li>
                <CloseIcon fontSize="small" /> Services/ Product Listing
              </li>
              <li>
                <CloseIcon fontSize="small" /> Opening Hours
              </li>
              <li>
                <CloseIcon fontSize="small" /> Website URL
              </li>
              <li>
                <CloseIcon fontSize="small" /> Social Media Profiles
              </li>
              <li>
                <CloseIcon fontSize="small" /> Quick Information
              </li>
              <li>
                <CloseIcon fontSize="small" />
                Detailed Information
              </li>
              <li>
                <CloseIcon fontSize="small" />
                Year of Establishment
              </li>
            </ul>
          </div>
          <button className="cart-btn" onClick={() => openModal("FREE")}>
            Choose Plan
          </button>
        </div>
        <div className="businessPackages-card premium">
          <div className="package-top">
            <div className="businessPackages-card-header">
              <p className="pricing">
                <p className="save-pricing">PREMIUM</p>
              </p>
              <p className="price-desc">
                Everything you need to create your website
              </p>
            </div>
            <div className="businessPackages-card-pricing">
              <div className="package-price">
                ₹1500.00 <span>/mo</span>
              </div>
            </div>
          </div>
          <div className="packages-features">
            <h3>What is included</h3>
            <ul>
              <li>
                <DoneIcon fontSize="small" />
                Visiting Card Upload
              </li>
              <li>
                <DoneIcon fontSize="small" />
                Business Name
              </li>
              <li>
                <DoneIcon fontSize="small" /> Business Contact
              </li>
              <li>
                <DoneIcon fontSize="small" /> Business Email Id
              </li>
              <li>
                <DoneIcon fontSize="small" /> Busines Address
              </li>
              <li>
                <DoneIcon fontSize="small" /> Business Photo Upload
              </li>
              <li>
                <DoneIcon fontSize="small" /> Services/ Product Listing
              </li>
              <li>
                <DoneIcon fontSize="small" /> Opening Hours
              </li>
              <li>
                <DoneIcon fontSize="small" /> Website URL
              </li>
              <li>
                <DoneIcon fontSize="small" /> Social Media Profiles
              </li>
              <li>
                <DoneIcon fontSize="small" /> Quick Information
              </li>
              <li>
                <DoneIcon fontSize="small" />
                Detailed Information
              </li>
              <li>
                <DoneIcon fontSize="small" />
                Year of Establishment
              </li>
              <li>
                <DoneIcon fontSize="small" />
                Business Category
              </li>
            </ul>
          </div>
          <button className="cart-btn" onClick={() => openModal("PREMIUM")}>
            Choose Plan
          </button>
        </div>
        <div className="businessPackages-card">
          <div className="package-top">
            <div className="businessPackages-card-header">
              <p className="pricing">
                <p className="save-pricing">Elite</p>
              </p>
              <p className="price-desc">
                Everything you need to create your website
              </p>
            </div>
            <div className="businessPackages-card-pricing">
              <div className="package-price">
                ₹1000.00 <span>/mo</span>
              </div>
            </div>
          </div>
          <div className="packages-features">
            <h3>What is included</h3>
            <ul>
              <li>
                <DoneIcon fontSize="small" />
                Visiting Card Upload
              </li>
              <li>
                <DoneIcon fontSize="small" />
                Business Name
              </li>
              <li>
                <DoneIcon fontSize="small" /> Business Contact
              </li>
              <li>
                <DoneIcon fontSize="small" /> Business Email Id
              </li>
              <li>
                <DoneIcon fontSize="small" /> Busines Address
              </li>
              <li>
                <DoneIcon fontSize="small" />
                Business Category
              </li>
              <li>
                <DoneIcon fontSize="small" /> Business Photo Upload
              </li>
              <li>
                <DoneIcon fontSize="small" /> Services/ Product Listing
              </li>
              <li>
                <DoneIcon fontSize="small" /> Opening Hours
              </li>
              <li>
                <DoneIcon fontSize="small" /> Quick Information
              </li>
              <li>
                <CloseIcon fontSize="small" /> Website URL
              </li>
              <li>
                <CloseIcon fontSize="small" /> Social Media Profiles
              </li>
              <li>
                <CloseIcon fontSize="small" />
                Detailed Information
              </li>
              <li>
                <CloseIcon fontSize="small" />
                Year of Establishment
              </li>
            </ul>
          </div>
          <button className="cart-btn" onClick={() => openModal("ELITE")}>
            Choose Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default BusinessPackeages;
