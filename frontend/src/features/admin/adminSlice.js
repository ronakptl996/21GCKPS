import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  committeeDetails: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCommitteeDetails: (state, action) => {
      state.committeeDetails = action.payload;
    },
  },
});

export const { setCommitteeDetails } = adminSlice.actions;
export default adminSlice.reducer;

export function fetchCommitteeDetails(committeeName) {
  return async function fetchCommitteeDetailsThunk(dispatch, getState) {
    try {
      const response = await fetch(`api/admin/committee/${committeeName}`);
      const data = await response.json();
      dispatch(setCommitteeDetails(data.data));
    } catch (error) {
      console.log("Admin Slice fetchCommitteeDetails error:", error);
    }
  };
}
