import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  HiOutlineX,
  HiPlus,
} from "react-icons/hi";
import ConfirmModal from "../helpers/ConfirmModal";
import { useForm } from "react-hook-form";
import RoleInformation from "../roles/RoleInformation";
import FolderInformation from "./FolderInformation";

const AddItemModal = () => {
  const [modalShow, setModalShow] = useState(false);
  const handleCloseModal = () => {
    setModalShow(false);
  };

  return (
    <>
      <div onClick={() => setModalShow(true)}>
        <span className="icon">
          <HiPlus></HiPlus>
        </span>
      </div>
      <Modal
        scrollable
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        show={modalShow}
        onHide={handleCloseModal}
      >
        <Modal.Header>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
          <div className="page-header-with-close">
            <div className="back-enabled">
              <h4>Add Folder</h4>
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
        <Modal.Body className="add-item-modal standard-stack gap-10">
          <FolderInformation method={"create"} handleCloseModal={handleCloseModal}></FolderInformation>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemModal;
