import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddButton from "../../helpers/AddButton";
import Button from "react-bootstrap/Button";
import {
  HiOutlineArrowLeft,
  HiOutlineX,
  HiOutlineGlobe,
  HiGlobe,
  HiOutlineCreditCard,
  HiCreditCard,
  HiOutlineIdentification,
  HiIdentification,
  HiOutlineDocumentText,
  HiDocumentText,
  HiOutlineWifi,
  HiWifi,
  HiOutlineUsers,
  HiUsers,
} from "react-icons/hi";
import ConfirmModal from "../../helpers/ConfirmModal";
import RoleInformation from "../../roles/RoleInformation";
import MembersList from "./MembersList";

const AddItemModal = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [selectedType, setSelectedType] = useState("Logins");
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [tab, setTab] = useState(1);

  const method = "add";

  const handleBack = () => {
    setShowPasswordGenerator(false);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  const handleTypeClicked = (value) => {
    setSelectedType(value);
    setShowTypeOptions(false);
  };

  return (
    <>
      <div onClick={() => setModalShow(true)}>
        <AddButton message={"Add Role"}></AddButton>
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
              {showPasswordGenerator && (
                <HiOutlineArrowLeft
                  className="btn-back"
                  onClick={handleBack}
                ></HiOutlineArrowLeft>
              )}
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
        <Modal.Body className="add-item-modal standard-stack gap-10">
          <div className="form-group">
            <div className="tab">
              <div
                onClick={() => setTab(1)}
                className={tab === 1 ? "pills selected" : "pills"}
              >
                <p>{"Display & Information"}</p>
              </div>
              <div
                onClick={() => setTab(2)}
                className={tab === 2 ? "pills selected" : "pills"}
              >
                <p>Assign Roles</p>
              </div>
            </div>
          </div>

          {tab === 1 && <RoleInformation></RoleInformation>}

          <div className="vault-members">
            {tab === 2 && <MembersList></MembersList>}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemModal;
