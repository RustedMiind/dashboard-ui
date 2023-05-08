import axios from "axios";
import "./doctorcard.css";
import { TicketType } from "../../pages/TicketsPage/TicketsPage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDoctors } from "../../redux/reducers/userSlice";

function DoctorCard(props: PropsType) {
  const dispatch = useDispatch();

  function handleReserve() {
    axios
      .post<TicketType>(
        "https://dashboard-server-ufs1.onrender.com/ticket/new",
        { doctor: props._id }
      )
      .then(() => {
        setDoctors(dispatch);
      });
  }
  return (
    <div className="doctor-card">
      <div className="content">
        <h3 className="name">Dr: {props.name}</h3>
      </div>
      <div className="manage">
        <button className="approve" onClick={handleReserve}>
          Reserve a ticket
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;

type PropsType = {
  name: string;
  _id: string;
};
