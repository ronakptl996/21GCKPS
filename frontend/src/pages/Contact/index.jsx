import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import "./index.css";
import { fetchLoggedInUserDetails } from "../../features/auth/authSlice";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Contact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUserDetails());
  }, []);
  return (
    <div className="contact">
      <HeroSectionHeader
        heading="Contact Us"
        paragraph="orem ipsum dolor sit amet consectetur adipisicing."
      />
      <div className="contact-info">
        <div className="contact-info-wrapper">
          <div className="contact-info-address">
            <h3>Reach Us</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
              harum,
            </p>
          </div>
          <div className="contact-info-address">
            <h3>Address</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
              quo fuga distinctio veniam
            </p>
          </div>
          <div className="contact-info-address">
            <h3>Phone</h3>
            <p>+91 1234567890</p>
          </div>
          <div className="contact-info-address">
            <h3>Email</h3>
            <p>info@mail.com</p>
          </div>
          <div className="contact-info-address">
            <h3>Opening Hours</h3>
            <ul>
              <li>Mon-Sat - 09:30-07:00</li>
              <li>Sun - On Call</li>
            </ul>
          </div>
        </div>
        <div className="contact-info-wrapper contact-form-wrapper">
          <div className="contact-form-header">
            <h2>Drop Us a message</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque,
              maiores!
            </p>
          </div>
          <form>
            <div className="input-wrapper">
              <TextField
                id="outlined-basic"
                label="Fullname"
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
            <div className="input-wrapper">
              <TextField
                id="outlined-basic"
                label="Phone No."
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
            <div className="input-wrapper">
              <TextField
                id="outlined-basic"
                label="Email"
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
            <div className="input-wrapper">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Choose your DOB"
                  // value={headOfFamily.dob} // Set the value prop to the 'dob' property in your state
                  // onChange={handleDateChange} // Pass the handleDateChange function
                  // renderInput={(params) => (
                  //   <TextField {...params} variant="outlined" />
                  // )}
                />
              </LocalizationProvider>
            </div>
            <Button
              // onClick={handleSubmit}
              fullWidth
              style={{ background: "#a7732b", marginTop: "10px" }}
              variant="contained"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
