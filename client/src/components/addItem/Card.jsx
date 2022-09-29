import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineRefresh,
  HiPlus,
  HiOutlineX,
} from "react-icons/hi";
import { RiArrowDownSLine } from "react-icons/ri";
import ConfirmModal from "../helpers/ConfirmModal";
import PasswordGenerator from "../PasswordGenerator";
import TextareaAutosize from "react-textarea-autosize";
import { HiStar, HiOutlineStar } from "react-icons/hi";

const AddItemModal = ({ showPasswordGenerator, setShowPasswordGenerator }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [folders, setFolders] = useState(["folder1", "folder2", "folder3"]);
  const [brands, setBrands] = useState(["Visa", "MasterCard", "AmericanExpress", "Discover", "JCB"]);
  const [months, setMonths] = useState(["01 - January", "02 - February", "03 - March"]);
  const [favorite, setFavorite] = useState(false);
  const folderRef = useRef();
  const brandRef = useRef();
  const monthRef = useRef();

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
                  ⚠ {errors.name.message}
                  <br></br>
                </small>
              )}
            </div>

            <div className="form-group">
              <label>
                Card Holder Name <span className="error-message">*</span>
              </label>
              <input
                type="text"
                {...register("cardHolder", {
                  required: {
                    value: true,
                    message: "Card Holder Name is required",
                  },
                })}
                className={
                  errors.cardHolder ? "form-control form-error" : "form-control "
                }
              />
              {errors.cardHolder && (
                <small className="error-message">
                  ⚠ {errors.cardHolder.message}
                  <br></br>
                </small>
              )}
            </div>

            <div className="form-group form-select-group">
              <label>Brand</label>
              <div className="input">
                <input
                  type="text"
                  readOnly
                  {...register("brand")}
                  ref={brandRef}
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
                  {brands.map((brand, idx) => (
                    <div
                      key={idx}
                      className="option padding-side "
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => setHovering(false)}
                      onClick={() => {
                        brandRef.current.value = brand;
                        setShowFolder(false);
                        setHovering(false);
                      }}
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              )}
              {errors.brand && (
                <small className="error-message">
                  ⚠ {errors.brand.message}
                  <br></br>
                </small>
              )}
            </div>


            <div className="form-group">
              <label>
                Number <span className="error-message">*</span>
              </label>
              <span className="password-input">
                <input
                  type={showPasswordInput ? "text" : "password"}
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Number is required",
                    },
                  })}
                  className={
                    errors.number
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
                </div>
              </span>
              {errors.number && (
                <small className="error-message">
                  ⚠ {errors.number.message}
                  <br></br>
                </small>
              )}
            </div>

            <div className="form-group form-select-group">
              <label>Expiration Month</label>
              <div className="input">
                <input
                  type="text"
                  readOnly
                  {...register("folder")}
                  ref={monthRef}
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
                  {months.map((month, idx) => (
                    <div
                      key={idx}
                      className="option padding-side "
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => setHovering(false)}
                      onClick={() => {
                        brandRef.current.value = month;
                        setShowFolder(false);
                        setHovering(false);
                      }}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
              {errors.months && (
                <small className="error-message">
                  ⚠ {errors.months.message}
                  <br></br>
                </small>
              )}
            </div>

            <div className="form-group">
              <label>
                Expiration Year <span className="error-message">*</span>
              </label>
              <input
                type="text"
                {...register("expirationYear", {
                  required: {
                    value: true,
                    message: "Expiration Year is required",
                  },
                })}
                className={
                  errors.expirationYear ? "form-control form-error" : "form-control "
                }
              />
              {errors.expirationYear && (
                <small className="error-message">
                  ⚠ {errors.expirationYear.message}
                  <br></br>
                </small>
              )}
            </div>


            <div className="form-group">
              <label>
                Security Code (CVV) <span className="error-message">*</span>
              </label>
              <span className="password-input">
                <input
                  type={showPasswordInput ? "text" : "password"}
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Securit Code is required",
                    },
                  })}
                  className={
                    errors.number
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
                </div>
              </span>
              {errors.number && (
                <small className="error-message">
                  ⚠ {errors.number.message}
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

            <Button type="submit" className="btn-dark btn-long btn-with-icon">
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
    </>
  );
};

export default AddItemModal;
