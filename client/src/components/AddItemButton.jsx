import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddButton from "./helpers/AddButton";
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
import ConfirmModal from "./helpers/ConfirmModal";
import Card from "./addItem/Card";
import Login from "./addItem/Login";
import SecureNote from "./addItem/SecureNote";
import WifiPassword from "./addItem/WifiPassword";
import Identification from "./addItem/Identification";

const AddItemModal = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [selectedType, setSelectedType] = useState("Logins");
  const [showTypeOptions, setShowTypeOptions] = useState(false);
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

  console.log(selectedType);
  return (
    <>
      <div onClick={() => setModalShow(true)}>
        <AddButton message={"Add Item"}></AddButton>
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
              <h4>Add Item</h4>
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
          <h5>Item Information</h5>

          <div className="item-type">
            <label>
              Item Type <span className="error-message">*</span>
            </label>

            {showTypeOptions ? (
              <div className="types standard-stack gap-10">
                <small>Select the type of this item.</small>
                <div className="options">
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("Logins")}
                  >
                    <HiOutlineGlobe></HiOutlineGlobe>Logins
                  </Button>
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("Cards")}
                  >
                    <HiOutlineCreditCard></HiOutlineCreditCard>Card
                  </Button>
                </div>
                <div className="options">
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("Identifications")}
                  >
                    <HiOutlineIdentification></HiOutlineIdentification>
                    Identification
                  </Button>
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("Secure Notes")}
                  >
                    <HiOutlineDocumentText></HiOutlineDocumentText>Secure Note
                  </Button>
                </div>
                <div className="options">
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("Wifi Passwords")}
                  >
                    <HiOutlineWifi></HiOutlineWifi>Wifi Password
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                className="btn-secondary btn-with-icon btn-long"
                onClick={() => setShowTypeOptions(true)}
              >
                {selectedType === "Logins" && <HiOutlineGlobe></HiOutlineGlobe>}
                {selectedType === "Cards" && (
                  <HiOutlineCreditCard></HiOutlineCreditCard>
                )}
                {selectedType === "Identifications" && (
                  <HiOutlineIdentification></HiOutlineIdentification>
                )}
                {selectedType === "Secure Notes" && (
                  <HiOutlineDocumentText></HiOutlineDocumentText>
                )}
                {selectedType === "Wifi Passwords" && (
                  <HiOutlineWifi></HiOutlineWifi>
                )}
                {selectedType}
              </Button>
            )}
          </div>

          {selectedType === "Logins" && (
            <Login
              showPasswordGenerator={showPasswordGenerator}
              setShowPasswordGenerator={setShowPasswordGenerator}
            ></Login>
          )}

          {selectedType === "Cards" && <Card></Card>}

          {selectedType === "Identifications" && (
            <Identification></Identification>
          )}

          {selectedType === "Secure Notes" && <SecureNote></SecureNote>}

          {selectedType === "Wifi Passwords" && <WifiPassword></WifiPassword>}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemModal;
