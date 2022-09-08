import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const EventModal = ({show, onClose, selectedBooking}) => {
    const [user, token] = useAuth();
    

    const deleteBooking = async() => {
        try{
            let response = await axios.delete(`http://127.0.0.1:8000/api/bookings/${selectedBooking.id}/`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                  },
            });
            selectedBooking.remove()
            onClose()
        } catch (er){
        console.log(er.message)
    }
    }
    return ( 
        <div>
            <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{user.username}'s Tee Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cancel Tee Time at {selectedBooking.title}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteBooking} onClose >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
     );
}
 
export default EventModal;