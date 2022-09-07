import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import listPlugin from '@fullcalendar/list';
import CancelBooking from '../CancelBooking/CancelBooking';
import eventClick  from '@fullcalendar/react';

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
            return { title: booking.start_time, date: booking.date }
          });
          setBookings(bookingArray)

        } catch (er) {
          console.log(er.message)
        }
    };

    return ( 
        <div>
          <CancelBooking bookingsId={bookings.id}/>
            <FullCalendar
            events={bookings}
            plugins={[ daygridPlugin, listPlugin]}
            initialView="dayGridMonth"            
            headerToolbar={{
              right: 'dayGridMonth,dayGridWeek,dayGridDay,',
              left: 'today prev,next listWeek'
            }}
            
            navLinks={true}/>
            
        </div>
     );
}
 
export default DisplayBookings;