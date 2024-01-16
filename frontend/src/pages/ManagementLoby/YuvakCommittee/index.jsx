import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCommitteeDetails } from "../../../features/admin/adminSlice";
import Committee from "../../../components/Committee";

const YuvakCommittee = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommitteeDetails("Yuvak Committee"));
  }, []);
  return (
    <div>
      <Committee header="Yuvak Committee" />
    </div>
  );
};

export default YuvakCommittee;
