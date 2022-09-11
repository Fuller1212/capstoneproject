import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MakeBooking = ({ bookings, fetchBookings }) => {
  const [user, token] = useAuth();
  const [date, setDate] = useState("2022-09-08");
  const [players, setPlayers] = useState(1);
  const [time, setTime] = useState("10:00");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const createBooking = async (event) => {
    event.preventDefault();
    let newBooking = {
      user: user.id,
      start_time: time,
      date: date,
      number_of_players: players,
    };
    let response = await axios.post(
      "http://127.0.0.1:8000/api/bookings/",
      newBooking,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    navigate("/displaybookings");
  };

  let timeChoices = [
    "08:00:00",
    "08:30:00",
    "09:00:00",
    "09:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "12:00:00",
    "12:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
    "16:30:00",
    "17:00:00",
    "17:30:00",
    "18:00:00",
  ];

  const selectedDateBookings = bookings
    .filter((booking) => booking.date === date)
    .map((booking) => booking.start_time);

  const options = timeChoices.map((timeChoice) => {
    return (
      !selectedDateBookings.includes(timeChoice) && (
        <option key={timeChoice} value={timeChoice}>
          {timeChoice}
        </option>
      )
    );
  });

  return (
    <div>
      <form onSubmit={createBooking}>
        <label>Select Date:</label>
        <div>
          <input
            type="date"
            value={date}
            onChange={(event) => {
              console.log(event.target.value);
              setDate(event.target.value);
            }}
          />
        </div>
        <label>Select Time:</label>
        <div>
          <select onChange={(event) => setTime(event.target.value)}>
            {options}
          </select>
        </div>
        <label>Number of Players:</label>
        <div>
          <select
            value={players}
            onChange={(event) => setPlayers(event.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button type="submit">Book Tee Time</button>
      </form>
    </div>
  );
};

export default MakeBooking;
