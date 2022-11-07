import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddButton from "../../helpers/AddButton";
import Button from "react-bootstrap/Button";
import { HiOutlineX } from "react-icons/hi";
import ConfirmModal from "../../helpers/ConfirmModal";
import RoleInformation from "../../roles/RoleInformation";

const AddItemModal = () => {
  const [modalShow, setModalShow] = useState(false);
  const [tab, setTab] = useState(1);

  const handleCloseModal = () => {
    setModalShow(false);
  };

  return (
    <>
      <div onClick={() => setModalShow(true)}>
        <AddButton message={"Add Role"}></AddButton>
      </div>
      <Modal
        centered={setTab === 1 ? true : false}
        scrollable
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        show={modalShow}
        onHide={handleCloseModal}
      >
        <Modal.Header>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
          <div className="page-header-with-close">
            <div className="back-enabled">
              <h4>Add Role</h4>
            </div>
            <ConfirmModal
              proceedInteraction={
                <Button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn-dark btn-long"
                >
                  Leave
                </Button>
              }
              component={<HiOutlineX className="btn-close"></HiOutlineX>}
              headerMessage={"Are you sure you want to leave this section?"}
              bodyMessage={
                "You have unsaved content, and will be lost unless you save it."
              }
            ></ConfirmModal>
          </div>
        </Modal.Header>
        <Modal.Body className="add-role-modal standard-stack gap-10">
          <RoleInformation method={"create"}></RoleInformation>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemModal;
