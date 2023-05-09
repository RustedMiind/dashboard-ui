import axios from "axios";
import "./ticketcard.css";
import { TicketType } from "../../pages/TicketsPage/TicketsPage";
import { domainApi } from "../../App";

function TicketCard(props: PropsType) {
  function handleApprovement() {
    console.log(props);
    axios
      .get<TicketType[]>(domainApi(`controlpanel/approveticket/${props._id}`))
      .then((res) => {
        console.log("Approved", res);
        props.setTickets(res.data);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  function handleDeletion() {
    console.log(props);
    axios
      .get<TicketType[]>(domainApi(`controlpanel/deleteticket/${props._id}`))
      .then((res) => {
        console.log("Deleted", res);
        props.setTickets(res.data);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="ticket-card">
      <div className="content">
        <h3 className="name">Name :{props.name}</h3>
        <p className="date">Date :{props.createdAt}</p>
      </div>
      <div className="manage">
        <button className="approve" onClick={handleApprovement}>
          Approve
        </button>
        <button className="delete" onClick={handleDeletion}>
          Delete
        </button>
      </div>
    </div>
  );
}

type PropsType = {
  name: string;
  createdAt: string;
  _id: string;
  setTickets: React.Dispatch<React.SetStateAction<TicketType[]>>;
};

export default TicketCard;
