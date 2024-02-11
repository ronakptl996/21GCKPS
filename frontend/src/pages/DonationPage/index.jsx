import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./index.css";
import HeroSectionHeader from "../../components/HeroSectionHeader/HeroSectionHeader";
import DonationCard from "../../components/DonationCard";
import { Link } from "react-router-dom";

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
        </div>
      </section>
    </>
  );
};

export default DonationPage;
