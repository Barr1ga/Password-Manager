import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineRefresh,
  HiPlus,
  HiOutlineX,
  HiOutlinePencil,
} from "react-icons/hi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import ConfirmModal from "../helpers/ConfirmModal";
import PasswordGenerator from "../PasswordGenerator";
import TextareaAutosize from "react-textarea-autosize";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import { createIdentificationItem } from "../../features/slice/passwordSlice";
import { updateIdentificationItem, getBrandDetails } from "../../features/slice/passwordSlice";
import { useDispatch, useSelector } from "react-redux";

const AddItemModal = ({
  method,
  showPasswordGenerator,
  setShowPasswordGenerator,
}) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [folders, setFolders] = useState(["folder1", "folder2", "folder3"]);
  const [titles, setTitles] = useState(["Mr", "Mrs", "Ms", "Dr"]);
  const [favorite, setFavorite] = useState(false);
  const [title, setTitle] = useState(false);
  const folderRef = useRef();
  const titleRef = useRef();

  const dispatch = useDispatch();

  const {selectedPassword} = useSelector((state) => state.passwords);

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
    if (method === "update") {
      if (selectedPassword) {
        dispatch(updateIdentificationItem({id:selectedPassword, data}));
        dispatch(getBrandDetails({brand: data.name, id: selectedPassword}))
      }
      return;
    } 
    dispatch(createIdentificationItem(data));
    console.log(data);
  };

  const handleOnBlurFolder = () => {
    if (!hovering) {
      setShowFolder(false);
    }
  };

  const handleOnBlurTitle = () => {
    if (!hovering) {
      setShowTitle(false);
    }
  };

  const handleUsePassword = (password) => {
    console.log(password);
    setShowPasswordGenerator(false);
    setValue("password", password);
  };

  const handleFavorite = () => {
    setFavorite((prev) => !prev);
  };

  return (
    <>
      {!showPasswordGenerator && (
        <>
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
                  {errors.name.message}
                  <br></br>
                </small>
              )}
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
                  {errors.password.message}
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
                  type="text"
                  readOnly
                  {...register("folder")}
                  ref={titleRef}
                  className="form-control"
                  onFocus={() => setShowTitle(true)}
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
                  {titles.length !== 0 &&
                    titles.map((title, idx) => (
                      <div
                        key={idx}
                        className="option padding-side "
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                        onClick={() => {
                          titleRef.current.value = title;
                          setShowTitle(false);
                          setHovering(false);
                        }}
                      >
                        {title}
                      </div>
                    ))}
                </div>
              )}
              {titleError && (
                <small className="error-message">
                  Title is required
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
                  errors.middleName
                    ? "form-control form-error"
                    : "form-control "
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
                    {errors.userName.message}
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
                  errors.licenseNumber
                    ? "form-control form-error"
                    : "form-control "
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
                    errors.address1
                      ? "form-control form-error"
                      : "form-control "
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
                    errors.address2
                      ? "form-control form-error"
                      : "form-control "
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
                    errors.address3
                      ? "form-control form-error"
                      : "form-control "
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
                    errors.cityOrTown
                      ? "form-control form-error"
                      : "form-control "
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
              <div className="input">
                <input
                  type="text"
                  readOnly
                  {...register("folder")}
                  ref={folderRef}
                  className="form-control"
                  onFocus={() => setShowFolder(true)}
                  onBlur={handleOnBlurFolder}
                />
                {showFolder ? (
                  <RiArrowUpSLine className="icon"></RiArrowUpSLine>
                ) : (
                  <RiArrowDownSLine className="icon"></RiArrowDownSLine>
                )}
              </div>
              {showFolder && (
                <div className="select-options folder-options">
                  {folders.length === 0 && (
                    <div className="option disabled">No folders found</div>
                  )}
                  {folders.length !== 0 &&
                    folders.map((folder, idx) => (
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
                  {errors.folder.message}
                  <br></br>
                </small>
              )}
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

            {method === "update" ? (
              <Button type="submit" className="btn-dark btn-long btn-with-icon">
                <HiOutlinePencil></HiOutlinePencil>Update Item
              </Button>
            ) : (
              <Button type="submit" className="btn-dark btn-long btn-with-icon">
                <HiPlus></HiPlus>Add Item
              </Button>
            )}
          </form>
        </>
      )}

      {showPasswordGenerator && (
        <PasswordGenerator
          watchPassword={watchPassword}
          handleUsePassword={handleUsePassword}
        ></PasswordGenerator>
      )}
    </>
  );
};

export default AddItemModal;
