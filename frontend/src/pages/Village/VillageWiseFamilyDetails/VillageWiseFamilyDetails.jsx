import React, { useEffect, useState } from "react";
import "./VillageWiseFamilyDetails.css";
import { Link, useParams } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import GroupsIcon from "@mui/icons-material/Groups";
import { Pagination, Stack } from "@mui/material";
import VillageWiseCommiteeMemberCard from "../../../components/VillageWiseCommitteCard";
import { toast } from "react-toastify";

const villageWiseFamilyDetails = () => {
  const [page, setPage] = useState(1);
  const [totalFamilyProfile, setTotalFamilyProfile] = useState();
  const [villageFamilyData, setVillageFamilyData] = useState([]);
  const { villageName } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/users/village/${villageName}?page=${page}&limit=10`
      );
      const data = await response.json();
      if (data && data.success) {
        const { totalFamilyDataLength, familyData } = data.data;
        setVillageFamilyData(familyData);
        setTotalFamilyProfile(totalFamilyDataLength);
      }
    } catch (error) {
      toast.error("Unable to fetch Data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <section className="villageWiseFamilyDetails">
      {/* Village Committe Member Card */}
      <div className="villageWiseCommiteeMember">
        <div className="villageWiseCommiteeMember-header">
          <h1>
            {villageName.slice(0, 1).toUpperCase()}
            {villageName.slice(1)} Committee Member
          </h1>
        </div>
        <div className="villageWiseCommitteMember-card">
          <VillageWiseCommiteeMemberCard />
        </div>
      </div>

      {/* Village Family Card */}
      <div className="villageWiseFamily-header">
        <h1>
          All {villageName.slice(0, 1).toUpperCase()}
          {villageName.slice(1)} Family
        </h1>
      </div>
      {villageFamilyData && villageFamilyData?.length > 0 && (
        <div className="villageWiseFamilyDetails-wrapper">
          {villageFamilyData?.map((family) => (
            <div className="villageWiseFamilyDetails-card" key={family._id}>
              <div className="villageWiseFamilyDetails-image-wrapper">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL_PROFILE}${
                    family.avatar
                  }`}
                />
              </div>
              <div className="villageWiseFamilyDetails-info">
                <h3 className="headOfFamilyName">{family.headOfFamilyName}</h3>
                <div className="villageWiseFamilyDetails-info-contact">
                  <div className="villageWiseFamilyDetails-info-contact-wrapper">
                    <div className="info-contact-icon">
                      <CallIcon />
                    </div>
                    <p>{family.mobile}</p>
                  </div>
                  <div className="villageWiseFamilyDetails-info-contact-wrapper">
                    <div className="info-contact-icon">
                      <GroupsIcon />
                    </div>
                    <p>Total Member ({family.totalFamilyMember})</p>
                  </div>
                </div>
                <div className="more-info-link">
                  <Link to={family._id}>More Info</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {villageFamilyData?.length == 0 && (
        <div className="no-data-found">
          <img
            src="../../../src/assets/images/no-data.jpg"
            alt="No data found"
          />
          <h3>Empty family details!</h3>
        </div>
      )}

      {totalFamilyProfile > 10 && (
        <div>
          <Stack spacing={2} justifyContent={"center"} alignItems={"center"}>
            <Pagination
              count={Math.ceil(totalFamilyProfile / 10)}
              color="primary"
              onChange={(e, value) => setPage(value)}
            />
          </Stack>
        </div>
      )}
    </section>
  );
};

export default villageWiseFamilyDetails;
