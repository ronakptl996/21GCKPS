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
        credentials: 'include',
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
      {committeeMemberData && committeeMemberData.length > 0 && (
        <div className="villageWiseCommitteeCards-Wrapper">
          {committeeMemberData.map((member) => (
            <div
              className="village-wise-comeeti-carousel-card"
              key={member._id}
            >
              <div className="comeeti-carousel-img">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${member.avatar}`}
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
        </div>
      )}
      {committeeMemberData.length == 0 && (
        <div className="no-data-found">
          <img
            src="../../../src/assets/images/no-data.jpg"
            alt="No data found"
          />
          <h3>No data found!</h3>
        </div>
      )}
    </>
  );
};

export default VillageWiseCommiteeMemberCard;
