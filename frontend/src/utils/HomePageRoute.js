import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import HomePage from "../pages/HomePage/HomePage";
import EmployeeHomePage from "../components/EmployeeHomePage/EmployeeHomePage"

const HomePageRoute = ({bookings}) => {
    const [user] = useAuth();
    return user.is_staff ? <EmployeeHomePage bookings={bookings}/> : <HomePage/>;
}
 
export default HomePageRoute;