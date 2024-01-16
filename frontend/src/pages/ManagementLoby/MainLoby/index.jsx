import React from "react";
import { Button } from "@mui/material";
import UserDemo from "../../../assets/user-demo.png";
import "./index.css";

const MainLoby = () => {
  return (
    <section className="mainLoby">
      <h2 className="header">Main Loby</h2>

      <section className="management-details">
        <div className="management-info">
          <h1>Chairman name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            dicta soluta necessitatibus aperiam est. Iusto mollitia natus, nemo
            consequatur sequi deserunt maiores modi.
          </p>
          <Button
            style={{
              border: "1px solid rgb(167, 115, 43)",
              background: "rgb(167, 115, 43)",
              color: "#ffffff",
              width: "fit-content",
            }}
          >
            Contact
          </Button>
        </div>
        <div className="management-img">
          <img src={UserDemo} alt="" />
        </div>
      </section>

      <section className="management-details">
        <div className="management-img">
          <img src={UserDemo} alt="" />
        </div>
        <div className="management-info">
          <h1>Chairman name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            dicta soluta necessitatibus aperiam est. Iusto mollitia natus, nemo
            consequatur sequi deserunt maiores modi.
          </p>
          <Button
            style={{
              border: "1px solid rgb(167, 115, 43)",
              background: "rgb(167, 115, 43)",
              color: "#ffffff",
              width: "fit-content",
            }}
          >
            Contact
          </Button>
        </div>
      </section>
      <div className="committee-mandal">
        <h2>Committee Members</h2>
        <div className="committee-users">
          <div className="committee-users-details">
            <img src={UserDemo} alt="" />
            <div className="committee-users-detail-wrapper">
              <h4>Mandal Member One</h4>
              <p>Position</p>
            </div>
          </div>
          <div className="committee-users-details">
            <img src={UserDemo} alt="" />
            <div className="committee-users-detail-wrapper">
              <h4>Mandal Member One</h4>
              <p>Position</p>
            </div>
          </div>
          <div className="committee-users-details">
            <img src={UserDemo} alt="" />
            <div className="committee-users-detail-wrapper">
              <h4>Mandal Member One</h4>
              <p>Position</p>
            </div>
          </div>
          <div className="committee-users-details">
            <img src={UserDemo} alt="" />
            <div className="committee-users-detail-wrapper">
              <h4>Mandal Member One</h4>
              <p>Position</p>
            </div>
          </div>
          <div className="committee-users-details">
            <img src={UserDemo} alt="" />
            <div className="committee-users-detail-wrapper">
              <h4>Mandal Member One</h4>
              <p>Position</p>
            </div>
          </div>
          <div className="committee-users-details">
            <img src={UserDemo} alt="" />
            <div className="committee-users-detail-wrapper">
              <h4>Mandal Member One</h4>
              <p>Position</p>
            </div>
          </div>
          <div className="committee-users-details">
            <img src={UserDemo} alt="" />
            <div className="committee-users-detail-wrapper">
              <h4>Mandal Member One</h4>
              <p>Position</p>
            </div>
          </div>
          <div className="committee-users-details">
            <img src={UserDemo} alt="" />
            <div className="committee-users-detail-wrapper">
              <h4>Mandal Member One</h4>
              <p>Position</p>
            </div>
          </div>
          <div className="committee-users-details">
            <img src={UserDemo} alt="" />
            <div className="committee-users-detail-wrapper">
              <h4>Mandal Member One</h4>
              <p>Position</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainLoby;
