import "./userloginpage.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserStateType } from "../../redux/reducers/userSlice";
import UserLoginForm from "../../components/UserLoginForm/UserLoginForm";

function UserLoginPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state: { user: UserStateType }) => state.user);

  useEffect(() => {
    if (!!user) {
      navigate("/patient/doctors");
    }
  }, [user]);

  return (
    <div className="login-page">
      <UserLoginForm />
    </div>
  );
}

export default UserLoginPage;
