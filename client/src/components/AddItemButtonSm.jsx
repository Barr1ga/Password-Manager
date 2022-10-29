import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { HiPlus } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import {
  HiOutlineArrowLeft,
  HiOutlineX,
  HiOutlineGlobe,
  HiOutlineCreditCard,
  HiOutlineIdentification,
  HiOutlineDocumentText,
  HiOutlineWifi,
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
  const [selectedType, setSelectedType] = useState("Login");
  const [showTypeOptions, setShowTypeOptions] = useState(false);

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
                    onClick={() => handleTypeClicked("Login")}
                  >
                    <HiOutlineGlobe></HiOutlineGlobe>Login
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
                    onClick={() => handleTypeClicked("Identification")}
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
                {selectedType === "Login" && <HiOutlineGlobe></HiOutlineGlobe>}
                {selectedType === "Cards" && (
                  <HiOutlineCreditCard></HiOutlineCreditCard>
                )}
                {selectedType === "Identification" && (
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

          {selectedType === "Login" && (
            <Login
              showPasswordGenerator={showPasswordGenerator}
              setShowPasswordGenerator={setShowPasswordGenerator}
            ></Login>
          )}

          {selectedType === "Cards" && <Card method={method}></Card>}

          {selectedType === "Identification" && (
            <Identification method={method}></Identification>
          )}

          {selectedType === "Secure Notes" && (
            <SecureNote method={method}></SecureNote>
          )}

          {selectedType === "Wifi Passwords" && (
            <WifiPassword
              method={method}
              showPasswordGenerator={showPasswordGenerator}
              setShowPasswordGenerator={setShowPasswordGenerator}
            ></WifiPassword>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemModal;
