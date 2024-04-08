import React from "react";
import "./VillageWiseFamilyDetails.css";
import { Link } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import GroupsIcon from "@mui/icons-material/Groups";

const villageWiseFamilyDetails = () => {
  return (
    <section className="villageWiseFamilyDetails">
      <div className="villageWiseFamilyDetails-wrapper">
        <div className="villageWiseFamilyDetails-card">
          <div className="villageWiseFamilyDetails-image-wrapper">
            <img src="https://t4.ftcdn.net/jpg/01/42/20/17/360_F_142201762_qMCuIAolgpz4NbF5T5m66KQJzYzrEbUv.webp" />
          </div>
          <div className="villageWiseFamilyDetails-info">
            <h3 className="headOfFamilyName">Prajapati Kartik Bhikhabhai</h3>
            <div className="villageWiseFamilyDetails-info-contact">
              <div className="villageWiseFamilyDetails-info-contact-wrapper">
                <div className="info-contact-icon">
                  <CallIcon />
                </div>
                <p>+91 8154974580</p>
              </div>
              <div className="villageWiseFamilyDetails-info-contact-wrapper">
                <div className="info-contact-icon">
                  <GroupsIcon />
                </div>
                <p>Total Member (03)</p>
              </div>
            </div>
            <div className="more-info-link">
              <Link to={"1234"}>More Info</Link>
            </div>
          </div>
        </div>
        <div className="villageWiseFamilyDetails-card">
          <div className="villageWiseFamilyDetails-image-wrapper">
            <img src="https://t4.ftcdn.net/jpg/01/42/20/17/360_F_142201762_qMCuIAolgpz4NbF5T5m66KQJzYzrEbUv.webp" />
          </div>
          <div className="villageWiseFamilyDetails-info">
            <h3 className="headOfFamilyName">Prajapati Kartik Bhikhabhai</h3>
            <div className="villageWiseFamilyDetails-info-contact">
              <div className="villageWiseFamilyDetails-info-contact-wrapper">
                <div className="info-contact-icon">
                  <CallIcon />
                </div>
                <p>+91 8154974580</p>
              </div>
              <div className="villageWiseFamilyDetails-info-contact-wrapper">
                <div className="info-contact-icon">
                  <GroupsIcon />
                </div>
                <p>Total Member (03)</p>
              </div>
            </div>
            <div className="more-info-link">
              <Link to={"name=dolatporda"}>More Info</Link>
            </div>
          </div>
        </div>
        <div className="villageWiseFamilyDetails-card">
          <div className="villageWiseFamilyDetails-image-wrapper">
            <img src="https://t4.ftcdn.net/jpg/01/42/20/17/360_F_142201762_qMCuIAolgpz4NbF5T5m66KQJzYzrEbUv.webp" />
          </div>
          <div className="villageWiseFamilyDetails-info">
            <h3 className="headOfFamilyName">Prajapati Kartik Bhikhabhai</h3>
            <div className="villageWiseFamilyDetails-info-contact">
              <div className="villageWiseFamilyDetails-info-contact-wrapper">
                <div className="info-contact-icon">
                  <CallIcon />
                </div>
                <p>+91 8154974580</p>
              </div>
              <div className="villageWiseFamilyDetails-info-contact-wrapper">
                <div className="info-contact-icon">
                  <GroupsIcon />
                </div>
                <p>Total Member (03)</p>
              </div>
            </div>
            <div className="more-info-link">
              <Link to={"name=dolatporda"}>More Info</Link>
            </div>
          </div>
        </div>
        <div className="villageWiseFamilyDetails-card">
          <div className="villageWiseFamilyDetails-image-wrapper">
            <img src="https://t4.ftcdn.net/jpg/01/42/20/17/360_F_142201762_qMCuIAolgpz4NbF5T5m66KQJzYzrEbUv.webp" />
          </div>
          <div className="villageWiseFamilyDetails-info">
            <h3 className="headOfFamilyName">Prajapati Kartik Bhikhabhai</h3>
            <div className="villageWiseFamilyDetails-info-contact">
              <div className="villageWiseFamilyDetails-info-contact-wrapper">
                <div className="info-contact-icon">
                  <CallIcon />
                </div>
                <p>+91 8154974580</p>
              </div>
              <div className="villageWiseFamilyDetails-info-contact-wrapper">
                <div className="info-contact-icon">
                  <GroupsIcon />
                </div>
                <p>Total Member (03)</p>
              </div>
            </div>
            <div className="more-info-link">
              <Link to={"name=dolatporda"}>More Info</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default villageWiseFamilyDetails;