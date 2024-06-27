import React, { useEffect, useState } from "react";
import HeroSectionHeader from "../../../components/HeroSectionHeader/HeroSectionHeader";
import "./Business.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Business = () => {
  const [businessData, setBusinessData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/business/valid`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setBusinessData(data.data);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="business">
      <HeroSectionHeader
        heading="Business"
        paragraph="Pick any one and known about it."
      />
      <div className="business-wrapper">
        {businessData &&
          businessData.length > 0 &&
          businessData.map((data) => (
            <div className="villageWiseFamilyDetails-card" key={data._id}>
              <div className="villageWiseFamilyDetails-image-wrapper">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL_BUSINESS}/${
                    data.businessLogo
                  }`}
                />
              </div>
              <div className="villageWiseFamilyDetails-info">
                <h3 className="headOfFamilyName businessName">
                  {data.businessName.toUpperCase()}
                </h3>
                <div className="business-info-wrapper">
                  <div className="info-contact-icon"></div>
                  <p>{data.businessOwner}</p>
                </div>
                <div className="business-info-wrapper">
                  <div className="info-contact-icon"></div>
                  <p>{data.packageType}</p>
                </div>
                <div className="more-info-link">
                  <Link to={`${data._id}`}>More Info</Link>
                </div>
              </div>
            </div>
          ))}
        {businessData && businessData.length === 0 && <h2>No Business Data</h2>}
      </div>
    </section>
  );
};

export default Business;
