import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const VillageWiseCommiteeMemberCard = () => {
  const [committeeMemberData, setCommitteeMemberData] = useState([]);
  const { villageName } = useParams();

  const fetchData = async () => {
    if (!villageName) return;

    try {
      const response = await fetch("/api/users/committe-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ village: villageName }),
      });

      const data = await response.json();

      if (data && data.success) {
        setCommitteeMemberData(data.data);
      }
    } catch (error) {
      toast.error("Error while fetching committee data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="villageWiseCommitteeCards-Wrapper">
        {committeeMemberData &&
          committeeMemberData.length > 0 &&
          committeeMemberData.map((member) => (
            <div
              className="village-wise-comeeti-carousel-card"
              key={member._id}
            >
              <div className="comeeti-carousel-img">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${member.avatar}`}
                  alt={member.name}
                />
              </div>
              <div className="village-wise-comeeti-carousel-info">
                <h2>{member.name}</h2>
                <p>{member.committeeName}</p>
                <p>Call : {member.mobile}</p>
              </div>
            </div>
          ))}

        {committeeMemberData.length == 0 && <h3>No Committee member added</h3>}
      </div>
    </>
  );
};

export default VillageWiseCommiteeMemberCard;
