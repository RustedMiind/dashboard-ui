import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { UserStateType } from "../../redux/reducers/userSlice";
import { requestLogout } from "../../redux/middlwares/userMiddleware";
import UserLoginPage from "../UserLoginPage/UserLoginPage";
import "./userpage.css";
import UserDoctorsPage from "../UserDoctors/UserDoctors";

function UserPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state: { user: UserStateType }) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="user-page">
      <Navbar
        isUser={!!user}
        navLinks={
          <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"doctors"}>Doctors</NavLink>
          </>
        }
        logo={{
          type: "image",
          payload:
            "https://labdigitalsystem.com/wp-content/themes/landing/lds-img/logo.jpeg",
        }}
        userDropdown={
          <>
            <h3>Welcome {user?.fName}</h3>
            <button
              onClick={() => {
                requestLogout(dispatch);
              }}
            >
              {" "}
              Logout
            </button>
          </>
        }
      />
      <Routes>
        <Route path="login" element={<UserLoginPage />} />
        <Route path="doctors" element={<UserDoctorsPage />} />
      </Routes>
    </div>
  );
}

export default UserPage;
