import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiPlus,
  HiOutlinePencil,
} from "react-icons/hi";
import TextareaAutosize from "react-textarea-autosize";
import { HiStar } from "react-icons/hi";
import {
  createItem,
  resetItemQueryFulfilled,
  updateItem,
} from "../../features/slice/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import SpinnerLoader from "../SpinnerLoader";
import { createLog } from "../../features/slice/auditLogSlice";

const expirationMonths = [
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
];

const brands = [
  "Visa",
  "Mastercard",
  "American Express",
  "Discover",
  "Diners Club",
  "JCB",
  "Maestro",
  "UnionPay",
  "RuPay",
  "Mir",
  "Other",
];

const Card = ({
  currentImage,
  setCurrentImageLetter,
  method,
  defaultValues,
  setConfirmClose,
}) => {
  const [showNumberInput, setShowNumberInput] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [favorite, setFavorite] = useState(defaultValues?.favorite || false);
  const [assignedFolders, setAssignedFolders] = useState(
    defaultValues?.folders || []
  );
  const [updateLoading, setUpdateLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
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
  const folderRef = useRef();
  const [showBrands, setShowBrands] = useState(false);
  const [brandError, setBrandError] = useState(false);
  const brandRef = useRef();
  const [showExpirationMonths, setShowExpirationMonths] = useState(false);
  const [expirationMonthError, setExpirationMonthError] = useState(false);
  const expirationMonthRef = useRef();
  const [isDropdownsDirty, setIsDropDownsDirty] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setFormData] = useState("");

  const handleClose = () => setShowConfirmationModal(false);
  const handleShow = () => setShowConfirmationModal(true);
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
    if (defaultValues && defaultValues.type === "card") {
      brandRef.current.value = defaultValues?.brand;
      expirationMonthRef.current.value = defaultValues?.expirationMonth;
    }
  }, [brandRef, expirationMonthRef]);

  useEffect(() => {
    if (watchName !== "") {
      setCurrentImageLetter(watchName?.charAt(0));
    }
  }, [setCurrentImageLetter, watchName]);

  useEffect(() => {
    if (itemFulfilled || itemError) {
      setUpdateLoading(false);
      setCreateLoading(false);
      handleClose();
    }
  }, [itemFulfilled, itemError]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setAssignedFolders(defaultValues.folders);
      brandRef.current.value = defaultValues?.brand;
      expirationMonthRef.current.value = defaultValues?.expirationMonth;
    }

    return () => {
      reset();
    };
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    if (data.uid) {
      delete data.uid;
    }
    let newData = {
      uid: authUser.uid,
      itemData: {
        ...data,
        type: "card",
        brand: brandRef?.current?.value,
        expirationMonth: expirationMonthRef?.current?.value,
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

  useEffect(() => {
    if (defaultValues) {
      if (
        brandRef?.current?.value === defaultValues.brand &&
        expirationMonthRef?.current?.value === defaultValues.expirationMonth
      ) {
        setIsDropDownsDirty(false);
      }
    }
  }, [brandRef?.current?.value, expirationMonthRef?.current?.value]);

  const handleSelectBrand = (brand) => {
    if (defaultValues) {
      if (brand !== defaultValues.brand) {
        setIsDropDownsDirty(true);
      }
    }

    brandRef.current.value = brand;
    setShowBrands(false);
    setHovering(false);
    setBrandError(false);
  };

  const handleSelectExpirationMonth = (expirationMonth) => {
    if (defaultValues) {
      if (expirationMonth !== defaultValues.expirationMonth) {
        setIsDropDownsDirty(true);
      }
    }
    expirationMonthRef.current.value = expirationMonth;
    setShowExpirationMonths(false);
    setHovering(false);
    setExpirationMonthError(false);
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

  // brand
  const handleFocusBrand = () => {
    setShowBrands(true);
  };

  const handleOnBlurBrand = () => {
    if (!hovering) {
      if (!brandRef?.current.value || brandRef?.current.value === "") {
        setBrandError(true);
      }
      setShowBrands(false);
    }
  };

  // expirationMonth
  const handleFocusExpirationMonth = () => {
    setShowExpirationMonths(true);
  };

  const handleOnBlurExpirationMonth = () => {
    if (!hovering) {
      if (
        !expirationMonthRef?.current.value ||
        expirationMonthRef?.current.value === ""
      ) {
        setExpirationMonthError(true);
      }
      setShowExpirationMonths(false);
    }
  };

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
              {errors.name.message}
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
            {...register("cardHolderName", {
              required: {
                value: true,
                message: "Card Holder Name is required",
              },
            })}
            className={
              errors.cardHolderName
                ? "form-control form-error"
                : "form-control "
            }
          />
          {errors.cardHolderName && (
            <small className="error-message">
              {errors.cardHolderName.message}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group form-select-group">
          <label>
            Brand <span className="error-message">*</span>
          </label>
          <div className="input">
            <input
              placeholder="Select Brand"
              type="text"
              readOnly
              {...register("brand")}
              ref={brandRef}
              className={
                brandError ? "form-control form-error" : "form-control "
              }
              onFocus={handleFocusBrand}
              onBlur={handleOnBlurBrand}
            />
            {showBrands ? (
              <RiArrowUpSLine className="icon"></RiArrowUpSLine>
            ) : (
              <RiArrowDownSLine className="icon"></RiArrowDownSLine>
            )}
          </div>

          {showBrands && (
            <div className="select-options title-options">
              {brands.map((brand, idx) => (
                <div
                  key={idx}
                  className="option padding-side "
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  onClick={() => handleSelectBrand(brand)}
                >
                  {brand}
                </div>
              ))}
            </div>
          )}
          {brandError && (
            <small className="error-message">
              {"Expiration Month is required"}
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
              {errors.number.message}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group-horizontal">
          <div className="form-group form-select-group">
            <label>
              Expiration Month <span className="error-message">*</span>
            </label>
            <div className="input">
              <input
                placeholder="Select Month"
                type="text"
                readOnly
                {...register("expirationMonth")}
                ref={expirationMonthRef}
                className={
                  expirationMonthError
                    ? "form-control form-error"
                    : "form-control "
                }
                onFocus={handleFocusExpirationMonth}
                onBlur={handleOnBlurExpirationMonth}
              />
              {showExpirationMonths ? (
                <RiArrowUpSLine className="icon"></RiArrowUpSLine>
              ) : (
                <RiArrowDownSLine className="icon"></RiArrowDownSLine>
              )}
            </div>

            {showExpirationMonths && (
              <div className="select-options title-options">
                {expirationMonths.map((expirationMonth, idx) => (
                  <div
                    key={idx}
                    className="option padding-side "
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    onClick={() => handleSelectExpirationMonth(expirationMonth)}
                  >
                    {expirationMonth}
                  </div>
                ))}
              </div>
            )}
            {expirationMonthError && (
              <small className="error-message">
                {"Expiration Month is required"}
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
              placeholder="yyyy"
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
                {errors.expirationYear.message}
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
              {...register("securityCode", {
                required: {
                  value: true,
                  message: "Securit Code is required",
                },
              })}
              className={
                errors.securityCode
                  ? "form-control form-error"
                  : "form-control "
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
          {errors.securityCode && (
            <small className="error-message">
              {errors.securityCode.message}
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
            <Button
              type="submit"
              className="btn-dark btn-long btn-with-icon"
              disabled={
                (!isDirty || !isValid) &&
                !isDropdownsDirty &&
                !brandError &&
                !expirationMonthError
              }
            >
              {createLoading ? (
                <SpinnerLoader></SpinnerLoader>
              ) : (
                <>
                  <HiPlus></HiPlus>Add Item
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default Card;
