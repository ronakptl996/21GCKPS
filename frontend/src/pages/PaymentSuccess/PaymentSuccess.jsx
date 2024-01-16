import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  return <section>PaymentSuccess</section>;
};

export default PaymentSuccess;
