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
} from "react-icons/hi";
import { RiArrowDownSLine } from "react-icons/ri";
import ConfirmModal from "./helpers/ConfirmModal";
import { useDispatch } from "react-redux";
import { resetSelectedPasswordItem } from "../features/slice/passwordSlice";
import PasswordGenerator from "./PasswordGenerator";
import { useNavigate } from "react-router-dom";

import Card from "./addItem/Card";
import Login from "./addItem/Login";
import SecureNote from "./addItem/SecureNote";
import WifiPassword from "./addItem/WifiPassword";
import Identification from "./addItem/Identification";

const PasswordInformation = ({ currentPassword }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [selectedType, setSelectedType] = useState("Logins");
  const [showTypeOptions, setShowTypeOptions] = useState(false);

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
            defaultValues={currentPassword}
          ></Login>
        )}

        {selectedType === "Cards" && (
          <Card defaultValues={currentPassword}></Card>
        )}

        {selectedType === "Identifications" && (
          <Identification></Identification>
        )}

        {selectedType === "Secure Notes" && (
          <SecureNote defaultValues={currentPassword}></SecureNote>
        )}

        {selectedType === "Wifi Passwords" && (
          <WifiPassword defaultValues={currentPassword}></WifiPassword>
        )}

        {/* {!showPasswordGenerator && (
          <>
            <h5>Item Information</h5>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>
                  Name <span className="error-message">*</span>
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                  className={
                    errors.name ? "form-control form-error" : "form-control "
                  }
                />
                {errors.name && (
                  <small className="error-message">
                    ⚠ {errors.name.message}
                    <br></br>
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>
                  Username <span className="error-message">*</span>
                </label>
                <input
                  type="text"
                  {...register("userName", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                  })}
                  className={
                    errors.userName
                      ? "form-control form-error"
                      : "form-control "
                  }
                />
                {errors.userName && (
                  <small className="error-message">
                    ⚠ {errors.userName.message}
                    <br></br>
                  </small>
                )}
                <small>
                  Username can be your email or username depending on the login
                  requirements of the website.
                </small>
              </div>

              <div className="form-group">
                <label>
                  Password <span className="error-message">*</span>
                </label>
                <span className="password-input">
                  <input
                    type={showPasswordInput ? "text" : "password"}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    })}
                    className={
                      errors.password
                        ? "form-control form-error"
                        : "form-control "
                    }
                  />
                  <div className="interactions">
                    {showPasswordInput ? (
                      <HiOutlineEye
                        onClick={() => setShowPasswordInput(false)}
                      ></HiOutlineEye>
                    ) : (
                      <HiOutlineEyeOff
                        onClick={() => setShowPasswordInput(true)}
                      ></HiOutlineEyeOff>
                    )}
                    <HiOutlineRefresh
                      className="generate-password"
                      onClick={() => setShowPasswordGenerator(true)}
                    ></HiOutlineRefresh>
                  </div>
                </span>
                {errors.password && (
                  <small className="error-message">
                    ⚠ {errors.password.message}
                    <br></br>
                  </small>
                )}
              </div>

              <div className="form-group form-select-group">
                <label>Folder</label>
                <div className="input">
                  <input
                    type="text"
                    readOnly
                    {...register("folder")}
                    ref={folderRef}
                    className={
                      errors.folder
                        ? "form-control form-error"
                        : "form-control "
                    }
                    onFocus={() => setShowFolder(true)}
                    onBlur={handleOnBlurFolder}
                  />
                  <RiArrowDownSLine className="icon"></RiArrowDownSLine>
                </div>
                {showFolder && (
                  <div className="select-options folder-options">
                    {folders.map((folder, idx) => (
                      <div
                        key={idx}
                        className="option padding-side "
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                        onClick={() => {
                          folderRef.current.value = folder;
                          setShowFolder(false);
                          setHovering(false);
                        }}
                      >
                        {folder}
                      </div>
                    ))}
                  </div>
                )}
                {errors.folder && (
                  <small className="error-message">
                    ⚠ {errors.folder.message}
                    <br></br>
                  </small>
                )}
              </div>

              <div className="form-group form-group-horizontal">
                <label>Mark this password as favorite</label>
                <div type="button" onClick={handleFavorite}>
                  {favorite ? (
                    <HiStar className="form-favorited"></HiStar>
                  ) : (
                    <HiStar className="form-unfavorited"></HiStar>
                  )}
                </div>
              </div>

              <div className="form-group">
                <ConfirmModal
                  handleProceed={() => handleUpdatePassword(currentPassword.id)}
                  component={
                    <Button
                      type="submit"
                      className="btn-dark btn-long btn-with-icon"
                    >
                      <HiPencil></HiPencil>Update Item
                    </Button>
                  }
                  headerMessage={"Are you sure you want to update this item?"}
                  bodyMessage={
                    "You already have information for this item, do you want to replace it?"
                  }
                  continueMessage={"Update"}
                ></ConfirmModal>
              </div>
              <div className="form-group">
                <ConfirmModal
                  handleProceed={() => handleDeletePassword(currentPassword.id)}
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
                  continueMessage={"Delete"}
                ></ConfirmModal>
              </div>
            </form>
          </>
        )}

        {showPasswordGenerator && (
          <PasswordGenerator
            watchPassword={watchPassword}
            handleUsePassword={handleUsePassword}
          ></PasswordGenerator>
        )} */}

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
