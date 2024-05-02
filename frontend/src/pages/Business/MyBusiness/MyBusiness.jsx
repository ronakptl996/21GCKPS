import React, { useEffect, useState } from "react";
import "./MyBusiness.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../../../features/auth/authSlice";
import HeroSectionHeader from "../../../components/HeroSectionHeader/HeroSectionHeader";
import BusinessTable from "../../../components/Admin/BusinessTable";

const MyBusiness = () => {
  const [approvedBusinessData, setApprovedBusinessData] = useState([]);
  const [noApprovedBusinessData, setNotApprovedBusinessData] = useState([]);
  const [expiredBusinessData, setExpiredBusinessData] = useState([]);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/users/my-business");

      if (response.ok) {
        const result = await response.json();

        if (result && result.success) {
          setApprovedBusinessData(result.data.approved);
          setNotApprovedBusinessData(result.data.notApproved);
          setExpiredBusinessData(result.data.expired);
        }
      } else {
        toast.error("Unable to get business data");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // ^ Edit Business details handler
  const handleEdit = async (modalForm, hour) => {
    modalForm.openingHours = `${hour.open} ${hour.openMeridiem} to ${hour.close} ${hour.closeMeridiem}`;

    try {
      dispatch(setLoading(true));
      const response = await fetch("/api/users/my-business/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalForm),
      });

      if (response.ok) {
        const result = await response.json();

        if (result && result.success) {
          toast.success(result.message);
          fetchData();
        }
      } else {
        toast.error("Unable to update business details");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <HeroSectionHeader
        heading="My Business"
        paragraph="Know about your business"
      />
      <div className="myBusiness">
        {approvedBusinessData && approvedBusinessData.length > 0 && (
          <BusinessTable
            data={approvedBusinessData}
            header="Approved Business"
            handleEdit={(data, hour) => handleEdit(data, hour)}
          />
        )}

        {expiredBusinessData && expiredBusinessData.length > 0 && (
          <BusinessTable data={expiredBusinessData} header="Expired Business" />
        )}

        {noApprovedBusinessData && noApprovedBusinessData.length > 0 && (
          <BusinessTable
            data={noApprovedBusinessData}
            header="Unapproved Business"
          />
        )}
      </div>
    </section>
  );
};

export default MyBusiness;
