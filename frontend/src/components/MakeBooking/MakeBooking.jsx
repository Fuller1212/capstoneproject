import React, { useState } from 'react'
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const MakeBooking = () => {

  const [user, token] = useAuth();
  const [date, setDate] = useState("2022-09-08");
  const [players, setPlayers] = useState(1);
  const [time, setTime] = useState("10:00");
  const [booking, setBooking] = useState([]);
  

  const createBooking = async (event) => {
    event.preventDefault();
    let newBooking ={
      "user": user.id,
      "start_time": time,
      "date": date,
      "number_of_players": players
    }
    let response = await axios.post('http://127.0.0.1:8000/api/bookings/',
        newBooking, 
        {
            headers: {
                Authorization: "Bearer " + token,
              },
        },
        setBooking(response.data)
        );
  };

  

    return ( 
    <div>
      <form onSubmit={createBooking}>
      <label>Select Time:</label>
      <div>
        <select
          value={time}
          onChange={(event) => setTime(event.target.value)}>
          <option value="8:00">8:00</option>
          <option value="8:15">8:15</option>
          <option value="8:30">8:30</option>
          <option value="8:45">8:45</option>
          <option value="9:00">9:00</option>
          <option value="9:15">9:15</option>
          <option value="9:39">9:30</option>
          <option value="9:45">9:45</option>
          <option value="10:15">10:15</option>
          <option value="10:30">10:30</option>
          <option value="10:45">10:45</option>
          <option value="11:00">11:00</option>
          <option value="11:15">11:15</option>
          <option value="11:30">11:30</option>
          <option value="11:45">11:45</option>
          <option value="12:00">12:00</option>
          <option value="12:15">12:15</option>
          <option value="12:30">12:30</option>
          <option value="12:45">12:45</option>
          <option value="1:00">1:00</option>
          <option value="1:15">1:15</option>
          <option value="1:30">1:30</option>
          <option value="1:45">1:45</option>
          <option value="2:00">2:00</option>
          <option value="2:15">2:15</option>
          <option value="2:30">2:30</option>
          <option value="2:45">2:45</option>
          <option value="3:00">3:00</option>
          <option value="3:15">3:15</option>
          <option value="3:30">3:30</option>
          <option value="3:45">3:45</option>
          <option value="4:00">4:00</option>
          <option value="4:15">4:15</option>
          <option value="4:30">4:30</option>
          <option value="4:45">4:45</option>
          <option value="5:00">5:00</option>
          <option value="5:15">5:15</option>
          <option value="5:30">5:30</option>
          <option value="5:45">5:45</option>
          <option value="6:00">6:00</option>
        </select>
      </div>
      <label>Select Date:</label>
      <div>
        <input 
        type="date" 
        value={date}
        onChange={(event) => {
          console.log(event.target.value)
          setDate(event.target.value)}}/>
      </div>
        <label>Number of Players:</label>
        <div>
        <select value={players} onChange={(event) => setPlayers(event.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>  
        </div>
        <button type='submit'>Book Tee Time</button>
          
      </form>
    </div>  
     );
}
 
export default MakeBooking;