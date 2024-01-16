import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./index.css";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import DonationCard from "../../components/DonationCard";

const DonationPage = () => {
  const [donationDetails, setDonationDetails] = useState([]);

  const fetchDonationDetails = async () => {
    try {
      const response = await fetch("/api/admin/donation");
      const data = await response.json();
      if (data.success) {
        setDonationDetails(data.data);
      }
    } catch (error) {
      toast.error("Error, while fetching donation details");
    }
  };

  useEffect(() => {
    fetchDonationDetails();
  }, []);
  return (
    <>
      <HeroSectionHeader heading="Donation Required" />
      <section className="donation-page">
        <div className="donation-inner">
          {donationDetails && donationDetails.length ? (
            donationDetails.map((donation) => (
              <div key={donation._id}>
                <DonationCard donation={donation} />
              </div>
            ))
          ) : (
            <h2>No Donation Required</h2>
          )}
          {/* <div className="donation-card">
            <div className="donation-img-section">
              <img
                className="donation-img"
                src="https://i.pinimg.com/originals/8e/ca/bc/8ecabc10954b0f136b2dd5bf509d0ef6.jpg"
              />
            </div>
            <div className="donation-info">
              <h4>Kevin beeftongue</h4>
              <p>
                Total Qty: <span>40</span>
              </p>
              <button>Donate Now</button>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default DonationPage;
