import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmModal = ({ handleProceed, component, headerMessage, bodyMessage, continueMessage }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>{component}</div>
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <div className="confirmation-modal">
            <h5>{headerMessage}</h5>
            <small>{bodyMessage}</small>
            <div className="options">
              <Button type="button" className="btn-secondary btn-long" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="button" onClick={handleProceed} className="btn-dark btn-long">{continueMessage}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmModal;
