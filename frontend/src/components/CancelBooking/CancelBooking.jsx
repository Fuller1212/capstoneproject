import useAuth from '../../hooks/useAuth';
import axios from "axios";


const CancelBooking = (props) => {

    const [user, token] = useAuth();

    const deleteBooking = async() => {
        try{
            let response = await axios.delete(`http://127.0.0.1:8000/api/bookings/${props.bookingsId}/`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                  },
            });
        } catch (er){
        console.log(er.message)
    }
    }
    return ( 
        <div>
            <button onClick={deleteBooking}>Cancel Tee Time</button>
        </div>
     );
}
 
export default CancelBooking;