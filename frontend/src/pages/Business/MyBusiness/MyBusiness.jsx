import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeroSectionHeader from "../../../components/HeroSectionHeader/HeroSectionHeader";
import BusinessTable from "../../../components/Admin/BusinessTable";

const MyBusiness = () => {
  const [approvedBusinessData, setApprovedBusinessData] = useState([]);
  const [noApprovedBusinessData, setNotApprovedBusinessData] = useState([]);
  const [expiredBusinessData, setExpiredBusinessData] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="business">
      <HeroSectionHeader
        heading="My Business"
        paragraph="Know about your business"
      />
      <div className="">
        {approvedBusinessData && approvedBusinessData.length > 0 && (
          <BusinessTable
            data={approvedBusinessData}
            header="Approved Business"
            handleDelete={(id) => handleDelete(id, "approved")}
          />
        )}

        {expiredBusinessData && expiredBusinessData.length > 0 && (
          <BusinessTable
            data={expiredBusinessData}
            header="Expired Business"
            handleDelete={(id) => handleDelete(id, "expired")}
          />
        )}

        {noApprovedBusinessData && noApprovedBusinessData.length > 0 && (
          <BusinessTable
            data={noApprovedBusinessData}
            header="Unapproved Business"
            handleDelete={(id) => handleDelete(id, "unapproved")}
          />
        )}
      </div>
    </section>
  );
};

export default MyBusiness;
