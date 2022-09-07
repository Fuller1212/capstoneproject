import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const EventModal = ({show, close,}) => {
    const [user, token] = useAuth();
    // const handleShow = () => setShow(true);

    const deleteBooking = async() => {
        try{
            let response = await axios.delete(`http://127.0.0.1:8000/api/bookings/2/`,
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
            {/* <Button onClick={handleShow}></Button> */}
            <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{user.username}'s Tee Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cancel Tee Time </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteBooking} >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
     );
}
 
export default EventModal;