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
import { resetQueryFulfilled } from "../features/slice/itemSlice";
import { useDispatch, useSelector } from "react-redux";

const AddItemModal = ({ currentPage }) => {
  const [modalShow, setModalShow] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [selectedType, setSelectedType] = useState("Login");
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageLetter, setCurrentImageLetter] = useState("");
  const { itemFulfilled } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const method = "create";

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
    if (itemFulfilled) {
      handleCloseModal();
      dispatch(resetQueryFulfilled());
    }
  }, [itemFulfilled]);

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
                    onClick={() => handleTypeClicked("Login")}
                  >
                    <HiOutlineGlobe></HiOutlineGlobe>Login
                  </Button>
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("Card")}
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
                    onClick={() => handleTypeClicked("Secure Note")}
                  >
                    <HiOutlineDocumentText></HiOutlineDocumentText>Secure Note
                  </Button>
                </div>
                <div className="options">
                  <Button
                    className="btn-secondary btn-with-icon"
                    onClick={() => handleTypeClicked("Wifi Password")}
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
                {selectedType === "Card" && (
                  <HiOutlineCreditCard></HiOutlineCreditCard>
                )}
                {selectedType === "Identification" && (
                  <HiOutlineIdentification></HiOutlineIdentification>
                )}
                {selectedType === "Secure Note" && (
                  <HiOutlineDocumentText></HiOutlineDocumentText>
                )}
                {selectedType === "Wifi Password" && (
                  <HiOutlineWifi></HiOutlineWifi>
                )}
                {selectedType}
              </Button>
            )}
          </div>

          {selectedType === "Login" && (
            <Login
              currentImage={currentImage}
              setCurrentImageLetter={setCurrentImageLetter}
              method={method}
              showPasswordGenerator={showPasswordGenerator}
              setShowPasswordGenerator={setShowPasswordGenerator}
            ></Login>
          )}

          {selectedType === "Card" && (
            <Card
              currentImage={currentImage}
              method={method}
              setCurrentImageLetter={setCurrentImageLetter}
            ></Card>
          )}
          {selectedType === "Identification" && (
            <Identification
              currentImage={currentImage}
              setCurrentImageLetter={setCurrentImageLetter}
              method={method}
            ></Identification>
          )}

          {selectedType === "Secure Note" && (
            <SecureNote
              currentImage={currentImage}
              setCurrentImageLetter={setCurrentImageLetter}
              method={method}
            ></SecureNote>
          )}

          {selectedType === "Wifi Password" && (
            <WifiPassword
              currentImage={currentImage}
              method={method}
              setCurrentImageLetter={setCurrentImageLetter}
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
