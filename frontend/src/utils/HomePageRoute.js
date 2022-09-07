import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomePageRoute = ({children}) => {
    const [user] = useAuth();
    return user.is_staff ? children : <Navigate to = '/' />;
}
 
export default HomePageRoute;