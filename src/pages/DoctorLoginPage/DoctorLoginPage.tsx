import "./doctorloginpage.css";
import DoctorLoginForm from "../../components/DoctorLoginForm/DoctorLoginForm";
import { DoctorStateType } from "../../redux/reducers/doctorSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function DoctorLoginPage() {
  const navigate = useNavigate();
  const { doctor } = useSelector(
    (state: { doctor: DoctorStateType }) => state.doctor
  );

  useEffect(() => {
    if (!!doctor) {
      navigate("/doctor/tickets");
    }
  }, [doctor]);

  return (
    <div className="login-page">
      <div className="form-container">
        <DoctorLoginForm />
      </div>
    </div>
  );
}

export default DoctorLoginPage;
