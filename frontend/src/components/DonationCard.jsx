import React from "react";
import { Link } from "react-router-dom";

const DonationCard = ({ donation }) => {
  return (
    <div className="donation-card">
      <div className="donation-img-section">
        <img
          className="donation-img"
          src={`${import.meta.env.VITE_BACKEND_URL}${donation?.image}`}
        />
      </div>
      <div className="donation-info">
        <h4>{donation?.name}</h4>
        <p>
          Total Qty: <span>{donation?.totalQty}</span>
        </p>
        <Link to={donation?._id}>
          <button>More Info</button>
        </Link>
      </div>
    </div>
  );
};

export default DonationCard;
