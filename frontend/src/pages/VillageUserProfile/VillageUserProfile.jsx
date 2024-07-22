import React, { useEffect, useState } from "react";
import "./VillageUserProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DefaultImage from "../../assets/default-avatar.jpg";
import Swal from "sweetalert2";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import CakeIcon from "@mui/icons-material/Cake";
import { formattedDate } from "../../helper/global";
import { Button } from "@mui/material";

const VillageUserProfile = () => {
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

  const { id, villageName } = useParams();
  const navigate = useNavigate();

  const { loggedInUserDetails } = useSelector((store) => store.auth);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile/${id}`,
        {
          credentials: "include",
        }
      );

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
      navigate(`/village/${villageName}`);
    }
  };

  const handleUserDelete = async () => {
    const result = await Swal.fire({
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
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/delete-user`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ userId: id }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            toast.success(data.message);
            navigate(`/village/${villageName}`);
          } else {
            toast.error(data.message);
          }
        }
      } catch (error) {
        console.log({ error });
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <section className="villageUserProfile-wrapper">
      {loggedInUserDetails &&
        loggedInUserDetails.decoded.isAdmin === "true" && (
          <section className="villageProfile-header-btn">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleUserDelete}
            >
              Delete
            </Button>
          </section>
        )}
      {headOfFamily && (
        <section className="userProfile">
          <h2 className="profile-header">Head of Family</h2>
          <div className="userInfo-wrapper">
            <div className="userAvatar">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL_PROFILE}/${
                  headOfFamily.headOfFamilyAvatar
                }`}
                alt={headOfFamily.firstname}
              />
            </div>
            <div className="userInfo">
              <h3>
                {headOfFamily.surname} {headOfFamily.firstname}{" "}
                {headOfFamily.secondname}
              </h3>
              <ul>
                {headOfFamily.address && (
                  <li>
                    <HomeIcon fontSize="small" />
                    <p className="village">{headOfFamily.address}</p>
                  </li>
                )}
                {headOfFamily.email && (
                  <li>
                    <EmailIcon fontSize="small" />
                    <p>{headOfFamily.email}</p>
                  </li>
                )}
                {headOfFamily.contact && (
                  <li>
                    <CallIcon fontSize="small" />
                    <p>{headOfFamily.contact}</p>
                  </li>
                )}
                {headOfFamily.proffession && (
                  <li>
                    <BadgeIcon fontSize="small" />
                    <p>{headOfFamily.proffession}</p>
                  </li>
                )}
                {headOfFamily.education && (
                  <li>
                    <SchoolIcon fontSize="small" />
                    <p>{headOfFamily.education}</p>
                  </li>
                )}
                {headOfFamily.bloodGroup && (
                  <li>
                    <BloodtypeIcon fontSize="small" />
                    <p>{headOfFamily.bloodGroup}</p>
                  </li>
                )}
                {headOfFamily.dob && (
                  <li>
                    <CakeIcon fontSize="small" />
                    <p>{formattedDate(headOfFamily.dob)}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>
      )}
      {wifeDetails && (
        <section className="userProfile">
          <h2 className="profile-header">Wife Details</h2>
          <div className="userInfo-wrapper">
            <div className="userAvatar">
              {wifeDetails.wifeAvatar ? (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL_PROFILE}/${
                    wifeDetails.wifeAvatar
                  }`}
                  alt={wifeDetails.firstname}
                />
              ) : (
                <img src={DefaultImage} alt="Default Image" />
              )}
            </div>
            <div className="userInfo">
              <h3>
                {wifeDetails.surname} {wifeDetails.firstname}{" "}
                {wifeDetails.secondname}
              </h3>
              <ul>
                {wifeDetails?.education && (
                  <li>
                    <SchoolIcon fontSize="small" />
                    <p>{wifeDetails?.education}</p>
                  </li>
                )}
                {wifeDetails.proffession && (
                  <li>
                    <BadgeIcon fontSize="small" />
                    <p>{wifeDetails.proffession}</p>
                  </li>
                )}
                {wifeDetails.contact && (
                  <li>
                    <CallIcon fontSize="small" />
                    <p>{wifeDetails.contact}</p>
                  </li>
                )}
                {wifeDetails.bloodGroup && (
                  <li>
                    <BloodtypeIcon fontSize="small" />
                    <p>{wifeDetails.bloodGroup}</p>
                  </li>
                )}
                {wifeDetails.dob && (
                  <li>
                    <CakeIcon fontSize="small" />
                    <p>{formattedDate(wifeDetails.dob)}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>
      )}
      {sonDetails?.length > 0 && sonDetails?.[0].firstname !== "" && (
        <section className="userProfile">
          <h2 className="profile-header">Son Details</h2>
          {sonDetails.map((son) => (
            <div className="userInfo-wrapper" key={son._id}>
              <div className="userAvatar">
                {son.sonAvatar ? (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL_PROFILE}/${
                      son.sonAvatar
                    }`}
                    alt={son.firstname}
                  />
                ) : (
                  <img src={DefaultImage} alt="Default Image" />
                )}
              </div>
              <div className="userInfo">
                <h3>
                  {son.surname} {son.firstname} {son.secondname}
                </h3>
                <ul>
                  {son?.education && (
                    <li>
                      <SchoolIcon fontSize="small" />
                      <p>{son?.education}</p>
                    </li>
                  )}
                  {son?.proffession && (
                    <li>
                      <BadgeIcon fontSize="small" />
                      <p>{son?.proffession}</p>
                    </li>
                  )}
                  {son?.contact && (
                    <li>
                      <CallIcon fontSize="small" />
                      <p>{son?.contact}</p>
                    </li>
                  )}
                  {son?.bloodGroup && (
                    <li>
                      <BloodtypeIcon fontSize="small" />
                      <p>{son?.bloodGroup}</p>
                    </li>
                  )}
                  {son?.dob && (
                    <li>
                      <CakeIcon fontSize="small" />
                      <p>{formattedDate(son?.dob)}</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </section>
      )}

      {daughterDetails?.length > 0 && daughterDetails?.[0].firstname !== "" && (
        <section className="userProfile">
          <h2 className="profile-header">Daughter Details</h2>
          {daughterDetails.map((daughter) => (
            <div className="userInfo-wrapper" key={daughter._id}>
              <div className="userAvatar">
                {daughter.daughterAvatar ? (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL_PROFILE}/${
                      daughter.daughterAvatar
                    }`}
                    alt={daughter.firstname}
                  />
                ) : (
                  <img src={DefaultImage} alt="Default Image" />
                )}
              </div>
              <div className="userInfo">
                <h3>
                  {daughter.surname} {daughter.firstname} {daughter.secondname}
                </h3>
                <ul>
                  {daughter?.education && (
                    <li>
                      <SchoolIcon fontSize="small" />
                      <p>{daughter?.education}</p>
                    </li>
                  )}
                  {daughter?.proffession && (
                    <li>
                      <BadgeIcon fontSize="small" />
                      <p>{daughter?.proffession}</p>
                    </li>
                  )}
                  {daughter?.contact && (
                    <li>
                      <CallIcon fontSize="small" />
                      <p>{daughter?.contact}</p>
                    </li>
                  )}
                  {daughter?.bloodGroup && (
                    <li>
                      <BloodtypeIcon fontSize="small" />
                      <p>{daughter?.bloodGroup}</p>
                    </li>
                  )}
                  {daughter?.dob && (
                    <li>
                      <CakeIcon fontSize="small" />
                      <p>{formattedDate(daughter?.dob)}</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
};

export default VillageUserProfile;
