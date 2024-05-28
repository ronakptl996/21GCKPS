import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Committee from "../../../components/Committee";
import { fetchCommitteeDetails } from "../../../features/admin/adminSlice";

const MahilaCommittee = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommitteeDetails("Mahila Committee"));
  }, []);
  return (
    <div>
      <Committee header="Mahila Committee" />
    </div>
  );
};

export default MahilaCommittee;
