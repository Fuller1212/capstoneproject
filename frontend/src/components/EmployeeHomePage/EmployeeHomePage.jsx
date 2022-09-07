import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';


const EmployeeHomePage = () => {

    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [allBookings, setAllBookings] = useState([]);
    
    useEffect(() => {
        fetchBookings()
    }, [token]);
    
        const fetchBookings = async () => {
                try{
                    let response = await axios.get('http://127.0.0.1:8000/api/bookings/all',
                    {
                      headers: {
                          Authorization: "Bearer " + token,
                        },
                  });
                    let bookingArray = response.data.map((booking) => {
                      return { title: booking.start_time, date: booking.date }
                    });
                    setAllBookings(bookingArray)
          
                } catch (er) {
                    console.log(er.message)
                }
        };
    return ( 
        <div className="container">
            <h2>Employee Home Page</h2>
            <div>
            <FullCalendar
            events={allBookings}
            plugins={[ daygridPlugin]}
            initialView="dayGridMonth"            
            headerToolbar={{
              right: 'dayGridMonth,dayGridWeek,dayGridDay,today,prev,next,listweek'
            }}
            navLinks={true}/>
        </div>
        </div>
     );
}
 
export default EmployeeHomePage;