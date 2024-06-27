import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminHelpTable from "../../../components/Admin/AdminHelpTable";

const AdminHelp = () => {
  const [helpData, setHelpData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/help`,
        { credentials: "include" }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setHelpData(result.data);
          console.log(result.data);
        }
      } else {
        toast.error("Error while get help data");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleStatus = async (data) => {
    console.log({ data });
    const { id, status } = data;

    if (!id || !status) return;

    if (status === "Rejected" && !data.reason) {
      toast.error("Reason is required");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/help/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          fetchData();
        }
      } else {
        toast.error("Error while updating status");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AdminHelpTable
        data={helpData?.pendingHelps}
        header={"Pending Request"}
        handleStatus={handleStatus}
      />

      <AdminHelpTable
        data={helpData?.approvedHelps}
        header={"Approved Request"}
      />

      <AdminHelpTable
        data={helpData?.rejectedHelps}
        header={"Rejected Request"}
      />
    </>
  );
};

export default AdminHelp;
