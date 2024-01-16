import React from "react";
import Slider from "react-slick";
import { Button } from "@mui/material";
import user from "../../assets/images/young-boy2.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const Carousel = ({ data, heading, committee }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
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
      </Slider>
    </div>
  );
};

export default Carousel;
