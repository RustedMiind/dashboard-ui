import { NavLink } from "react-router-dom";
import "./homepage.css";

function HomePage() {
  return (
    <div className="home">
      <NavLink className="card" to={"/doctor/login"}>
        <div className="bg">
          <img
            src="https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5789.jpg?w=2000"
            alt="doctor"
          />
        </div>
        <div className="content">
          <h2>Login as a doctor</h2>
        </div>
      </NavLink>

      <NavLink className="card" to={"/patient/login"}>
        <div className="bg">
          <img
            src="https://media.istockphoto.com/id/1301555107/photo/offering-patient-centred-care-that-proves-effective-and-efficient.jpg?s=612x612&w=0&k=20&c=ZQ-XMynZeFaYYLHfEhDpiBnjGd8DODsCb57r2ZmZkjw="
            alt="patient"
          />
        </div>
        <div className="content">
          <h2>Login as a patient</h2>
        </div>
      </NavLink>
    </div>
  );
}

export default HomePage;
