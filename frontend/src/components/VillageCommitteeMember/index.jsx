import React, { useState, useEffect } from "react";
import ImageCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UserDemo from "../../assets/images/young-boy3.avif";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VillageWiseCommitteeMemberDetails = () => {
  const [committeeMemberData, setCommitteeMemberData] = useState([]);
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

  const fetchData = async () => {
    try {
      const response = await fetch("/api/users/committe-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (data && data.success) {
        setCommitteeMemberData(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching committee data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
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
        <ImageCarousel responsive={responsive} showDots>
          {committeeMemberData &&
            committeeMemberData.length > 0 &&
            committeeMemberData.map((data) => (
              <div key={data.village}>
                <div className="carousel-card">
                  <div>
                    <h2>{data.village.toUpperCase()}</h2>
                    <div className="carousel-comeeti-gender">
                      <h4>Committe Members ({data.totalCommitteeMembers})</h4>
                    </div>
                    <div className="carousel-comeeti-details">
                      <button
                        className="carousel-comeeti-btn"
                        onClick={() => navigate(`/village/${data.village}`)}
                      >
                        Know More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </ImageCarousel>
      </div>
    </div>
  );
};

export default VillageWiseCommitteeMemberDetails;
