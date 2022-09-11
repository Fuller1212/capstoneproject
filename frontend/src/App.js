// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import MakeBooking from "./components/MakeBooking/MakeBooking";
import DisplayBookings from "./components/DisplayBookings/DisplayBookings";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import EmployeeHomePage from "./components/EmployeeHomePage/EmployeeHomePage";
import HomePageRoute from "./utils/HomePageRoute";
import useAuth from "./hooks/useAuth";



function App() {
  // you'll need to fetch all bookings in the app component, store in a bookings statevar (moved from EmployeeHomePage)
  // you will then need to pass these bookings down through the HomePageRoute, and into EmployeeHomePage as props
  // move fetchBookings() from EmployeeHomePage
  const [bookings, setBookings] = useState([]);
  const[user ,token]= useAuth();

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const fetchBookings = async () => {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/bookings/all/",

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setBookings(response.data);
      console.log(response.data);
      }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePageRoute bookings={bookings}/>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/booking" element={<MakeBooking bookings={bookings} fetchBookings={fetchBookings}/>} />
        <Route path="/displaybookings" element={<DisplayBookings/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
