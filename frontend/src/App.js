// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

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


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePageRoute />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/booking" element={<MakeBooking/>} />
        <Route path="/displaybookings" element={<DisplayBookings/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
