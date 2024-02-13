import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "./index.css";
import Carousel from "../../components/Carousel";
import Userdemo from "../../assets/images/young-boy3.avif";
import Village1 from "../../assets/images/village.jpg";
import { fetchLoggedInUserDetails } from "../../features/auth/authSlice";
import CommitteeTable from "../../components/CommitteeTable";
import { Link } from "react-router-dom";
import ImageCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const villages = [
    {
      name: `John Morgan`,
      img: Village1,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Ellie Anderson`,
      img: `/students/Ellie_Anderson.jpg`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Nia Adebayo`,
      img: `/students/Nia_Adebayo.jpg`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Rigo Louie`,
      img: `/students/Rigo_Louie.jpg`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Mia Williams`,
      img: `/students/Mia_Williams.jpg`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
  ];

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
          <Carousel
            data={villages}
            heading="21 Gam Charotar Kadva Patidar Samaj"
          />
        </div>

        {/* Village wise comeeti members */}
        <div className="village-wise-comeeti-members">
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
            {/* <Slider {...settings}>
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
            </Slider> */}
            <ImageCarousel
              responsive={responsive}
              // showDots
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
        </div>

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
