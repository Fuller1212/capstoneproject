import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <h1 className="nav-header">Welcome to Tee Time Booker</h1>
      <ul>
        <div>
          <li className="brand">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <b>Home</b>
            </Link>
          </li>
          <li className="make-tee-time" onClick={() => navigate("/booking")}>
            Make Tee Time
          </li>
          <li
            className="display-tee-time"
            onClick={() => navigate("/displaybookings")}
          >
            View Bookings
          </li>
        </div>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
