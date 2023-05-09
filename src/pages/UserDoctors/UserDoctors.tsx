import { useEffect } from "react";
import {
  ActiveTicketType,
  UserStateType,
  setDoctors,
} from "../../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctors,
  getUserActiveTickets,
} from "../../redux/middlwares/userMiddleware";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import "./userdoctors.css";
import { useNavigate } from "react-router-dom";

function UserDoctorsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctors, user, activeTickets } = useSelector(
    (state: { user: UserStateType; activeTickets: ActiveTicketType }) =>
      state.user
  );
  useEffect(() => {
    getDoctors(dispatch);
    getUserActiveTickets(dispatch);
  }, [dispatch]);
  useEffect(() => {
    if (!!user) {
    } else {
      navigate("/patient/login");
    }
  }, [user]);
  return (
    <div className="doctors-page">
      <div>
        <h2>Doctors available to book an examination</h2>
        <div className="doctors-cards">
          {doctors.map((item) => (
            <DoctorCard name={item.name} _id={item._id} key={item._id} />
          ))}
        </div>
      </div>
      <div className="tickets-section">
        <h2>Await for Respond Tickets</h2>
        <h3>Count : {activeTickets.length}</h3>
        <div className="doctors-cards">
          {activeTickets.map((item) => (
            <div className="ticket" key={item._id}>
              <h4>Doctor :{item.doctor}</h4>
              <h5>Submited at :{item.createdAt}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDoctorsPage;
