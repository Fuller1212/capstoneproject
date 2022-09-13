import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import listPlugin from "@fullcalendar/list";
import EventModal from "../EventModal/EventModal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./DisplayBookings.css";

const DisplayBookings = () => {
  const [user, token] = useAuth();
  const [bookings, setBookings] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({
    title: "",
    date: "",
    id: "",
  });

  useEffect(() => {
    getBooking();
  }, []);

  const handleClick = (info) => {
    setModalShow(true);
    setSelectedBooking(info.event);
    console.log(selectedBooking);
  };
  const handleCloseModal = () => {
    setModalShow(false);
  };

  const getBooking = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/bookings/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      let bookingArray = response.data.map((booking) => {
        return {
          title: booking.start_time,
          date: booking.date,
          id: booking.id,
        };
      });
      setBookings(bookingArray);
      console.log(bookingArray);
    } catch (er) {
      console.log(er.message);
    }
  };

  return (
    <div>
      <EventModal
        show={modalShow}
        onClose={handleCloseModal}
        selectedBooking={selectedBooking}
      />
      <div className="header">
        <h1 className="text">Click on Tee Time to Cancel</h1>
      </div>
      <FullCalendar
        events={bookings}
        plugins={[daygridPlugin, listPlugin]}
        initialView="dayGridMonth"
        eventClick={handleClick}
        headerToolbar={{
          right: "dayGridMonth,dayGridWeek,dayGridDay,",
          left: "today prev,next listWeek",
        }}
        navLinks={true}
      />
    </div>
  );
};

export default DisplayBookings;
