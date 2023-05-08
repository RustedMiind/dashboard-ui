import { useEffect } from "react";
import { UserStateType, setDoctors } from "../../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../redux/middlwares/userMiddleware";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import "./userdoctors.css";
import { useNavigate } from "react-router-dom";

function UserDoctorsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctors, user } = useSelector(
    (state: { user: UserStateType }) => state.user
  );
  useEffect(() => {
    getDoctors(dispatch);
  }, [dispatch]);
  useEffect(() => {
    if (!!user) {
    } else {
      navigate("/patient/login");
    }
  }, [user]);
  return (
    <div className="doctors-page">
      <h2>Doctors available to book an examination</h2>
      <div className="doctors-cards">
        {doctors.map((item) => (
          <DoctorCard name={item.name} _id={item._id} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default UserDoctorsPage;
