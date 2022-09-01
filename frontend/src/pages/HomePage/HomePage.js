import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './HomePage.css';

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCars();
  }, [token]);

  const myStyle={
    backgroundImage: 
"url('https://images2.alphacoders.com/690/thumb-1920-690371.jpg')",
    height:'100vh',
    marginTop:'-35px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  return (
    <div style={myStyle}>
      <div>
        <h3>Welcome {user.username} to Tee Time Maker, please select an option below</h3>
      </div>
      <li>
         <button onClick={() => navigate("/booking")}>Book A Tee Time</button>
        </li>
      <div>
        <li>
         <button onClick={() => navigate("/displaybookings")}>See Your Booked Tee Times</button>
        </li>
      </div>  
    </div>
  );
};

export default HomePage;
