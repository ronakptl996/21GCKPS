import React from "react";
import { Button } from "@mui/material";
import user from "../../assets/images/young-boy2.jpg";
import "./index.css";
import ImageCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Carousel = ({ data, heading, committee }) => {
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

  return (
    <div className="carousel-wrapper">
      <ImageCarousel
        responsive={responsive}
        // showDots
        // dotListClass="custom-dot-list-style"
      >
        {data &&
          data.map((d, index) => (
            <div key={index}>
              <div className="carousel-card">
                <div>
                  <h2>Village Name {index + 1}</h2>
                  <p className="total-family">Total Family(10)</p>
                  <div className="carousel-comeeti-details">
                    <div className="carousel-comeeti-gender">
                      <h4>Male (100)</h4>
                      <h4>Female (100)</h4>
                      <h4>Infinant (100)</h4>
                    </div>
                    <div>
                      <button className="carousel-comeeti-btn">
                        Know More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </ImageCarousel>
    </div>
  );
};

export default Carousel;
