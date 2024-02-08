import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailMatrimonialProfile.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookOutlined from "@mui/icons-material/FacebookOutlined";
import Instagram from "@mui/icons-material/Instagram";
import WhatsApp from "@mui/icons-material/WhatsApp";
import CityImage from "../../../assets/images/Matrimonial/pro-city.png";
import AgeImage from "../../../assets/images/Matrimonial/pro-age.png";
import EducationImage from "../../../assets/images/Matrimonial/education.png";
import JobImage from "../../../assets/images/Matrimonial/job.png";
import { dobFormat, indiaTimeFormat } from "../../../helper/global.js";

const DetailMatrimonialProfile = () => {
  const [user, setUser] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

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
      {user && (
        <section className="DetailMatrimonialProfile-inner">
          <div className="DetailMatrimonialProfile-user-img-wrapper">
          <div className="user-profile-image">
            <img src={user?.photo} alt={user?.fullName} srcset="" />
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
                <h1>{user?.fullName}</h1>
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
                    <p>
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
