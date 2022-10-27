import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  HiOutlineCamera,
} from "react-icons/hi";
import UploadImage from "./UploadImage";
import ConfirmModal from "./helpers/ConfirmModal";
import { useDispatch } from "react-redux";
import {
  handleDeletePasswordItem,
  resetSelectedPasswordItem,
} from "../features/slice/passwordSlice";
import { useNavigate } from "react-router-dom";

import Login from "./addItem/Login";
import WifiPassword from "./addItem/WifiPassword";

const PasswordInformation = ({ currentPassword }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [selectedType, setSelectedType] = useState("Login");
  const [showTypeOptions, setShowTypeOptions] = useState(false);

  const method = "update";

  const handleDeletePassword = (id) => {
    dispatch(handleDeletePasswordItem(id));
  };

  const handleCloseMobile = () => {
    if (showPasswordGenerator) {
      setShowPasswordGenerator(false);
    }
    dispatch(resetSelectedPasswordItem());
    navigate(-1);
  };

  const handleClose = () => {
    if (showPasswordGenerator) {
      setShowPasswordGenerator(false);
    }
    dispatch(resetSelectedPasswordItem());
  };

  const handleBack = () => {
    setShowPasswordGenerator(false);
  };

  const handleTypeClicked = (value) => {
    setSelectedType(value);
    setShowTypeOptions(false);
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
            {currentPassword.image !== "" ? (
              <img src={currentPassword.image} alt={currentPassword.name}></img>
            ) : (
              <div className="default">{currentPassword.name.charAt(0)}</div>
            )}
            <div className="btn-circle update-image" htmlFor="upload-photo">
              <UploadImage mode={"item"}></UploadImage>
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
            method={method}
            showPasswordGenerator={showPasswordGenerator}
            setShowPasswordGenerator={setShowPasswordGenerator}
            defaultValues={currentPassword}
          ></Login>
        )}

        {selectedType === "Wifi Password" && (
          <WifiPassword
            method={method}
            defaultValues={currentPassword}
          ></WifiPassword>
        )}

        <div className="form-group">
          <ConfirmModal
            proceedInteraction={
              <Button
                className="btn-dark btn-long"
                onClick={() => handleDeletePassword(currentPassword.id)}
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

export default PasswordInformation;
