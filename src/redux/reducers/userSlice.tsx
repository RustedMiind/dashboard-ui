import { createSlice } from "@reduxjs/toolkit";

export interface UserStateType {
  user: null | UserType;
  doctors: { name: string; _id: string }[];
  activeTickets: ActiveTicketType[];
}

const initialState: UserStateType = {
  user: null,
  doctors: [],
  activeTickets: [],
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
    setActiveTickets: (state, { payload }) => {
      state.activeTickets = payload.activeTickets;
    },
  },
});

export type UserType = {
  _id: string;
  fName: string;
  lName: string;
  phone: string;
};

export type ActiveTicketType = {
  _id: string;
  doctor: string;
  patient: string;
  approved: boolean;
  createdAt: string;
};

export const {
  setUserLoggedIn,
  setUserLoggedOut,
  setDoctors,
  setActiveTickets,
} = menuSlice.actions;
export default menuSlice.reducer;
