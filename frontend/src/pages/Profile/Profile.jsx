import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";

const Profile = () => {
  const [profile, setProfile] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/profile/${id}`);
      const data = await response.json();
      if (data.success) {
        setProfile(data.data);
      }
    } catch (error) {
      toast.error("Error, while fetching User Details");
      navigate("/home");
    }
  };

  useEffect(() => {
    // fetchProfile();
  }, []);
  return (
    <section className="profile">
      <div className="profile-inner">
        <div className="headOfFamily-details">
          <h3>Head Of Family</h3>
          <div className="register-input-wrapper">
            <TextField
              id="outlined-basic"
              label="Surname"
              variant="outlined"
              // value={headOfFamily.surname}
              // onChange={(e) =>
              //   setHeadOfFamily((prevState) => ({
              //     ...prevState,
              //     surname: e.target.value,
              //   }))
              // }
            />
            <TextField
              id="outlined-basic"
              label="Firstname"
              variant="outlined"
              // value={headOfFamily.firstname}
              // onChange={(e) =>
              //   setHeadOfFamily((prevState) => ({
              //     ...prevState,
              //     firstname: e.target.value,
              //   }))
              // }
            />
            <TextField
              id="outlined-basic"
              label="Secondname"
              variant="outlined"
              // value={headOfFamily.secondname}
              // onChange={(e) =>
              //   setHeadOfFamily((prevState) => ({
              //     ...prevState,
              //     secondname: e.target.value,
              //   }))
              // }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
