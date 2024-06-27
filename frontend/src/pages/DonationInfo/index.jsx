import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

const DonationInfo = () => {
  const [donationData, setDonationData] = useState();
  const [donateQty, setDonateQty] = useState(1);
  const [donationLoading, setDonationLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDonationId = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/donation/${id}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setDonationData(data.data);
      } else {
        toast.error("Data not found!");
        navigate("/donation");
      }
    } catch (error) {
      toast.error("Data not found!");
      navigate("/donation");
    }
  };

  const handleDonate = async () => {
    try {
      setDonationLoading(true);
      const amount = (donationData?.price / donationData?.totalQty) * donateQty;
      // const data = { amount: amount };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/donation/payment/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            donationId: id,
            amount,
            donateQty,
            donationName: donationData?.name,
          }),
        }
      );

      const data = await response.json();
      setDonationLoading(false);

      console.log("RES >>", data);
      if (data.success) {
        // const { data } = data;
        const options = {
          key: import.meta.env.VITE_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
          amount: data.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "21GCKPS",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: data.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: `http://localhost:8000/api/donation/payment/verifyPayment/${donationData._id}/${donateQty}`,
          prefill: {
            name: data.data.userName,
            email: data.data.userEmail,
            contact: data.data.userContact,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      }
    } catch (error) {
      setDonationLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchDonationId();
  }, []);
  return (
    <section className="donation-info">
      <div className="donation-info-inner">
        <div className="donation-info-img">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${donationData?.image}`}
            alt={donationData?.name}
          />
        </div>
        <div className="donation-info-details">
          <div className="donation-details">
            <h3>{donationData?.name}</h3>
            <p className="price">
              Total Price: ₹{donationData?.price.toFixed(2)}
            </p>
            <p>Total Qty. {donationData?.totalQty} required</p>
            <div className="donation-details-overview">
              <h5>Overview</h5>
              <p className="donation-description">
                {donationData?.description}
              </p>

              <div className="donate-qty-btn">
                <div>
                  <p>Donate Qty.</p>
                  <div className="donation-qty">
                    <button
                      onClick={() => {
                        if (donateQty >= 2) {
                          setDonateQty(donateQty - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <span>{donateQty}</span>
                    <button
                      onClick={() => {
                        if (donateQty <= donationData?.totalQty - 1) {
                          setDonateQty(donateQty + 1);
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p>Donate Price:</p>
                  <h3 className="donate-price">
                    ₹
                    {(
                      (donationData?.price / donationData?.totalQty) *
                      donateQty
                    ).toFixed(2)}
                  </h3>
                </div>
              </div>

              <div className="donation-btn">
                {
                  <Button
                    disabled={
                      (
                        (donationData?.price / donationData?.totalQty) *
                        donateQty
                      ).toFixed(2) < 1
                    }
                    onClick={handleDonate}
                    variant="contained"
                  >
                    {donationLoading && <CircularProgress size={20} />}
                    Donate Now
                  </Button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationInfo;
