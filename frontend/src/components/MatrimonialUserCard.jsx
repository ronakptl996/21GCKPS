import React from "react";
import { Link } from "react-router-dom";
import { dobFormat } from "../helper/global";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button } from "@mui/material";

const MatrimonialUserCard = ({ user }) => {
  return (
    <div className="search-user-box-wrapper" key={user._id}>
      <div className="search-box-img">
        <img src={user.photo} alt={user.fullName} />
      </div>
      <div className="search-box-description">
        <div className="search-user-username-button-wrapper">
          <h3 className="search-userName">{user.fullName}</h3>
          <Link to={user._id}>
            <Button
              className="viewFullProfileBtn"
              size="small"
              variant="contained"
            >
              View full profile
            </Button>
          </Link>
        </div>
        <div className="search-user-more-info">
          <div className="user-info">{user.education}</div>
          <div className="user-info">{user.profession}</div>
          <div className="user-info">{user.interest[0]}</div>
          <div className="user-info">{dobFormat(user.dob)} Years Old</div>
        </div>
        <div className="search-user-social">
          <div className="social-info">
            <div className="icons">
              <InstagramIcon />
            </div>
            <p>{user.instagramUserName ? user.instagramUserName : "-"}</p>
          </div>
          <div className="social-info">
            <div className="icons">
              <FacebookOutlinedIcon />
            </div>{" "}
            <p>{user.instagramUserName ? user.instagramUserName : "-"} </p>
          </div>
          <div className="social-info">
            <div className="icons">
              <WhatsAppIcon />
            </div>{" "}
            <p>{user.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrimonialUserCard;
