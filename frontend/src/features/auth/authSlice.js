import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../helper/auth";

const initialState = {
  isAuth: false,
  loggedInUserDetails: {},
  isLoading: true,
  showNavbar: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isAuth = Boolean(action.payload);
    },
    setLoggedInUserDetails: (state, action) => {
      state.isAuth = true;
      state.loggedInUserDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setShowNavbar: (state, action) => {
      state.showNavbar = Boolean(action.payload);
    },
  },
});

export const {
  setIsLoggedIn,
  setLoggedInUserDetails,
  setLoading,
  setShowNavbar,
} = authSlice.actions;
export default authSlice.reducer;

export function fetchLoggedInUserDetails() {
  return async function fetchLoggedInUserDetailsThunk(dispatch, getState) {
    try {
      dispatch(setLoading(true));
      let accessToken = getCookie("accessToken");
      try {
        let response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`,
          {
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        let data = await response.json();
        if (data && data.success) {
          dispatch(setLoggedInUserDetails(data.data));
          dispatch(setLoading(false));
        } else {
          dispatch(setIsLoggedIn(false));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(`FetchLoggedInUserDetailsThunk Error ${error}`);
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
