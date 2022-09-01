import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddButton from "./Helpers/AddButton";
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
import ConfirmModal from "./Helpers/ConfirmModal";
import PasswordGenerator from "./PasswordGenerator";

const AddItemModal = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [folders, setFolders] = useState(["folder1", "folder2", "folder3"]);

  const folderRef = useRef();

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

  const watchPassword = watch("password");

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleOnBlurFolder = () => {
    if (!hovering) {
      setShowFolder(false);
    }
  };

  const handleBack = () => {
    setShowPasswordGenerator(false);
  };

  const handleUsePassword = (password) => {
    setShowPasswordGenerator(false);
    setValue("password", password);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    reset();
    setShowPasswordGenerator(false);
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
          <div className="page-header-with-close">
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
                      {showPasswordInput ? (
                        <HiOutlineEye
                          onClick={() => setShowPasswordInput(false)}
                        ></HiOutlineEye>
                      ) : (
                        <HiOutlineEyeOff
                          onClick={() => setShowPasswordInput(true)}
                        ></HiOutlineEyeOff>
                      )}
                      <HiOutlineRefresh className="generate-password"
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
            <PasswordGenerator
              watchPassword={watchPassword}
              handleUsePassword={handleUsePassword}
            ></PasswordGenerator>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemModal;
