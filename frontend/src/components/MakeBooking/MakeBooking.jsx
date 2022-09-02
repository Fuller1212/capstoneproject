import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const MakeBooking = () => {

  const [user, token] = useAuth();
  const [date, setDate] = useState();
  const [players, setPlayers] = useState();
  const [time, setTime] = useState();

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
        });
  }


    return ( 
    <div>
      <form onSubmit={createBooking}>
        <input 
        type="text"
        placeholder='Select time' 
        value={time}
        onChange={(event) => setTime(event.target.value)}/>

        <input 
        type="text"
        placeholder='Select date' 
        value={date}
        onChange={(event) => setDate(event.target.value)}/>

        {/* <input 
        type="text"
        placeholder='Select number of players' 
        value={players}
        onChange={(event) => setPlayers(event.target.value)}/> */}

        <select value={players} onChange={(event) => setPlayers(event.target.value)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>  

        <button type='submit'>Book Tee Time</button>
      </form>
      <button class="c-button-unstyled c-icon_button c-icon_button--size_small c-wysiwyg_container__button c-wysiwyg_container__button--send_options c-wysiwyg_container__button--disabled c-icon_button--default" tabindex="-1" aria-haspopup="menu" aria-expanded="false" aria-disabled="true" data-qa="texty_send_options_button" aria-label="Schedule for later" delay="150" data-sk="tooltip_parent" type="button"/>

        <FullCalendar
    plugins={[ dayGridPlugin ]}
    initialView="dayGridMonth"
    weekends={false}
    events={[
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]}/>
    </div>  
     );
}
 
export default MakeBooking;