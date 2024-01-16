import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Committee from "../../../components/Committee";
import { fetchCommitteeDetails } from "../../../features/admin/adminSlice";

const AccountCommittee = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommitteeDetails("Account Committee"));
  }, []);
  return (
    <div>
      <Committee header="Account Committee" />
    </div>
  );
};

export default AccountCommittee;
