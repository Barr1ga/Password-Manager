import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineRefresh,
  HiPlus,
  HiOutlinePencil,
} from "react-icons/hi";
import PasswordGenerator from "../PasswordGenerator";
import TextareaAutosize from "react-textarea-autosize";
import { HiStar } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  createItem,
  resetItemQueryFulfilled,
  updateItem,
} from "../../features/slice/itemSlice";
import SpinnerLoader from "../SpinnerLoader";
import { createLog } from "../../features/slice/auditLogSlice";
const CryptoJS = require("crypto-js");

const Logins = ({
  currentImage,
  setCurrentImageLetter,
  method,
  showPasswordGenerator,
  setShowPasswordGenerator,
  defaultValues,
  isNotOwner,
  setConfirmClose,
}) => {
  const [showPasswordInput, setShowConfirmationModalPasswordInput] =
    useState(false);
  const [showFolder, setShowConfirmationModalFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [favorite, setFavorite] = useState(defaultValues?.favorite || false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [assignedFolders, setAssignedFolders] = useState(
    defaultValues?.folders || []
  );
  const [search, setSearch] = useState("");
  const { folders } = useSelector((state) => state.folders);
  const {
    items,
    itemFulfilled,
    itemError,
    itemUpdatedFullfilled,
    itemCreatedFullfilled,
  } = useSelector((state) => state.items);
  const { authUser } = useSelector((state) => state.auth);
  const [isDropdownsDirty, setIsDropDownsDirty] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setFormData] = useState("");

  const handleClose = () => setShowConfirmationModal(false);
  const handleShow = () => setShowConfirmationModal(true);

  const folderRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setAssignedFolders(defaultValues.folders);
    }

    return () => {
      reset();
    };
  }, [defaultValues, reset]);

  const watchPassword = watch("password");
  const watchName = watch("name");

  useEffect(() => {
    if (watchName !== "") {
      setCurrentImageLetter(watchName?.charAt(0));
    }
  }, [setCurrentImageLetter, watchName]);

  useEffect(() => {
    if (itemFulfilled || itemError) {
      setUpdateLoading(false);
      setCreateLoading(false);
      dispatch(resetItemQueryFulfilled());
      handleClose();
    }
  }, [itemFulfilled, itemError]);

  const onSubmit = (data) => {
    if (data.uid) {
      delete data.uid;
    }

    let newData = {
      uid: authUser.uid,
      itemData: {
        ...data,
        type: "login",
        image: currentImage,
        favorite,
        folders: assignedFolders,
        trash: false,
      },
    };

    // encrypt
    for (const key in newData.itemData) {
      if (
        key !== "favorite" &&
        key !== "trash" &&
        key !== "folders" &&
        key !== "type" &&
        key !== "image"
      ) {
        newData.itemData[key] = CryptoJS.AES.encrypt(
          newData.itemData[key],
          authUser.uid
        ).toString();
      }
    }

    console.log(newData);

    if (method === "create") {
      setCreateLoading(true);
      dispatch(createItem(newData));

      const auditData = {
        uid: authUser.uid,
        auditLogData: {
          actorUid: authUser.uid,
          action: "item/create",
          description: "created the item",
          benefactor: newData.itemData.name,
          date: new Date(),
        },
      };
      dispatch(createLog(auditData));
    }

    if (method === "update") {
      newData.itemUid = defaultValues.uid;
      setFormData(newData);
      handleShow();
    }
  };

  const handleUpdateItemData = () => {
    setUpdateLoading(true);

    dispatch(updateItem(formData));

    const auditData = {
      uid: authUser.uid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "item/update",
        description: "updated the item",
        benefactor: formData.itemData.name,
      },
    };
    dispatch(createLog(auditData));
  };

  const handleOnBlurFolder = () => {
    if (!hovering) {
      setShowConfirmationModalFolder(false);
    }
  };

  const handleUsePassword = (password) => {
    setShowPasswordGenerator(false);
    setValue("password", password);
  };

  const handleFavorite = () => {
    setFavorite((prev) => !prev);
  };

  // folders
  const handleSelectFolder = (folder) => {
    setAssignedFolders([...assignedFolders, folder]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      if (search === "" && assignedFolders.length > 0) {
        setAssignedFolders(assignedFolders.slice(0, -1));
      }
    }
  };

  let filteredFolders = folders.filter(
    (folder) => !assignedFolders.includes(folder.name)
  );
  console.log(filteredFolders);
  filteredFolders =
    search !== ""
      ? filteredFolders.filter((folder) =>
          folder.name.toLowerCase().includes(search.toLowerCase())
        )
      : filteredFolders;

  if (setConfirmClose) {
    if (isDirty) {
      setConfirmClose(true);
    } else {
      setConfirmClose(false);
    }
  }
  console.log(isNotOwner);
  return (
    <>
      {!showPasswordGenerator && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>
                Name of the Item<span className="error-message">*</span>
              </label>
              <input
                readOnly={isNotOwner}
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
                  {errors.name.message}
                  <br></br>
                </small>
              )}
            </div>

            <div className="form-group">
              <label>
                Domain / Link <span className="error-message">*</span>
              </label>
              <input
                readOnly={isNotOwner}
                type="text"
                {...register("domain", {
                  required: {
                    value: true,
                    message: "Domain is required",
                  },
                })}
                className={
                  errors.domain ? "form-control form-error" : "form-control "
                }
              />
              {errors.domain && (
                <small className="error-message">
                  {errors.domain.message}
                  <br></br>
                </small>
              )}
            </div>

            <div className="form-group">
              <label>
                Username <span className="error-message">*</span>
              </label>
              <input
                readOnly={isNotOwner}
                type="text"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                })}
                className={
                  errors.userName ? "form-control form-error" : "form-control "
                }
              />
              {errors.userName && (
                <small className="error-message">
                  {errors.userName.message}
                  <br></br>
                </small>
              )}
              <small>
                Username can be your email or username depending on the login
                requirements of the item.
              </small>
            </div>

            <div className="form-group">
              <label>
                Password <span className="error-message">*</span>
              </label>
              <span className="password-input">
                <input
                  readOnly={isNotOwner}
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
                      onClick={() =>
                        setShowConfirmationModalPasswordInput(false)
                      }
                    ></HiOutlineEye>
                  ) : (
                    <HiOutlineEyeOff
                      onClick={() =>
                        setShowConfirmationModalPasswordInput(true)
                      }
                    ></HiOutlineEyeOff>
                  )}

                  {!isNotOwner && (
                    <HiOutlineRefresh
                      className="generate-password"
                      onClick={() => setShowPasswordGenerator(true)}
                    ></HiOutlineRefresh>
                  )}
                </div>
              </span>
              {errors.password && (
                <small className="error-message">
                  {errors.password.message}
                  <br></br>
                </small>
              )}
            </div>

            {!isNotOwner && (
              <div className="form-group form-select-group">
                <label>Folder</label>
                <div
                  className="form-group"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <div
                    className={
                      showFolder ? "form-pills form-pills-active" : "form-pills"
                    }
                    onBlur={handleOnBlurFolder}
                  >
                    {assignedFolders.map((folder, idx) => (
                      <div key={idx} className="pill">
                        <small>{folder}</small>
                        <HiPlus
                          className="btn-delete"
                          onClick={() =>
                            setAssignedFolders(
                              assignedFolders.filter((_, i) => i !== idx)
                            )
                          }
                        ></HiPlus>
                      </div>
                    ))}
                    <input
                      readOnly={isNotOwner}
                      ref={folderRef}
                      placeholder={
                        assignedFolders.length === 0 ? "Select Folder" : ""
                      }
                      type="text"
                      onFocus={() => setShowConfirmationModalFolder(true)}
                      onBlur={handleOnBlurFolder}
                      onKeyDown={(e) => handleKeyDown(e)}
                      onChange={(e) => setSearch(e.target.value)}
                      className="form-control-borderless"
                      autoComplete="off"
                    />
                  </div>
                  {showFolder && (
                    <div className="select-options folder-options">
                      {filteredFolders.length === 0 && (
                        <div className="option disabled">No folders found</div>
                      )}
                      {filteredFolders.length !== 0 &&
                        filteredFolders.map((folder, idx) => (
                          <div
                            key={idx}
                            className="option padding-side "
                            onClick={() => {
                              handleSelectFolder(folder.name);
                              folderRef?.current.focus();
                            }}
                          >
                            {folder.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Notes</label>
              <TextareaAutosize
                readOnly={isNotOwner}
                {...register("notes")}
                className="form-control"
                minRows={3}
                maxRows={5}
              />
            </div>

            {!isNotOwner && (
              <>
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
                  {method === "update" ? (
                    <>
                      <Button
                        type="submit"
                        className="btn-dark btn-long btn-with-icon"
                        disabled={
                          (!isDirty || !isValid) &&
                          favorite === defaultValues.favorite &&
                          !isDropdownsDirty &&
                          assignedFolders === defaultValues.folders
                        }
                      >
                        <HiOutlinePencil></HiOutlinePencil>Update Item
                      </Button>
                      <Modal
                        size="sm"
                        show={showConfirmationModal}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                      >
                        <Modal.Body className="confirmation-modal-body">
                          <div className="confirmation-modal">
                            <h5>
                              {
                                "Are you sure you want to save and update this item?"
                              }
                            </h5>
                            <small>
                              {
                                "This will update the information you use for this item."
                              }
                            </small>
                            <div className="options gap-10">
                              <Button
                                type="button"
                                className="btn-secondary btn-long"
                                onClick={handleClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleUpdateItemData}
                                type="button"
                                className="btn-dark btn-long"
                              >
                                {updateLoading ? (
                                  <SpinnerLoader></SpinnerLoader>
                                ) : (
                                  <>Save</>
                                )}
                              </Button>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </>
                  ) : (
                    <>
                      {createLoading ? (
                        <Button
                          type="button"
                          className="btn-dark btn-long btn-with-icon"
                        >
                          <SpinnerLoader></SpinnerLoader>
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="btn-dark btn-long btn-with-icon"
                          disabled={!isDirty || !isValid}
                        >
                          <HiPlus></HiPlus>Add Item
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </form>
        </>
      )}

      {showPasswordGenerator && (
        <PasswordGenerator
          method={method}
          watchPassword={watchPassword}
          handleUsePassword={handleUsePassword}
        ></PasswordGenerator>
      )}
    </>
  );
};

export default Logins;
