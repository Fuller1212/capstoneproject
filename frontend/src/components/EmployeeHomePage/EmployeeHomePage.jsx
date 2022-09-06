import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid';


const EmployeeHomePage = () => {

    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [allBookings, setAllBookings] = useState([]);
    
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const config = {
                    headers: {
                        Authorization : 'Bearer' + token,
                    },
                }
                if (user.is_staff){
                    let response = await axios.get('http://127.0.0.1:8000/api/bookings/all/', config)
                    setAllBookings(response.data)
                    
                }
                else{
                    navigate('/')
                }
                
            } catch (er) {
                console.log(error.response.data);
            }
        };
        fetchBookings()
    }, [token]);

    return ( 
        <div className="container">
            <h2>Employee Home Page</h2>
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
        </div>
     );
}
 
export default EmployeeHomePage;