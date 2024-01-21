import React, { useState } from "react";
import "./BusinessPackages.css";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const BusinessPackeages = () => {
  // Edit Modal useState
  const [openFree, setOpenFree] = useState(false);
  const [modalForm, setModalForm] = useState({
    nameOfPerson: "",
    businessName: "",
    emailId: "",
    businessAddress: "",
    contact: "",
    businessCategory: "Choose Business Category",
    createdBy: "",
  });
  return (
    <section className="businessPackages">
      {/* Dialog Form */}
      <Dialog fullWidth open={openFree} onClose={() => setOpenFree(false)}>
        <DialogTitle style={{ fontWeight: "600" }}>
          Create Your Free Business Listing
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name of Person"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                nameOfPerson: e.target.value,
              }));
            }}
            value={modalForm.nameOfPerson}
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
                  contact: e.target.value,
                }));
              }}
              value={modalForm.businessAddress}
            />
            <TextField
              margin="dense"
              label="Email Id"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  emailId: e.target.value,
                }));
              }}
              value={modalForm.businessAddress}
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
          {modalForm.businessCategory === "Other" && (
            <TextField
              margin="dense"
              label="Type Your Business Category"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  businessCategory: e.target.value,
                }));
              }}
              value={modalForm.businessAddress}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFree(false)}>Cancel</Button>
          <Button variant="contained">Submit</Button>
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
                <CloseIcon fontSize="small" />
                Business Name
              </li>
              <li>
                <CloseIcon fontSize="small" /> Business Contact
              </li>
              <li>
                <CloseIcon fontSize="small" /> Business Email Id
              </li>
              <li>
                <CloseIcon fontSize="small" /> Busines Address
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
                <CloseIcon fontSize="small" /> GSTIN
              </li>
              <li>
                <CloseIcon fontSize="small" /> WhatsApp
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
              <li>
                <CloseIcon fontSize="small" />
                Business Category
              </li>
            </ul>
          </div>
          <button className="cart-btn" onClick={() => setOpenFree(true)}>
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
                <CloseIcon fontSize="small" />
                Business Name
              </li>
              <li>
                <CloseIcon fontSize="small" /> Business Contact
              </li>
              <li>
                <CloseIcon fontSize="small" /> Business Email Id
              </li>
              <li>
                <CloseIcon fontSize="small" /> Busines Address
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
                <CloseIcon fontSize="small" /> GSTIN
              </li>
              <li>
                <CloseIcon fontSize="small" /> WhatsApp
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
              <li>
                <CloseIcon fontSize="small" />
                Business Category
              </li>
            </ul>
          </div>
          <button className="cart-btn" onClick={() => setOpenFree(true)}>
            Choose Plan
          </button>
        </div>
        <div className="businessPackages-card">
          <div className="package-top">
            <div className="businessPackages-card-header">
              <p className="pricing">
                <p className="save-pricing">Premier</p>
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
                <CloseIcon fontSize="small" />
                Business Name
              </li>
              <li>
                <CloseIcon fontSize="small" /> Business Contact
              </li>
              <li>
                <CloseIcon fontSize="small" /> Business Email Id
              </li>
              <li>
                <CloseIcon fontSize="small" /> Busines Address
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
                <CloseIcon fontSize="small" /> GSTIN
              </li>
              <li>
                <CloseIcon fontSize="small" /> WhatsApp
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
              <li>
                <CloseIcon fontSize="small" />
                Business Category
              </li>
            </ul>
          </div>
          <button className="cart-btn" onClick={() => setOpenFree(true)}>
            Choose Plan
          </button>
        </div>
        <div className="businessPackages-card">
          <div className="package-top">
            <div className="businessPackages-card-header">
              <p className="pricing">
                <p className="save-pricing">Premier Plus</p>
              </p>
              <p className="price-desc">
                Everything you need to create your website
              </p>
            </div>
            <div className="businessPackages-card-pricing">
              <div className="package-price">
                ₹3000.00 <span>/mo</span>
              </div>
            </div>
          </div>
          <div className="packages-features free-package">
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
                <DoneIcon fontSize="small" /> GSTIN
              </li>
              <li>
                <DoneIcon fontSize="small" /> WhatsApp
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
          <button className="cart-btn" onClick={() => setOpenFree(true)}>
            Choose Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default BusinessPackeages;
