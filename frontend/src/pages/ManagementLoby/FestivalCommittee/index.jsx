import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCommitteeDetails } from "../../../features/admin/adminSlice";
import Committee from "../../../components/Committee";

const FestivalCommittee = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommitteeDetails("Festival Committee"));
  }, []);
  return (
    <div>
      <Committee header="Festival Committee" />
    </div>
  );
};

export default FestivalCommittee;
