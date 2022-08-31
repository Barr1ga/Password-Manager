import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddButton from "./AddButton";
import { useForm } from "react-hook-form";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineRefresh,
  HiCheckCircle,
  HiPlus,
  HiOutlineDuplicate,
  HiOutlineX,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { RiArrowDownSLine } from "react-icons/ri";
import useGeneratePassword from "../hooks/useGeneratePassword";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import WarningAlert from "./WarningAlert";
import ConfirmModal from "./ConfirmModal";

const AddItemModal = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [securePassword, setSecurePassword] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [folders, setFolders] = useState(["folder1", "folder2", "folder3"]);
  const [showToolTip, setShowToolTip] = useState(false);
  const { password, getPassword, resetPassword } = useGeneratePassword();
  const [generateEmpty, setGenerateEmpty] = useState(false);

  const generatedRef = useRef();
  const folderRef = useRef();
  const clipBoard = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      userName: "",
      password: "",
      folder: "",
    },
  });

  const watchPasswordValue = watch("password");

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: errorsPassword },
  } = useForm({
    mode: "all",
    defaultValues: {
      length: 10,
    },
  });


  const onSubmit = (data) => {
    console.log(data);
  };

  const handleOnBlurFolder = () => {
    if (!hovering) {
      setShowFolder(false);
    }
  };

  const onSubmitGenerate = (data) => {
    const { lowercase, uppercase, numbers, symbols, length } = data;
    if (!lowercase && !uppercase && !numbers && !symbols) {
      setGenerateEmpty(true);
      return;
    }

    getPassword(data);
    if (lowercase || uppercase || numbers || symbols) {
      setSecurePassword(true);
    }
  };

  const handlePasswordCopied = () => {
    setShowToolTip(true);
    navigator.clipboard.writeText(password);
  };

  if (password !== "" && generatedRef.current) {
    generatedRef.current.value = password;
  }

  const handleGeneratorChange = () => {
    setSecurePassword(false);
  };

  const handleBack = () => {
    setShowPasswordGenerator(false);
    generatedRef.current.value = "";
    resetPassword();
  };

  const handleUsePassword = () => {
    if (password !== "") {
      setShowPasswordGenerator(false);
      setValue("password", password);
      generatedRef.current.value = "";
      resetPassword();
    }
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setShowPasswordGenerator(false);
    if (generatedRef.current) {
      generatedRef.current.value = "";
    }
    resetPassword();
    reset();
  };

  return (
    <>
      <div onClick={() => setModalShow(true)}>
        <AddButton message={"Add Item"}></AddButton>
      </div>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        show={modalShow}
        onHide={handleCloseModal}
      >
        <Modal.Header>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
          <div className="page-header">
            <div className="back-enabled">
              {showPasswordGenerator && (
                <HiOutlineArrowLeft
                  className="btn-back"
                  onClick={handleBack}
                ></HiOutlineArrowLeft>
              )}
              <h4>Create Password</h4>
            </div>
            <ConfirmModal
              handleProceed={handleCloseModal}
              component={<HiOutlineX className="btn-close"></HiOutlineX>}
              headerMessage={"Are you sure you want to leave this section?"}
              bodyMessage={
                "You have unsaved content, and will be lost unless you save it."
              }
              continueMessage={"Leave"}
            ></ConfirmModal>
          </div>
        </Modal.Header>
        <Modal.Body className="add-item-modal standard-stack gap-10">
          {!showPasswordGenerator && (
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
                    Username can be your email or username depending on the
                    login requirements of the website.
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
                      {securePassword && (
                        <HiCheckCircle className="secure"></HiCheckCircle>
                      )}
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
                        errors.userName
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
                  <input
                    type="checkbox"
                    {...register("favorite")}
                    className="form-checkbox"
                  />
                </div>

                <Button
                  type="submit"
                  className="btn-dark btn-long btn-with-icon"
                >
                  <HiPlus></HiPlus>Add Item
                </Button>
              </form>
            </>
          )}

          {showPasswordGenerator && (
            <>
              <div className="generator-header">
                <h5>
                  Password Generator <span className="error-message">*</span>
                </h5>
              </div>

              <div className="password-generator">
                <div className="form-group generator-field">
                  <input
                    type="text"
                    ref={generatedRef}
                    onChange={handleGeneratorChange}
                    className="form-control password-generator-input"
                  ></input>
                  {securePassword && (
                    <HiCheckCircle className="secure"></HiCheckCircle>
                  )}
                  <Button
                    ref={clipBoard}
                    onClick={handlePasswordCopied}
                    onBlur={() => setShowToolTip(false)}
                    className="btn-secondary copy-to-clipboard"
                  >
                    <HiOutlineDuplicate></HiOutlineDuplicate>
                  </Button>
                  <Overlay
                    target={clipBoard.current}
                    show={showToolTip}
                    placement="top"
                  >
                    {(props) => (
                      <Tooltip id="top" {...props}>
                        Copied!
                      </Tooltip>
                    )}
                  </Overlay>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit(onSubmitGenerate)}>
                <div className="password-generator">
                  <div className="form-group form-group-horizontal">
                    <label>
                      Password Length <span className="error-message">*</span>
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="30"
                      {...registerPassword("length")}
                      className="form-control length"
                    ></input>
                  </div>
                  <div className="form-group form-group-horizontal">
                    <label>Include Uppercase Letters</label>
                    <input
                      type="checkbox"
                      {...registerPassword("uppercase")}
                      className="form-checkbox"
                    />
                  </div>
                  <div className="form-group form-group-horizontal">
                    <label>Include Lowercase Letters</label>
                    <input
                      type="checkbox"
                      {...registerPassword("lowercase")}
                      className="form-checkbox"
                    />
                  </div>
                  <div className="form-group form-group-horizontal">
                    <label>Include Numbers</label>
                    <input
                      type="checkbox"
                      {...registerPassword("numbers")}
                      className="form-checkbox"
                    />
                  </div>
                  <div className="form-group form-group-horizontal">
                    <label>Include Symbols</label>
                    <input
                      type="checkbox"
                      {...registerPassword("symbols")}
                      className="form-checkbox"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <WarningAlert
                    message={
                      "Do not share your password to unauthorized users."
                    }
                  ></WarningAlert>
                </div>
                {generateEmpty && <small className="error-message">⚠ Password criterias are required</small>}
                <div className="generate-use">
                  <Button type="submit" className="btn-dark btn-long">
                    Generate Password
                  </Button>
                  <div className="btn-long">
                    {(watchPasswordValue && watchPasswordValue) !== "" ? (
                      <ConfirmModal
                        handleProceed={handleCloseModal}
                        component={
                          <Button
                            type="button"
                            onClick={handleUsePassword}
                            className="btn-secondary btn-long"
                          >
                            Use Password
                          </Button>
                        }
                        headerMessage={
                          "Are you sure you want to use this password?"
                        }
                        bodyMessage={
                          "You already have a password for this item, do you want to replace it?"
                        }
                        continueMessage={"Leave"}
                      ></ConfirmModal>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleUsePassword}
                        className="btn-secondary btn-long"
                      >
                        Use Password
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemModal;
