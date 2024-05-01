import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import BusinessTable from "../../../components/Admin/BusinessTable";
import "./AdminBusiness.css";

const AdminBusiness = () => {
  const [approvedBusiness, setApprovedBusiness] = useState([]);
  const [unApprovedBusiness, setUnpprovedBusiness] = useState([]);
  const [approvedExpiredBusiness, setApprovedExpiredBusiness] = useState([]);

  const fetchApprovedData = async () => {
    try {
      const response = await fetch("/api/admin/business/approve");
      if (response.ok) {
        const result = await response.json();
        setApprovedBusiness(result.data);
      } else {
        toast.error("Error fetching approved business data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const fetchApprovedExpiredData = async () => {
    try {
      const response = await fetch("/api/admin/business/expire");
      if (response.ok) {
        const result = await response.json();
        setApprovedExpiredBusiness(result.data);
      } else {
        toast.error("Error fetching approve expire business data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const fetchUnapprovedData = async () => {
    try {
      const response = await fetch("/api/admin/business/unapprove");
      if (response.ok) {
        const result = await response.json();
        setUnpprovedBusiness(result.data);
      } else {
        toast.error("Error fetching unapprove business data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  // ^Delete Business Details
  const handleDelete = async (id, listType) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/admin/business/delete/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const result = await response.json();
          if (result && result.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Business details has been deleted.",
              icon: "success",
            });

            if (listType === "approved") {
              fetchApprovedData();
            } else if (listType === "expired") {
              fetchApprovedExpiredData();
            } else if (listType === "unapproved") {
              fetchUnapprovedData();
            }
          }
        } else {
          toast.error("Error while deleting business details");
        }
      } catch (error) {
        toast.success("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    fetchApprovedData(); // Fetch Approved Data on component mount
    fetchApprovedExpiredData();
    fetchUnapprovedData();
  }, []);

  if (
    approvedBusiness &&
    approvedBusiness.length == 0 &&
    approvedExpiredBusiness &&
    approvedExpiredBusiness.length == 0 &&
    unApprovedBusiness &&
    unApprovedBusiness.length == 0
  ) {
    return <h1>No data found</h1>;
  }

  return (
    <section className="admin-businesses">
      {approvedBusiness && approvedBusiness.length > 0 && (
        <BusinessTable
          data={approvedBusiness}
          header="Approved Business"
          handleDelete={(id) => handleDelete(id, "approved")}
        />
      )}
      {approvedExpiredBusiness && approvedExpiredBusiness.length > 0 && (
        <BusinessTable
          data={approvedExpiredBusiness}
          header="Expired Business"
          handleDelete={(id) => handleDelete(id, "expired")}
        />
      )}
      {unApprovedBusiness && unApprovedBusiness.length > 0 && (
        <BusinessTable
          data={unApprovedBusiness}
          header="Unapproved Business"
          handleDelete={(id) => handleDelete(id, "unapproved")}
        />
      )}
    </section>
  );
};

export default AdminBusiness;
