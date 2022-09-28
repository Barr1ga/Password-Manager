import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineRefresh,
  HiPencil,
  HiOutlineX,
  HiOutlineArrowLeft,
  HiOutlineTrash,
} from "react-icons/hi";
import { RiArrowDownSLine } from "react-icons/ri";
import ConfirmModal from "./Helpers/ConfirmModal";
import { useDispatch } from "react-redux";
import { resetSelectedPasswordItem } from "../features/slice/passwordSlice";
import PasswordGenerator from "./PasswordGenerator";
import { useNavigate } from "react-router-dom";

const PasswordInformation = ({ currentPassword }) => {
  const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [folders, setFolders] = useState(["folder1", "folder2", "folder3"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const folderRef = useRef();
  console.log(currentPassword);

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
      name: currentPassword.name,
      userName: currentPassword.domain,
      password: currentPassword.password,
      folder: currentPassword.folder,
    },
  });

  useEffect(() => {
    if (showPasswordGenerator) {
      setShowPasswordGenerator(false);
    }
    reset(currentPassword);
  }, [currentPassword]);

  const watchPassword = watch("password");

  if (!currentPassword) {
    return <></>;
  }

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

  const handleDeletePassword = (passwordID) => {
    console.log(passwordID);
  };

  const handleUpdatePassword = (passwordID) => {
    console.log(passwordID);
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
              component={<div className="screen-version">
              <div className="mobile">
                <HiOutlineX className="btn-close"></HiOutlineX>
              </div>
            </div>}
              headerMessage={"Are you sure you want to leave this section?"}
              bodyMessage={
                "You have unsaved content, and will be lost unless you save it."
              }
            ></ConfirmModal>
          <ConfirmModal
            handleProceed={handleClose}
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
                <input
                  type="checkbox"
                  {...register("favorite")}
                  className="form-checkbox"
                />
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
                  headerMessage={
                    "Are you sure you want to update this item?"
                  }
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
                  headerMessage={
                    "Are you sure you want to delete this item?"
                  }
                  bodyMessage={
                    "Once you delete this item, there is no going back. Please be certain."
                  }
                  continueMessage={"Delete"}
                ></ConfirmModal>
              </div>
              <small>
                Last updated: Thu Sep 01 2022 21:01:16 GMT+0800 (Philippine
                Standard Time)
              </small>
            </form>
          </>
        )}

        {showPasswordGenerator && (
          <PasswordGenerator
            watchPassword={watchPassword}
            handleUsePassword={handleUsePassword}
          ></PasswordGenerator>
        )}
      </div>
    </>
  );
};

export default PasswordInformation;
