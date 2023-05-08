import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import {
  DoctorType,
  setDoctorLoggedIn,
  setDoctorLoggedOut,
} from "../reducers/doctorSlice";

export function requestDoctorSignup(
  form: FormObjectType,
  dispatch: Dispatch<AnyAction>
) {
  return new Promise((resolve, reject) => {
    axios
      .post<DoctorType>(
        "https://dashboard-server-ufs1.onrender.com/api/user/new",
        form
      )
      .then((res) => {
        dispatch(setDoctorLoggedIn({ doctorDate: res.data }));
        resolve(res.data);
      })
      .catch((err) => {
        dispatch(setDoctorLoggedOut());
        reject(err);
      });
  });
}

export function checkDoctorToken(dispatch: Dispatch<AnyAction>) {
  axios
    .get("https://dashboard-server-ufs1.onrender.com/controlpanel/check")
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch(setDoctorLoggedIn({ doctorData: res.data }));
      } else {
        dispatch(setDoctorLoggedOut());
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
export function requestDoctorLogin(
  { username, password }: DoctorLoginFormType,
  dispatch: Dispatch<AnyAction>
) {
  return new Promise((resolve, reject) => {
    axios
      .post<DoctorType>(
        "https://dashboard-server-ufs1.onrender.com/controlpanel/login",
        { username, password }
      )
      .then((res) => {
        resolve(res.data);
        if (res.status === 200) {
          dispatch(setDoctorLoggedIn({ doctorData: res.data }));
        } else {
          dispatch(setDoctorLoggedOut());
        }
      })
      .catch((err) => {
        console.log(err);
        const errorMessage: LoginErrorType = err.response;
        reject(errorMessage);
        dispatch(setDoctorLoggedOut());
      });
  });
}
export function requestDoctorLogout(dispatch: Dispatch<AnyAction>) {
  return new Promise((resolve, reject) => {
    axios
      .post("https://dashboard-server-ufs1.onrender.com/controlpanel/logout")
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
          dispatch(setDoctorLoggedOut());
        } else {
          reject(res);
          dispatch(setDoctorLoggedOut());
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
        dispatch(setDoctorLoggedOut());
      });
  });
}

export type LoginErrorType = "Username is inccorrect" | "Password is incorrect";

export type DoctorLoginFormType = { username: string; password: string };

export type FormObjectType = {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
};
