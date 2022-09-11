import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import EmployeeEventModal from "../EmployeeEventModal/EmployeeEventModal";
import MakeBooking from "../MakeBooking/MakeBooking";

const EmployeeHomePage = ({ bookings }) => {
  const [user, token] = useAuth();

  const [selectedBooking, setSelectedBooking] = useState({
    title: "",
    start: new Date(),
    user: "",
  });
  const [modalShow, setModalShow] = useState(false);

  const handleClick = (info) => {
    setModalShow(true);
    setSelectedBooking(info.event);
    console.log(info.event);
  };
  const handleCloseModal = () => {
    setModalShow(false);
  };

  const calendarBookings = bookings.map((booking) => {
    return {
      title: `${booking.user.username}`,
      start: `${booking.date}T${booking.start_time}`,
      user: booking.user.username,
    };
  });

  return (
    <div className="container">
      <h2>Employee Home Page</h2>
      <div>
        <EmployeeEventModal
          show={modalShow}
          onClose={handleCloseModal}
          selectedBooking={selectedBooking}
        />
        <FullCalendar
          events={calendarBookings}
          plugins={[daygridPlugin]}
          initialView="dayGridMonth"
          eventClick={handleClick}
          headerToolbar={{
            right:
              "dayGridMonth,dayGridWeek,dayGridDay,today,prev,next,listweek",
          }}
          navLinks={true}
        />
      </div>
    </div>
  );
};

export default EmployeeHomePage;
