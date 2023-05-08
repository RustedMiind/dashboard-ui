import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import {
  LoginFormType,
  requestLogin,
} from "../../redux/middlwares/userMiddleware";
import { UserStateType } from "../../redux/reducers/userSlice";

function UserLoginForm() {
  const [form, formDispatch] = useReducer(formReducer, initialForm);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    requestLogin(form, dispatch)
      .then()
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }

  return (
    <div className={"login-form " + (error ? "red-border" : "")}>
      <h2>Login as a Patient</h2>
      <h2 className="error">{error}</h2>
      <form onSubmit={submitForm}>
        <div className="input-section">
          <div className="input-container">
            <label htmlFor="phone">phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => {
                formDispatch({ type: "PHONE", payload: e.target.value });
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

function formReducer(state: LoginFormType, action: ActionType): LoginFormType {
  switch (action.type) {
    case "PHONE":
      return { ...state, phone: action.payload };

    case "PASSWORD":
      return { ...state, password: action.payload };

    default:
      return state;
  }
}

type ActionType = {
  type: "PHONE" | "PASSWORD";
  payload: string;
};
const initialForm: LoginFormType = {
  phone: "",
  password: "",
};

export default UserLoginForm;
