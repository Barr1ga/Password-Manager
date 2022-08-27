import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddButton from "./AddButton";

const AddItemModal = () => {
  const [modalShow, setModalShow] = useState(false);
  const [length, setLength] = useState(0);

  return (
    <>
      <div onClick={() => setModalShow(true)}>
        <AddButton message={"Add Item"}></AddButton>
      </div>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Body className="add-item-modal standard-stack gap-10">
          <h4>Create Password</h4>
          <h5>Password Generator</h5>

          <div className="password-generator">
            <div className="form-group">
              <label>Password Length</label>
               <input type="range" className="length"></input>
            </div>
            <div className="form-group">
              <label>Include Uppercase Letters</label>
              <input type="checkbox" className="form-checkbox" />
            </div>
            <div className="form-group">
              <label>Include Lowercase Letters</label>
              <input type="checkbox" className="form-checkbox" />
            </div>
            <div className="form-group">
              <label>Include Numbers</label>
              <input type="checkbox" className="form-checkbox" />
            </div>
            <div className="form-group">
              <label>Include Symbols</label>
              <input type="checkbox" className="form-checkbox" />
            </div>
            <div className="form-group">
              <Button type="submit" className="btn-dark">
                Add Email
              </Button>
            </div>
          </div>

          <div>
            <Button className="btn-dark">Generate Password</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemModal;
