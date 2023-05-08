import { createSlice } from "@reduxjs/toolkit";

export interface DoctorStateType {
  doctor: null | DoctorType;
}

const initialState: DoctorStateType = {
  doctor: null,
};

export const menuSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorLoggedIn: (state, { payload }) => {
      state.doctor = {
        name: payload.doctorData.name,
        _id: payload.doctorData._id,
        username: payload.doctorData.username,
      };
    },
    setDoctorLoggedOut: (state) => {
      state.doctor = null;
    },
  },
});

export type DoctorType = {
  _id: string;
  name: string;
  username: string;
};

export const { setDoctorLoggedIn, setDoctorLoggedOut } = menuSlice.actions;
export default menuSlice.reducer;
