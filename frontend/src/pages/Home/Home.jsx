import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "./index.css";
import Carousel from "../../components/Carousel";
import { fetchLoggedInUserDetails } from "../../features/auth/authSlice";
import CommitteeTable from "../../components/CommitteeTable";
import VillageWiseCommitteeMemberDetails from "../../components/VillageCommitteeMember";

const Home = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("useEffect HOme");
  //   dispatch(fetchLoggedInUserDetails());
  // }, []);

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
        {/* <div className="village-wise-comeeti-members">
          <div className="village-wise-comeeti-members-header">
            <h2>Village Wise Comeeti Members Details</h2>
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
          <div className="village-wise-comeeti-member-carousel">
            <ImageCarousel
              responsive={responsive}
              showDots
              // dotListClass="custom-dot-list-style"
            >
              {villages &&
                villages.map((d, index) => (
                  <div key={index}>
                    <div className="village-wise-comeeti-carousel-card">
                      <div className="comeeti-carousel-img">
                        <img src={Userdemo} alt="" />
                      </div>
                      <div className="village-wise-comeeti-carousel-info">
                        <h1>Kartik B. Prajapati</h1>
                        <p>Call: +91 1234567890</p>
                        <p>Whatsapp: +91 1234567890</p>
                      </div>
                    </div>
                  </div>
                ))}
            </ImageCarousel>
          </div>
        </div> */}

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
            {/* <table>
            <tr>
              <td>1.</td>
              <td>
                <img src={Userdemo} alt="" />
              </td>
              <td>Patel Kartik Bhikhabhai</td>
              <td>
                37-B GOVERDHAN PARK, near SILVER CITY, Vastral, Ahmedabad,
                Gujarat 382418
              </td>
              <td>
                <p>Call : +91 9898989898</p>
                <p>Whatsapp : +91 98677675498</p>
              </td>
            </tr>
            <tr>
              <td>2.</td>
              <td>
                <img src={Userdemo} alt="" />
              </td>
              <td>Patel Kartik Bhikhabhai</td>
              <td>
                37-B GOVERDHAN PARK, near SILVER CITY, Vastral, Ahmedabad,
                Gujarat 382418
              </td>
              <td>
                <p>Call : +91 9898989898</p>
                <p>Whatsapp : +91 98677675498</p>
              </td>
            </tr>
            <tr>
              <td>3.</td>
              <td>
                <img src={Userdemo} alt="" />
              </td>
              <td>Patel Kartik Bhikhabhai</td>
              <td>
                37-B GOVERDHAN PARK, near SILVER CITY, Vastral, Ahmedabad,
                Gujarat 382418
              </td>
              <td>
                <p>Call : +91 9898989898</p>
                <p>Whatsapp : +91 98677675498</p>
              </td>
            </tr>
          </table> */}
            <CommitteeTable />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
