import React, { useState } from "react";
import { HiOutlineAdjustments } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Filters = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button className="btn-secondary" onClick={() => setModalShow(true)}>
        <HiOutlineAdjustments></HiOutlineAdjustments>
      </Button>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Body className="standard-stack gap-10">
          <h4>Filters</h4>
          <div className="filters-list">
            <Button className="btn-secondary">Ascending</Button>
            <Button className="btn-secondary">Descending</Button>
            <Button className="btn-secondary">Date Added</Button>
            <Button className="btn-secondary">Ascending</Button>
          </div>
          <div>
            <Button className="btn-dark">Apply Filters</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Filters;
