import axios from "axios";
import { useEffect, useState } from "react";
import TicketCard from "../../components/TicketCard/TicketCard";
import "./ticketspage.css";
import { useSelector } from "react-redux";
import { DoctorStateType } from "../../redux/reducers/doctorSlice";
import { useNavigate } from "react-router-dom";
function TicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const { doctor } = useSelector(
    (state: { doctor: DoctorStateType }) => state.doctor
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!!doctor) {
      axios
        .get<TicketType[]>("/controlpanel/newtickets")
        .then((result) => {
          console.log("tickets", result);
          setTickets(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/doctor/login");
    }
  }, [doctor]);
  return (
    <div className="tickets">
      <h2>Your New Tickets</h2>
      {tickets && tickets.length
        ? tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              setTickets={setTickets}
              name={ticket.patient}
              _id={ticket._id}
              createdAt={ticket.createdAt}
            />
          ))
        : "No New Tickets found"}
    </div>
  );
}

export type TicketType = {
  _id: string;
  doctor: string;
  patient: string;
  approved: boolean;
  createdAt: string;
};

export default TicketsPage;
