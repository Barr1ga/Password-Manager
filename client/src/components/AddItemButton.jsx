import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import AddButton from "./helpers/AddButton";
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
import UploadImage from "./UploadImage";
import { resetItemQueryFulfilled } from "../features/slice/itemSlice";
import { useDispatch, useSelector } from "react-redux";

const AddItemModal = ({ currentPage }) => {
  const [modalShow, setModalShow] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [selectedType, setSelectedType] = useState(
    currentPage ? currentPage : "login"
  );
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageLetter, setCurrentImageLetter] = useState("");
  const { itemCreatedFullfilled } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const method = "create";

  const selectedTypeFormatted =
    selectedType === "wifiPassword"
      ? "Wifi Password"
      : selectedType === "secureNote"
      ? "Secure Note"
      : selectedType.charAt(0).toUpperCase().concat(selectedType.slice(1));

  const handleBack = () => {
    setShowPasswordGenerator(false);
  };

  const handleCloseModal = () => {
    setCurrentImage("");
    setCurrentImage("");
    setModalShow(false);
  };

  const handleTypeClicked = (value) => {
    setShowPasswordGenerator(false);
    setSelectedType(value);
    setShowTypeOptions(false);
  };

  useEffect(() => {
    if (itemCreatedFullfilled) {
      handleCloseModal();
      dispatch(resetItemQueryFulfilled());
    }
  }, [itemCreatedFullfilled]);

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
            {confirmClose ? (
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
            ) : (
              <HiOutlineX
                className="btn-close"
                onClick={handleCloseModal}
              ></HiOutlineX>
            )}
          </div>
        </Modal.Header>
        <Modal.Body className="add-item-modal standard-stack gap-10">
          <h5>Item Information</h5>
          <div className="item-image">
            <div className="image">
              {currentImage !== "" ? (
                <img src={currentImage} alt={currentImage}></img>
              ) : (
                <div className="default">{currentImageLetter}</div>
              )}
              <div className="btn-circle update-image" htmlFor="upload-photo">
                <UploadImage
                  currentImage={currentImage}
                  setCurrentImage={setCurrentImage}
                  mode={"item"}
                ></UploadImage>
              </div>
            </div>
          </div>
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
                    onClick={() => handleTypeClicked("login")}
                  >
                    <HiOutlineGlobe></HiOutlineGlobe>Login
                  </Button>
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("card")}
                  >
                    <HiOutlineCreditCard></HiOutlineCreditCard>Card
                  </Button>
                </div>
                <div className="options">
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("identification")}
                  >
                    <HiOutlineIdentification></HiOutlineIdentification>
                    Identification
                  </Button>
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("secureNote")}
                  >
                    <HiOutlineDocumentText></HiOutlineDocumentText>Secure Note
                  </Button>
                </div>
                <div className="options">
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("wifiPassword")}
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
                {selectedType === "login" && <HiOutlineGlobe></HiOutlineGlobe>}
                {selectedType === "card" && (
                  <HiOutlineCreditCard></HiOutlineCreditCard>
                )}
                {selectedType === "identification" && (
                  <HiOutlineIdentification></HiOutlineIdentification>
                )}
                {selectedType === "secureNote" && (
                  <HiOutlineDocumentText></HiOutlineDocumentText>
                )}
                {selectedType === "wifiPassword" && (
                  <HiOutlineWifi></HiOutlineWifi>
                )}
                {selectedTypeFormatted}
              </Button>
            )}
          </div>

          {selectedType === "login" && (
            <Login
              currentImage={currentImage}
              setCurrentImageLetter={setCurrentImageLetter}
              method={method}
              showPasswordGenerator={showPasswordGenerator}
              setShowPasswordGenerator={setShowPasswordGenerator}
              setConfirmClose={setConfirmClose}
            ></Login>
          )}

          {selectedType === "card" && (
            <Card
              currentImage={currentImage}
              method={method}
              setCurrentImageLetter={setCurrentImageLetter}
              setConfirmClose={setConfirmClose}
            ></Card>
          )}
          {selectedType === "identification" && (
            <Identification
              currentImage={currentImage}
              setCurrentImageLetter={setCurrentImageLetter}
              method={method}
              setConfirmClose={setConfirmClose}
            ></Identification>
          )}

          {selectedType === "secureNote" && (
            <SecureNote
              currentImage={currentImage}
              setCurrentImageLetter={setCurrentImageLetter}
              method={method}
              setConfirmClose={setConfirmClose}
            ></SecureNote>
          )}

          {selectedType === "wifiPassword" && (
            <WifiPassword
              currentImage={currentImage}
              method={method}
              setCurrentImageLetter={setCurrentImageLetter}
              showPasswordGenerator={showPasswordGenerator}
              setShowPasswordGenerator={setShowPasswordGenerator}
              setConfirmClose={setConfirmClose}
            ></WifiPassword>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemModal;
