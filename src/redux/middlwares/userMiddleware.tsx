import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import {
  UserType,
  setDoctors,
  setUserLoggedIn,
  setUserLoggedOut,
} from "../reducers/userSlice";

export function requestSignup(
  form: FormObjectType,
  dispatch: Dispatch<AnyAction>
) {
  return new Promise((resolve, reject) => {
    axios
      .post<UserType>("/api/user/new", form)
      .then((res) => {
        dispatch(setUserLoggedIn({ userData: res.data }));
        resolve(res.data);
      })
      .catch((err) => {
        dispatch(setUserLoggedOut());
        reject(err);
      });
  });
}

export function checkToken(dispatch: Dispatch<AnyAction>) {
  axios
    .get("/api/checkuser")
    .then((res) => {
      if (res.status === 200) {
        dispatch(setUserLoggedIn({ userData: res.data }));
      }
    })
    .catch((err) => {
      // dispatch(setUserLoggedOut());
      console.log(err);
    });
}
export function getDoctors(dispatch: Dispatch<AnyAction>) {
  axios
    .get("/api/doctors")
    .then((res) => {
      if (res.status === 200) {
        dispatch(setDoctors({ doctors: res.data }));
      } else {
      }
    })
    .catch((err) => {
      // dispatch(setUserLoggedOut());
      console.log(err);
    });
}
export function requestLogin(
  { phone, password }: LoginFormType,
  dispatch: Dispatch<AnyAction>
) {
  return new Promise((resolve, reject) => {
    axios
      .post<UserType>("/api/login", { phone, password })
      .then((res) => {
        resolve(res.data);
        if (res.status === 200) {
          dispatch(setUserLoggedIn({ userData: res.data }));
        } else {
          dispatch(setUserLoggedOut());
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        const errorMessage: LoginErrorType = err.response.data;
        reject(errorMessage);
        dispatch(setUserLoggedOut());
      });
  });
}
export function requestLogout(dispatch: Dispatch<AnyAction>) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/logout")
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
          dispatch(setUserLoggedOut());
        } else {
          reject(res);
          dispatch(setUserLoggedOut());
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
        dispatch(setUserLoggedOut());
      });
  });
}

export type LoginErrorType =
  | "Phone number is inccorrect"
  | "Password is incorrect";

export type LoginFormType = { phone: string; password: string };

export type FormObjectType = {
  fName: string;
  lName: string;
  phone: string;
  address: string;
  city: string;
  password: string;
  passwordConfirm: string;
};
