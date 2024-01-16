import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCommitteeDetails } from "../../../features/admin/adminSlice";
import Committee from "../../../components/Committee";

const ItCommittee = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommitteeDetails("It Committee"));
  }, []);
  return (
    <div>
      <Committee header="It Committee" />
    </div>
  );
};

export default ItCommittee;
