import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import doctorSlice from "./reducers/doctorSlice";

export const store = configureStore({
  reducer: { user: userSlice, doctor: doctorSlice },
});
