import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineX,
  HiOutlineGlobe,
  HiOutlineCreditCard,
  HiOutlineIdentification,
  HiOutlineDocumentText,
  HiOutlineWifi,
  HiOutlineClipboardList,
  HiOutlineTrash,
} from "react-icons/hi";
import UploadImage from "./UploadImage";
import ConfirmModal from "./helpers/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedItem } from "../features/slice/itemSlice";
import { useNavigate } from "react-router-dom";

import Card from "./addItem/Card";
import Login from "./addItem/Login";
import SecureNote from "./addItem/SecureNote";
import WifiPassword from "./addItem/WifiPassword";
import Identification from "./addItem/Identification";

const ItemInformation = ({ currentItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [selectedType, setSelectedType] = useState("login");
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [currentImage, setCurrentImage] = useState(currentItem.image);
  const [currentImageLetter, setCurrentImageLetter] = useState(
    currentItem.name.charAt(0)
  );
  const method = "update";

  const selectedTypeFormatted =
    selectedType === "wifiPassword"
      ? "Wifi Password"
      : selectedType === "secureNote"
      ? "Secure Note"
      : selectedType.charAt(0).toUpperCase().concat(selectedType.slice(1));

  useEffect(() => {
    setShowTypeOptions(false);
    setSelectedType(currentItem.type);
  }, [currentItem]);

  useEffect(() => {
    setCurrentImage(currentItem.image);
  }, [currentItem]);

  const handleDeleteItem = (uid) => {
    // dispatch(handleDeleteItemItem(uid));
  };

  const handleCloseMobile = () => {
    setShowPasswordGenerator(false);
    dispatch(resetSelectedItem());
    navigate(-1);
  };

  const handleClose = () => {
    setShowPasswordGenerator(false);
    dispatch(resetSelectedItem());
  };

  const handleBack = () => {
    setShowPasswordGenerator(false);
  };

  const handleTypeClicked = (value) => {
    setSelectedType(value);
    setShowTypeOptions(false);
    handleBack();
  };

  return (
    <>
      <div>
        <div className="page-header">
          <div className="back-enabled">
            {showPasswordGenerator && (
              <HiOutlineArrowLeft
                className="btn-back"
                onClick={handleBack}
              ></HiOutlineArrowLeft>
            )}
            <h4>Update Password</h4>
          </div>
          <ConfirmModal
            proceedInteraction={
              <Button
                type="button"
                onClick={handleCloseMobile}
                className="btn-dark btn-long"
              >
                Leave
              </Button>
            }
            component={
              <div className="screen-version">
                <div className="mobile">
                  <HiOutlineX className="btn-close"></HiOutlineX>
                </div>
              </div>
            }
            headerMessage={"Are you sure you want to leave this section?"}
            bodyMessage={
              "You have unsaved content, and will be lost unless you save it."
            }
          ></ConfirmModal>
          <ConfirmModal
            proceedInteraction={
              <Button
                type="button"
                onClick={handleClose}
                className="btn-dark btn-long"
              >
                Leave
              </Button>
            }
            component={
              <div className="screen-version">
                <div className="non-mobile">
                  <HiOutlineX className="btn-close"></HiOutlineX>
                </div>
              </div>
            }
            headerMessage={"Are you sure you want to leave this section?"}
            bodyMessage={
              "You have unsaved content, and will be lost unless you save it."
            }
            continueMessage={"Leave"}
          ></ConfirmModal>
        </div>
      </div>
      <div className="add-item-modal standard-stack gap-10">
        <h5>Item Information</h5>
        <div className="item-image">
          <div className="image">
            {currentImage !== "" ? (
              <img src={currentImage} alt={currentItem.name}></img>
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
            defaultValues={currentItem}
          ></Login>
        )}

        {selectedType === "card" && (
          <Card
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={currentItem}
          ></Card>
        )}

        {selectedType === "identification" && (
          <Identification
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={currentItem}
          ></Identification>
        )}

        {selectedType === "secureNote" && (
          <SecureNote
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={currentItem}
          ></SecureNote>
        )}

        {selectedType === "wifiPassword" && (
          <WifiPassword
            currentImage={currentImage}
            method={method}
            setCurrentImageLetter={setCurrentImageLetter}
            defaultValues={currentItem}
            showPasswordGenerator={showPasswordGenerator}
            setShowPasswordGenerator={setShowPasswordGenerator}
          ></WifiPassword>
        )}

        <div className="form-group">
          <ConfirmModal
            proceedInteraction={
              <Button
                className="btn-dark btn-long"
                onClick={() => handleDeleteItem(currentItem.uid)}
              >
                Yes
              </Button>
            }
            component={
              <Button
                type="submit"
                className="btn-secondary danger btn-long btn-with-icon"
              >
                <HiOutlineTrash></HiOutlineTrash>Delete Item
              </Button>
            }
            headerMessage={"Are you sure you want to delete this item?"}
            bodyMessage={
              "Once you delete this item, there is no going back. Please be certain."
            }
          ></ConfirmModal>
        </div>

        <div className="last-updated">
          <div>
            <Link to="/AuditLog" type="button">
              <HiOutlineClipboardList></HiOutlineClipboardList>
            </Link>
          </div>
          <small>
            Last updated: Thu Sep 01 2022 21:01:16 GMT+0800 (Philippine Standard
            Time)
          </small>
        </div>
      </div>
    </>
  );
};

export default ItemInformation;
