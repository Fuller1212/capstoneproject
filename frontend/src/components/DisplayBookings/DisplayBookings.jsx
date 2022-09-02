import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from "axios";

const DisplayBookings = () => {

    const [user, token] = useAuth();
    const [bookings,setBookings] = useState();

    const getBooking = async() => {
        try{
          let response = await axios.get('http://127.0.0.1:8000/api/bookings/',{
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          setBookings(response.data)
        } catch (er) {
          console.log(er.message)
        }
        }

    return ( 
        <div>
            <FullCalendar
    plugins={[ daygridPlugin]}
    initialView="dayGridMonth"
    events={[
        {bookings}
    ]}/>
        </div>
     );
}
 
export default DisplayBookings;