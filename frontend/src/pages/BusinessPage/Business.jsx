import React from "react";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, TextField } from "@mui/material";
import "./Business.css";

const Business = () => {
  return (
    <section className="business">
      <HeroSectionHeader heading="Business" paragraph="Add Business Details" />
      <div className="business-wrapper">
        <form>
          <div className="business-input-wrapper">
            <TextField
              id="outlined-basic"
              label="Name of Person"
              type="text"
              variant="outlined"
              // value={headOfFamily.email}
              // onChange={(e) =>
              //   setHeadOfFamily((prevState) => ({
              //     ...prevState,
              //     email: e.target.value,
              //   }))
              // }
            />
            <TextField
              id="outlined-basic"
              label="Business Name"
              type="text"
              variant="outlined"
              // value={headOfFamily.email}
              // onChange={(e) =>
              //   setHeadOfFamily((prevState) => ({
              //     ...prevState,
              //     email: e.target.value,
              //   }))
              // }
            />
            <TextField
              id="outlined-basic"
              label="Brief Name of Business"
              type="text"
              variant="outlined"
              // value={headOfFamily.email}
              // onChange={(e) =>
              //   setHeadOfFamily((prevState) => ({
              //     ...prevState,
              //     email: e.target.value,
              //   }))
              // }
            />
          </div>
          <div className="business-input-wrapper">
            <TextField
              id="outlined-basic"
              label="Email Id"
              type="email"
              variant="outlined"
              // value={headOfFamily.email}
              // onChange={(e) =>
              //   setHeadOfFamily((prevState) => ({
              //     ...prevState,
              //     email: e.target.value,
              //   }))
              // }
            />
            <TextField
              id="outlined-basic"
              label="Address"
              type="text"
              variant="outlined"
              // value={headOfFamily.email}
              // onChange={(e) =>
              //   setHeadOfFamily((prevState) => ({
              //     ...prevState,
              //     email: e.target.value,
              //   }))
              // }
            />
            <TextField
              id="outlined-basic"
              label="Contact No."
              type="text"
              variant="outlined"
              // value={headOfFamily.email}
              // onChange={(e) =>
              //   setHeadOfFamily((prevState) => ({
              //     ...prevState,
              //     email: e.target.value,
              //   }))
              // }
            />
          </div>
          <div className="business-input-wrapper">
            <TextField
              id="outlined-basic"
              label="Website"
              type="text"
              variant="outlined"
              // value={headOfFamily.email}
              // onChange={(e) =>
              //   setHeadOfFamily((prevState) => ({
              //     ...prevState,
              //     email: e.target.value,
              //   }))
              // }
            />
            <Button variant="contained" component="label">
              <CloudUploadIcon style={{ marginRight: "5px" }} /> Upload Company
              Photo
              <input
                type="file"
                hidden
                name="avatar"
                // onChange={(e) => setAvatar(e.target.files[0])}
              />
            </Button>
            <Button variant="contained" component="label">
              <CloudUploadIcon style={{ marginRight: "5px" }} /> Upload Business
              Logo
              <input
                type="file"
                hidden
                name="avatar"
                // onChange={(e) => setAvatar(e.target.files[0])}
              />
            </Button>
          </div>
          <div>
            <Button
              // onClick={handleSubmit}
              fullWidth
              style={{ background: "#a7732b", marginTop: "10px" }}
              variant="contained"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Business;
