import { useReducer, useState } from "react";
import "./doctorloginform.css";
import {
  DoctorLoginFormType,
  requestDoctorLogin,
} from "../../redux/middlwares/doctorMIddleware";
import { useDispatch } from "react-redux";

function DoctorLoginForm() {
  const [form, formDispatch] = useReducer(formReducer, initialForm);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    requestDoctorLogin(form, dispatch)
      .then()
      .catch((err) => {
        setError(err.data.message);
        console.log(err.data.message);
      });
  }
  return (
    <div className={"login-form " + (error ? "red-border" : "")}>
      <h2>Login as a Doctor</h2>
      <h2 className="error">{error}</h2>
      <form onSubmit={submitForm}>
        <div className="input-section">
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => {
                formDispatch({ type: "USERNAME", payload: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="input-section">
          <div className="input-container">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => {
                formDispatch({ type: "PASSWORD", payload: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="submit">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

function formReducer(
  state: DoctorLoginFormType,
  action: ActionType
): DoctorLoginFormType {
  switch (action.type) {
    case "USERNAME":
      return { ...state, username: action.payload };

    case "PASSWORD":
      return { ...state, password: action.payload };

    default:
      return state;
  }
}

const initialForm: DoctorLoginFormType = {
  username: "",
  password: "",
};
type ActionType = {
  type: "USERNAME" | "PASSWORD";
  payload: string;
};
export default DoctorLoginForm;
