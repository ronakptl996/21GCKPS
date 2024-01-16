import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import adminSlice from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
  },
});
