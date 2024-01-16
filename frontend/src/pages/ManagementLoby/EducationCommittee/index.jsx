import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCommitteeDetails } from "../../../features/admin/adminSlice";
import Committee from "../../../components/Committee";

const EducationCommittee = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommitteeDetails("Education Committee"));
  }, []);
  return (
    <div>
      <Committee header="Education Committee" />
    </div>
  );
};

export default EducationCommittee;
