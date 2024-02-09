import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import "./PaymentSuccess.css";
import { Button } from "@mui/material";

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetchDonorByPaymentId = async () => {
    try {
      const response = await fetch(
        `/api/donor/${searchParams.get("reference")}`
      );
      const data = await response.json();
      console.log(data);

      if (data.success) {
        setPaymentData(data.data);
      } else {
        toast.error("Data not found!");
        navigate("/donation");
      }
    } catch (error) {
      toast.error("Data not found!");
      navigate("/donation");
    }
  };

  useEffect(() => {
    fetchDonorByPaymentId();
  }, []);
  return (
    <section className="donation-successfull-wrapper">
      <div className="donation-successfull">
        <div className="donation-successfull-card">
          <div className="card-wrapper">
            <p className="success-msg">
              <FavoriteIcon /> Thank You for the Contribution
            </p>
            <ul>
              <li>
                <b>Donor Name:</b> {paymentData.donorName}
              </li>
              <li>
                <b>Donor Email:</b> {paymentData.donorEmail}
              </li>
              <li>
                <b>Donate Name:</b> {paymentData.donateName}
              </li>
              <li>
                <b>Donate Amount:</b> {paymentData.amount}
              </li>
              <li>
                <b>Total Qty:</b> {paymentData.donateQty}
              </li>
              <li>
                <b>Payment Id:</b> {paymentData.paymentId}
              </li>
            </ul>

            <p className="email-msg">
              <AttachEmailIcon /> A Receipt Was Sent To Your Email
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
