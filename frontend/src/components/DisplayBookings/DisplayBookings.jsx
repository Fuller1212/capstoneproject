import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from "axios";

const DisplayBookings = () => {

    const [user, token] = useAuth();
    const [bookings,setBookings] = useState([]);


    useEffect(() => {
      getBooking();
    }, [token]);


    const getBooking = async() => {
        try{
          let response = await axios.get('http://127.0.0.1:8000/api/bookings/',
          {
            headers: {
                Authorization: "Bearer " + token,
              },
        });
          let bookingArray = response.data.map((booking) => {
            return { booking: booking.date, time: booking.start_time }
          });
          setBookings(bookingArray)

        } catch (er) {
          console.log(er.message)
        }
    };

    return ( 
        <div>
            <FullCalendar
            events={bookings}
            plugins={[ daygridPlugin]}
            initialView="dayGridMonth"            
            headerToolbar={{
              right: 'dayGridMonth,dayGridWeek,dayGridDay,today,prev,next'
            }}
            navLinks={true}/>
        </div>
     );
}
 
export default DisplayBookings;