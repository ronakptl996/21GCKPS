import React, { useEffect } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import { fetchLoggedInUserDetails } from "../../features/auth/authSlice";
import { contactValidationSchema } from "../../schemas";
import { toast } from "react-toastify";

const Contact = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    mobile: "",
    email: "",
    message: "",
  };

  const { errors, values, handleBlur, handleSubmit, handleChange, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: contactValidationSchema,
      onSubmit: async (values, { resetForm }) => {
        console.log("values >>", values);
        await submitForm(values, resetForm);
      },
    });

  const submitForm = async (data, resetForm) => {
    try {
      const result = await fetch("/api/help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await result.json();
      if (result.ok && response.success) {
        toast.success(response.message);
        resetForm();
      } else if (response.statusCode === 404 || !response.success) {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

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
                label="Fullname *"
                variant="outlined"
                fullWidth
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.name && Boolean(errors?.name)}
                helperText={touched?.name && errors?.name}
              />
            </div>
            <div className="input-wrapper">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Email * (Head of family)"
                    type="email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.email && Boolean(errors?.email)}
                    helperText={touched?.email && errors?.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Phone No. * (Head of family)"
                    variant="outlined"
                    type="number"
                    fullWidth
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.mobile && Boolean(errors?.mobile)}
                    helperText={touched?.mobile && errors?.mobile}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="input-wrapper">
              <TextField
                id="outlined-basic"
                label="Message *"
                type="text"
                variant="outlined"
                fullWidth
                multiline
                minRows={2}
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.message && Boolean(errors?.message)}
                helperText={touched?.message && errors?.message}
              />
            </div>
            <Button
              onClick={handleSubmit}
              fullWidth
              style={{ background: "#a7732b", marginTop: "10px" }}
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
