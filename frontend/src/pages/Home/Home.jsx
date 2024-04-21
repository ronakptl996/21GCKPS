import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import Carousel from "../../components/Carousel";
import { fetchLoggedInUserDetails } from "../../features/auth/authSlice";
import CommitteeTable from "../../components/CommitteeTable";
import VillageWiseCommitteeMemberDetails from "../../components/VillageCommitteeMember";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <>
      <section className="home">
        <div className="home-hero-section">
          <div className="home-hero-section-inner">
            <h1>21 Gam Charotar Kadva Patidar Samaj</h1>
            <p>
              Gone are the days when users were paying hefty fees to mobile
              service providers to send text messages. Users today require
              unlimited free texts. SendaText is world's firsts steps platform
              that enables free texting to all carriers.
            </p>
            <div className="home-hero-button">
              <Link to="/matrimonial">
                <button>Matrimonial</button>
              </Link>
              <Link to="/business">
                <button>Business</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel">
          {/* Village Carousel */}
          <Carousel />
        </div>

        {/* Village wise comeeti members Details */}
        <VillageWiseCommitteeMemberDetails />

        {/* Yuvak Mandal */}
        <div className="yuvak-mandal-wrapper">
          <div className="village-wise-comeeti-members-header">
            <h2>Yuvak Mandal</h2>
            <div className="header-bottom">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="home-section-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              architecto rerum excepturi veritatis, corporis nostrum perferendis
            </p>
          </div>
          <div className="yuvak-mandal-table">
            <CommitteeTable />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
