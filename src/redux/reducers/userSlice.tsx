import { createSlice } from "@reduxjs/toolkit";

export interface UserStateType {
  user: null | UserType;
  doctors: { name: string; _id: string }[];
}

const initialState: UserStateType = {
  user: null,
  doctors: [],
};

export const menuSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, { payload }) => {
      state.user = {
        lName: payload.userData.lName,
        fName: payload.userData.fName,
        _id: payload.userData._id,
        phone: payload.userData.phone,
      };
    },
    setUserLoggedOut: (state) => {
      state.user = null;
    },
    setDoctors: (state, { payload }) => {
      state.doctors = payload.doctors;
    },
  },
});

export type UserType = {
  _id: string;
  fName: string;
  lName: string;
  phone: string;
};

export const { setUserLoggedIn, setUserLoggedOut, setDoctors } =
  menuSlice.actions;
export default menuSlice.reducer;
