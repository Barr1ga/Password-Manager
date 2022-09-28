import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmModal = ({ proceedInteraction, component, headerMessage, bodyMessage }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="confirm-component" onClick={handleShow}>{component}</div>
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="confirmation-modal-body">
          <div className="confirmation-modal">
            <h5>{headerMessage}</h5>
            <small>{bodyMessage}</small>
            <div className="options gap-10">
              <Button type="button" className="btn-secondary btn-long" onClick={handleClose}>
                Cancel
              </Button>
              {proceedInteraction}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmModal;
