import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "./AdminBusiness.css";
import BusinessTable from "../../../components/Admin/BusinessTable";

const AdminBusiness = () => {
  const [allBusinessDetails, setallBusinessDetails] = useState({
    approved: [],
    expired: [],
    unapproved: [],
  });

  const fetchAllBusinessDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/business`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const result = await response.json();
        setallBusinessDetails(result.data[0]);
      } else {
        toast.error("Error fetching approved business data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  // ^Delete Business Details
  const handleDelete = async (id) => {
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
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/business/delete/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result && result.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Business details has been deleted.",
              icon: "success",
            });

            fetchAllBusinessDetails();
          }
        } else {
          toast.error("Error while deleting business details");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    fetchAllBusinessDetails();
  }, []);

  if (
    allBusinessDetails &&
    allBusinessDetails.approved.length == 0 &&
    allBusinessDetails.expired.length == 0 &&
    allBusinessDetails.unapproved.length == 0
  ) {
    return <h1>No data found</h1>;
  }

  return (
    <section className="admin-businesses">
      {allBusinessDetails && allBusinessDetails?.approved?.length > 0 && (
        <BusinessTable
          data={allBusinessDetails.approved}
          header="Approved Business"
          handleDelete={(id) => handleDelete(id)}
        />
      )}
      {allBusinessDetails && allBusinessDetails?.expired?.length > 0 && (
        <BusinessTable
          data={allBusinessDetails.expired}
          header="Expired Business"
          handleDelete={(id) => handleDelete(id)}
        />
      )}
      {allBusinessDetails && allBusinessDetails?.unapproved?.length > 0 && (
        <BusinessTable
          data={allBusinessDetails.unapproved}
          header="Unapproved Business"
          handleDelete={(id) => handleDelete(id)}
        />
      )}
    </section>
  );
};

export default AdminBusiness;
