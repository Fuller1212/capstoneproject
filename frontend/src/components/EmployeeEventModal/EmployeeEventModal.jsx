import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../hooks/useAuth";

const EmployeeEventModal = ({ show, onClose, selectedBooking }) => {
  return (
    <div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tee Time Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tee Time for {selectedBooking.extendedProps?.user} on{" "}
          {selectedBooking.start.toString()}{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeEventModal;
