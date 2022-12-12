import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { HiPlus, HiOutlinePencil } from "react-icons/hi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
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

const titles = ["Mr", "Mrs", "Ms", "Dr"];

const Identifications = ({
  currentImage,
  setCurrentImageLetter,
  method,
  defaultValues,
  setConfirmClose,
}) => {
  const [showFolder, setShowFolder] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
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
  const [titleError, setTitleError] = useState(false);
  const [isDropdownsDirty, setIsDropDownsDirty] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setFormData] = useState("");

  const handleClose = () => setShowConfirmationModal(false);
  const handleShow = () => setShowConfirmationModal(true);
  const titleRef = useRef();
  const folderRef = useRef();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const watchName = watch("name");

  useEffect(() => {
    if (defaultValues && defaultValues.type === "identification") {
      titleRef.current.value = defaultValues?.title;
    }
  }, [titleRef]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setAssignedFolders(defaultValues.folders);
      titleRef.current.value = defaultValues?.title;
    }

    return () => {
      reset();
    };
  }, [defaultValues, reset]);

  useEffect(() => {
    if (itemFulfilled || itemError) {
      setUpdateLoading(false);
      setCreateLoading(false);
      dispatch(resetItemQueryFulfilled());
      handleClose();
    }
  }, [itemFulfilled, itemError]);

  useEffect(() => {
    if (watchName !== "") {
      setCurrentImageLetter(watchName?.charAt(0));
    }
  }, [setCurrentImageLetter, watchName]);

  const onSubmit = (data) => {
    if (data.uid) {
      delete data.uid;
    }
    let newData = {
      uid: authUser.uid,
      itemData: {
        ...data,
        type: "identification",
        title: titleRef?.current?.value,
        image: currentImage,
        favorite,
        folders: assignedFolders,
        trash: false,
      },
    };

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
      setShowFolder(false);
    }
  };

  const handleFocusTitle = () => {
    setShowTitle(true);
  };

  const handleOnBlurTitle = () => {
    if (!hovering) {
      if (!titleRef?.current.value || titleRef?.current.value === "") {
        setTitleError(true);
      }
      setShowTitle(false);
    }
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

  const handleSelectTitle = (title) => {
    if (defaultValues) {
      if (title === defaultValues.title) {
        setIsDropDownsDirty(false);
      } else {
        setIsDropDownsDirty(true);
      }
    }
    console.log(title);
    titleRef.current.value = title;
    setShowTitle(false);
    setHovering(false);
    setTitleError(false);
  };

  let filteredFolders = folders.filter(
    (folder) => !assignedFolders.includes(folder.name)
  );
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>
            Name of the Item <span className="error-message">*</span>
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
              {errors.name.message}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group form-select-group">
          <label>
            Title <span className="error-message">*</span>
          </label>
          <div className="input">
            <input
              placeholder="Select Title"
              type="text"
              readOnly
              {...register("title")}
              ref={titleRef}
              className={
                titleError ? "form-control form-error" : "form-control "
              }
              onFocus={handleFocusTitle}
              onBlur={handleOnBlurTitle}
            />
            {showTitle ? (
              <RiArrowUpSLine className="icon"></RiArrowUpSLine>
            ) : (
              <RiArrowDownSLine className="icon"></RiArrowDownSLine>
            )}
          </div>
          {showTitle && (
            <div className="select-options title-options">
              {titles.map((title, idx) => (
                <div
                  key={idx}
                  className="option padding-side "
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  onClick={() => handleSelectTitle(title)}
                >
                  {title}
                </div>
              ))}
            </div>
          )}
          {titleError && (
            <small className="error-message">
              {"Title is required"}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            First Name <span className="error-message">*</span>
          </label>
          <input
            type="text"
            {...register("firstName", {
              required: {
                value: true,
                message: "First Name is required",
              },
            })}
            className={
              errors.firstName ? "form-control form-error" : "form-control "
            }
          />
          {errors.firstName && (
            <small className="error-message">
              {errors.firstName.message}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Middle Name <span className="error-message">*</span>
          </label>
          <input
            type="text"
            {...register("middleName", {
              required: {
                value: true,
                message: "Middle Name is required",
              },
            })}
            className={
              errors.middleName ? "form-control form-error" : "form-control "
            }
          />
          {errors.middleName && (
            <small className="error-message">
              {errors.middleName.message}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Last Name <span className="error-message">*</span>
          </label>
          <input
            type="text"
            {...register("lastName", {
              required: {
                value: true,
                message: "Last Name is required",
              },
            })}
            className={
              errors.lastName ? "form-control form-error" : "form-control "
            }
          />
          {errors.lastName && (
            <small className="error-message">
              {errors.lastName.message}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group-horizontal">
          <div className="form-group">
            <label>
              Username <span className="error-message">*</span>
            </label>
            <input
              type="text"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
              className={
                errors.username ? "form-control form-error" : "form-control "
              }
            />
            {errors.username && (
              <small className="error-message">
                {errors.username.message}
                <br></br>
              </small>
            )}
          </div>

          <div className="form-group">
            <label>
              Company <span className="error-message">*</span>
            </label>
            <input
              type="text"
              {...register("company", {
                required: {
                  value: true,
                  message: "Company is required",
                },
              })}
              className={
                errors.company ? "form-control form-error" : "form-control "
              }
            />
            {errors.company && (
              <small className="error-message">
                {errors.company.message}
                <br></br>
              </small>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>
            Social Security Number <span className="error-message">*</span>
          </label>
          <input
            type="text"
            {...register("socialSecurityNumber", {
              required: {
                value: true,
                message: "Social Security Number is required",
              },
            })}
            className={
              errors.socialSecurityNumber
                ? "form-control form-error"
                : "form-control "
            }
          />
          {errors.socialSecurityNumber && (
            <small className="error-message">
              {errors.socialSecurityNumber.message}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Passport Number <span className="error-message">*</span>
          </label>
          <input
            type="text"
            {...register("passportNumber", {
              required: {
                value: true,
                message: "Passport Number is required",
              },
            })}
            className={
              errors.passportNumber
                ? "form-control form-error"
                : "form-control "
            }
          />
          {errors.passportNumber && (
            <small className="error-message">
              {errors.passportNumber.message}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            License Number <span className="error-message">*</span>
          </label>
          <input
            type="text"
            {...register("licenseNumber", {
              required: {
                value: true,
                message: "License Number is required",
              },
            })}
            className={
              errors.licenseNumber ? "form-control form-error" : "form-control "
            }
          />
          {errors.licenseNumber && (
            <small className="error-message">
              {errors.licenseNumber.message}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group-horizontal">
          <div className="form-group">
            <label>
              Email <span className="error-message">*</span>
            </label>
            <input
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              className={
                errors.email ? "form-control form-error" : "form-control "
              }
            />
            {errors.email && (
              <small className="error-message">
                {errors.email.message}
                <br></br>
              </small>
            )}
          </div>

          <div className="form-group">
            <label>
              Phone <span className="error-message">*</span>
            </label>
            <input
              type="text"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone is required",
                },
              })}
              className={
                errors.phone ? "form-control form-error" : "form-control "
              }
            />
            {errors.phone && (
              <small className="error-message">
                {errors.phone.message}
                <br></br>
              </small>
            )}
          </div>
        </div>

        <div className="form-group-horizontal">
          <div className="form-group">
            <label>
              Address 1 <span className="error-message">*</span>
            </label>
            <input
              type="text"
              {...register("address1", {
                required: {
                  value: true,
                  message: "Address 1 is required",
                },
              })}
              className={
                errors.address1 ? "form-control form-error" : "form-control "
              }
            />
            {errors.address1 && (
              <small className="error-message">
                {errors.address1.message}
                <br></br>
              </small>
            )}
          </div>

          <div className="form-group">
            <label>
              Address 2 <span className="error-message">*</span>
            </label>
            <input
              type="text"
              {...register("address2", {
                required: {
                  value: true,
                  message: "Address 2 is required",
                },
              })}
              className={
                errors.address2 ? "form-control form-error" : "form-control "
              }
            />
            {errors.address2 && (
              <small className="error-message">
                {errors.address2.message}
                <br></br>
              </small>
            )}
          </div>
        </div>

        <div className="form-group-horizontal">
          <div className="form-group">
            <label>
              Address 3 <span className="error-message">*</span>
            </label>
            <input
              type="text"
              {...register("address3", {
                required: {
                  value: true,
                  message: "Address 3 is required",
                },
              })}
              className={
                errors.address3 ? "form-control form-error" : "form-control "
              }
            />
            {errors.address3 && (
              <small className="error-message">
                {errors.address3.message}
                <br></br>
              </small>
            )}
          </div>

          <div className="form-group">
            <label>
              City / Town <span className="error-message">*</span>
            </label>
            <input
              type="text"
              {...register("cityOrTown", {
                required: {
                  value: true,
                  message: "City / Town is required",
                },
              })}
              className={
                errors.cityOrTown ? "form-control form-error" : "form-control "
              }
            />
            {errors.cityOrTown && (
              <small className="error-message">
                {errors.cityOrTown.message}
                <br></br>
              </small>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>
            Country <span className="error-message">*</span>
          </label>
          <input
            type="text"
            {...register("country", {
              required: {
                value: true,
                message: "Country is required",
              },
            })}
            className={
              errors.country ? "form-control form-error" : "form-control "
            }
          />
          {errors.country && (
            <small className="error-message">
              {errors.country.message}
              <br></br>
            </small>
          )}
        </div>

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
                ref={folderRef}
                placeholder={
                  assignedFolders.length === 0 ? "Select Folder" : ""
                }
                type="text"
                onFocus={() => setShowFolder(true)}
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

        <div className="form-group">
          <label>Notes</label>
          <TextareaAutosize
            {...register("notes")}
            className="form-control"
            minRows={3}
            maxRows={5}
          />
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
                      {"Are you sure you want to save and update this item?"}
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
                  disabled={
                    (!isDirty || !isValid) && !isDropdownsDirty && !titleError
                  }
                >
                  <HiPlus></HiPlus>Add Item
                </Button>
              )}
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default Identifications;
