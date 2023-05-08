import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { UserStateType } from "./redux/reducers/userSlice";
import { checkToken } from "./redux/middlwares/userMiddleware";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { DoctorStateType } from "./redux/reducers/doctorSlice";
import HomePage from "./pages/HomePage/HomePage";
import DoctorPage from "./pages/DoctorPage/DoctorPage";
import { checkDoctorToken } from "./redux/middlwares/doctorMIddleware";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  const user = useSelector((state: { user: UserStateType }) => state.user.user);
  const doctor = useSelector(
    (state: { doctor: DoctorStateType }) => state.doctor.doctor
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    checkToken(dispatch);
    checkDoctorToken(dispatch);
  }, []);
  return (
    <div className="App">
      {/* <Navbar
        isUser={!!user}
        navLinks={
          <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/login"}>Tickets</NavLink>
          </>
        }
        logo={{
          type: "image",
          payload:
            "https://labdigitalsystem.com/wp-content/themes/landing/lds-img/logo.jpeg",
        }}
        userDropdown={<>Dropdown</>}
      /> */}
      <div className="Page">
        {
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctor/*" element={<DoctorPage />} />
            <Route path="/patient/*" element={<UserPage />} />
          </Routes>
        }
      </div>
    </div>
  );
}

export default App;
