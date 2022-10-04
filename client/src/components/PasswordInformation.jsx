import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  HiOutlineClipboardList,
  HiOutlineTrash,
} from "react-icons/hi";
import { RiArrowDownSLine } from "react-icons/ri";
import ConfirmModal from "./helpers/ConfirmModal";
import { useDispatch } from "react-redux";
import { handleDeletePasswordItem, resetSelectedPasswordItem } from "../features/slice/passwordSlice";
import PasswordGenerator from "./PasswordGenerator";
import { useNavigate } from "react-router-dom";

import Card from "./addItem/Card";
import Login from "./addItem/Login";
import SecureNote from "./addItem/SecureNote";
import WifiPassword from "./addItem/WifiPassword";
import Identification from "./addItem/Identification";
import CurrentPasswordItem from "./CurrentPasswordItem";

const PasswordInformation = ({ currentPassword }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [selectedType, setSelectedType] = useState("Logins");
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
          {currentPassword.image !== "" ? (
            <img src={currentPassword.image} alt={currentPassword.name}></img>
          ) : (
            <div>{currentPassword.name.charAt(0)}</div>
          )}
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
            method={method}
            showPasswordGenerator={showPasswordGenerator}
            setShowPasswordGenerator={setShowPasswordGenerator}
            defaultValues={currentPassword}
          ></Login>
        )}

        {selectedType === "Cards" && (
          <Card method={method} defaultValues={currentPassword}></Card>
        )}

        {selectedType === "Identifications" && (
          <Identification method={method}></Identification>
        )}

        {selectedType === "Secure Notes" && (
          <SecureNote
            method={method}
            defaultValues={currentPassword}
          ></SecureNote>
        )}

        {selectedType === "Wifi Passwords" && (
          <WifiPassword
            method={method}
            defaultValues={currentPassword}
          ></WifiPassword>
        )}

        <div className="form-group">
          <ConfirmModal
            proceedInteraction={
              <Button className="btn-dark btn-long" onClick={() => handleDeletePassword(currentPassword.id)}>Yes</Button>
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
