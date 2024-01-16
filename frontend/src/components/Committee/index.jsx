import React from "react";
import "./index.css";
import HeroSectionHeader from "../HeroSectionHeader/HeroSectionHeader";
import CommitteeTable from "../CommitteeTable";

const Committee = ({ header }) => {
  return (
    <section className="">
      <HeroSectionHeader heading={header} />
      <section className="committee-wrapper">
        <div className="committee-card-wrapper">
          <CommitteeTable />
          {/* <div className="committee-card">
            <div className="committee-user-img">
              <img src={UserDemo} alt="" />
            </div>
            <div className="committe-user-details">
              <Button
                style={{ background: "rgb(167, 115, 43)", color: "#fff" }}
              >
                Contact
              </Button>
            </div>
          </div>
          <div className="committee-card">
            <div className="committee-user-img">
              <img src={UserDemo} alt="" />
            </div>
            <div className="committe-user-details">
              <Button
                style={{ background: "rgb(167, 115, 43)", color: "#fff" }}
              >
                Contact
              </Button>
            </div>
          </div>
          <div className="committee-card">
            <div className="committee-user-img">
              <img src={UserDemo} alt="" />
            </div>
            <div className="committe-user-details">
              <Button
                style={{ background: "rgb(167, 115, 43)", color: "#fff" }}
              >
                Contact
              </Button>
            </div>
          </div> */}
        </div>
      </section>
    </section>
  );
};

export default Committee;
