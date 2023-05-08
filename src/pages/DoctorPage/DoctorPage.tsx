import { NavLink, Route, Routes } from "react-router-dom";
import "./doctorpage.css";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { DoctorStateType } from "../../redux/reducers/doctorSlice";
import DoctorLoginPage from "../DoctorLoginPage/DoctorLoginPage";
import { requestDoctorLogout } from "../../redux/middlwares/doctorMIddleware";
import TicketsPage from "../TicketsPage/TicketsPage";

function DoctorPage() {
  const dispatch = useDispatch();
  const { doctor } = useSelector(
    (state: { doctor: DoctorStateType }) => state.doctor
  );
  return (
    <div className="doctor-page">
      <Navbar
        isUser={!!doctor}
        navLinks={
          <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"tickets"}>Tickets</NavLink>
          </>
        }
        logo={{
          type: "image",
          payload:
            "https://labdigitalsystem.com/wp-content/themes/landing/lds-img/logo.jpeg",
        }}
        userDropdown={
          <>
            <h3>Welcome {doctor?.name}</h3>
            <button
              onClick={() => {
                requestDoctorLogout(dispatch);
              }}
            >
              {" "}
              Logout
            </button>
          </>
        }
      />
      <Routes>
        <Route path="login" element={<DoctorLoginPage />} />
        <Route path="tickets" element={<TicketsPage />} />
      </Routes>
    </div>
  );
}

export default DoctorPage;
