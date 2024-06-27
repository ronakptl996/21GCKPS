import React, { useEffect, useState } from "react";
import "./MyBusiness.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../../../features/auth/authSlice";
import HeroSectionHeader from "../../../components/HeroSectionHeader/HeroSectionHeader";
import BusinessTable from "../../../components/Admin/BusinessTable";
import { validateImageType } from "../../../helper/global";

const MyBusiness = () => {
  const [approvedBusinessData, setApprovedBusinessData] = useState([]);
  const [noApprovedBusinessData, setNotApprovedBusinessData] = useState([]);
  const [expiredBusinessData, setExpiredBusinessData] = useState([]);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/business/my-business`, {
        credentials: "include",
      });

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
      const response = await fetch(`/api/business/my-business/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalForm),
        credentials: "include",
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

  // Change Business Logo, Visiting Card Image
  const changeBusinessImage = async (file, changedImageFor, businessId) => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    // Validate image type
    if (!validateImageType(file)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
      );
      return;
    }

    if (!changedImageFor || !businessId) {
      toast.error("changedImageFor or businessId is required!");
      return;
    }

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("changedImageFor", changedImageFor);
      formData.append("businessId", businessId);

      const response = await fetch(`/api/business/my-business/update-image`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();

        if (result && result.success) {
          toast.success(result.message);
        }
      } else {
        toast.error("Unable to update business image");
      }
    } catch (error) {
      toast.error("Something went wrong");
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
            changeBusinessImage={(file, changedImageFor, businessId) => {
              changeBusinessImage(file, changedImageFor, businessId);
            }}
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
