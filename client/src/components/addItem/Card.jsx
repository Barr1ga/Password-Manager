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
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import ConfirmModal from "../helpers/ConfirmModal";
import PasswordGenerator from "../PasswordGenerator";
import TextareaAutosize from "react-textarea-autosize";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import Select from "react-select";
import { createCardItem } from "../../features/slice/passwordSlice";
import { updateCardItem } from "../../features/slice/passwordSlice";
import { useDispatch } from "react-redux";


const AddItemModal = ({method, showPasswordGenerator, setShowPasswordGenerator, defaultValues}) => {
  const [showNumberInput, setShowNumberInput] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [brandError, setBrandError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [folders, setFolders] = useState([]);
  const [brands, setBrands] = useState([
    "Visa",
    "Master Card",
    "American Express",
    "Discover",
    "JCB",
    "Maestry",
    "UnionPay",
    "RuPay",
    "Other",
  ]);
  const [months, setMonths] = useState([
    "01 - January",
    "02 - February",
    "03 - March",
    "04 - April",
    "05 - May",
    "06 - June",
    "07 - July",
    "08 - August",
    "09 - September",
    "10 - October",
    "11 - November",
    "12 - December",
  ]);
  const [favorite, setFavorite] = useState(false);
  const folderRef = useRef();
  const brandRef = useRef();
  const monthRef = useRef();

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const watchPassword = watch("password");

  const onSubmit = (data) => {
    dispatch(createCardItem(data))
    if(method === "update"){
      dispatch(updateCardItem(data))
    }
    console.log(data);
  };

  const handleOnBlurFolder = () => {
    if (!hovering) {
      setShowFolder(false);
    }
  };

  const handleOnBlurBrand = () => {
    if (brandRef.current.value === "") {
      setBrandError(true);
    } else {
      setBrandError(false);
    }

    if (!hovering) {
      setShowBrand(false);
    }
  };

  const handleOnBlurMonth = () => {
    if (monthRef.current.value === "") {
      setMonthError(true);
    } else {
      setMonthError(false);
    }

    if (!hovering) {
      setShowMonth(false);
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
                Name of the Item<span className="error-message">*</span>
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
                  errors.cardHolder
                    ? "form-control form-error"
                    : "form-control "
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
                    brandError ? "form-control form-error" : "form-control "
                  }
                  onFocus={() => setShowBrand(true)}
                  onBlur={handleOnBlurBrand}
                />
                {showBrand ? (
                  <RiArrowUpSLine className="icon"></RiArrowUpSLine>
                ) : (
                  <RiArrowDownSLine className="icon"></RiArrowDownSLine>
                )}
              </div>
              {showBrand && (
                <div className="select-options folder-options">
                  {brands.map((brand, idx) => (
                    <div
                      key={idx}
                      className="option padding-side "
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => setHovering(false)}
                      onClick={() => {
                        brandRef.current.value = brand;
                        setShowBrand(false);
                        setHovering(false);
                      }}
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              )}
              {brandError && (
                <small className="error-message">
                  ⚠ Brand is required
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
                  type={showNumberInput ? "text" : "password"}
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Number is required",
                    },
                  })}
                  className={
                    errors.number ? "form-control form-error" : "form-control "
                  }
                />
                <div className="interactions">
                  {showNumberInput ? (
                    <HiOutlineEye
                      onClick={() => setShowNumberInput(false)}
                    ></HiOutlineEye>
                  ) : (
                    <HiOutlineEyeOff
                      onClick={() => setShowNumberInput(true)}
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

            <div className="form-group-horizontal">
              <div className="form-group form-select-group">
                <label>Expiration Month</label>
                <div className="input">
                  <input
                    type="text"
                    readOnly
                    {...register("expirationMonth")}
                    ref={monthRef}
                    className={
                      monthError ? "form-control form-error" : "form-control "
                    }
                    onFocus={() => setShowMonth(true)}
                    onBlur={handleOnBlurMonth}
                  />
                  {showMonth ? (
                    <RiArrowUpSLine className="icon"></RiArrowUpSLine>
                  ) : (
                    <RiArrowDownSLine className="icon"></RiArrowDownSLine>
                  )}
                </div>
                {showMonth && (
                  <div className="select-options folder-options">
                    {months.map((month, idx) => (
                      <div
                        key={idx}
                        className="option padding-side "
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                        onClick={() => {
                          monthRef.current.value = month;
                          setShowMonth(false);
                          setHovering(false);
                        }}
                      >
                        {month}
                      </div>
                    ))}
                  </div>
                )}
                {monthError && (
                  <small className="error-message">
                    ⚠ Expiration Month is required
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
                    errors.expirationYear
                      ? "form-control form-error"
                      : "form-control "
                  }
                />
                {errors.expirationYear && (
                  <small className="error-message">
                    ⚠ {errors.expirationYear.message}
                    <br></br>
                  </small>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>
                Security Code (CVV) <span className="error-message">*</span>
              </label>
              <span className="password-input">
                <input
                  type={showCodeInput ? "text" : "password"}
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Securit Code is required",
                    },
                  })}
                  className={
                    errors.number ? "form-control form-error" : "form-control "
                  }
                />
                <div className="interactions">
                  {showCodeInput ? (
                    <HiOutlineEye
                      onClick={() => setShowCodeInput(false)}
                    ></HiOutlineEye>
                  ) : (
                    <HiOutlineEyeOff
                      onClick={() => setShowCodeInput(true)}
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
