import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import ImageCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Carousel = ({ data, heading, committee }) => {
  const [villageWiseData, setVillageWiseData] = useState([]);
  const navigate = useNavigate();

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

  const fetchVillageData = async () => {
    try {
      const response = await fetch("/api/users/village");
      const data = await response.json();

      if (data && data.success) {
        setVillageWiseData(data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchVillageData();
  }, []);

  return (
    <div className="carousel-wrapper">
      <ImageCarousel responsive={responsive}>
        {villageWiseData &&
          villageWiseData.map((data) => (
            <div key={data.villageName}>
              <div className="carousel-card">
                <div>
                  <h2>{data.villageName.toUpperCase()}</h2>
                  <p className="total-family">
                    Total Family ({data.totalFamily})
                  </p>
                  <div className="carousel-comeeti-details">
                    <div className="carousel-comeeti-gender">
                      <h4>Sons ({data.totalSon})</h4>
                      <h4>Daughters ({data.totalDaughter})</h4>
                    </div>
                    <div>
                      <button
                        className="carousel-comeeti-btn"
                        onClick={() => navigate(`/village/${data.villageName}`)}
                      >
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
