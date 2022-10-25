import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiPlus,
  HiOutlinePencil,
} from "react-icons/hi";
import TextareaAutosize from "react-textarea-autosize";
import { HiStar } from "react-icons/hi";
import { createCardItem } from "../../features/slice/passwordSlice";
import { updateCardItem } from "../../features/slice/passwordSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ method, defaultValues }) => {
  const [showNumberInput, setShowNumberInput] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [assignedFolders, setAssignedFolders] = useState(
    defaultValues?.folders || []
  );
  const [search, setSearch] = useState("");
  const { folders } = useSelector((state) => state.folders);
  
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setAssignedFolders(defaultValues.folders);
    }

    return () => {
      reset();
    };
  }, [defaultValues, reset]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const onSubmit = (data) => {
    dispatch(createCardItem(data));
    if (method === "update") {
      dispatch(updateCardItem(data));
    }
    console.log(data);
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

  let filteredFolders = folders.filter(
    (folder) => !assignedFolders.includes(folder)
  );
  filteredFolders =
    search !== ""
      ? filteredFolders.filter((folder) => folder.toLowerCase().includes(search.toLowerCase()))
      : filteredFolders;

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
              {errors.cardHolder.message}
              <br></br>
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Brand <span className="error-message">*</span>
          </label>
          <input
            type="text"
            {...register("brand", {
              required: {
                value: true,
                message: "Brand is required",
              },
            })}
            className={
              errors.brand ? "form-control form-error" : "form-control "
            }
          />
          {errors.brand && (
            <small className="error-message">
              {errors.brand.message}
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
          <div className="form-group">
            <label>
              Expiration Month <span className="error-message">*</span>
            </label>
            <input
              type="text"
              placeholder="mm - month"
              {...register("expirationMonth", {
                required: {
                  value: true,
                  message: "Expiration Month is required",
                },
              })}
              className={
                errors.expirationMonth ? "form-control form-error" : "form-control "
              }
            />
            {errors.expirationMonth && (
              <small className="error-message">
                {errors.expirationMonth.message}
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
          <div className="form-group">
            <div
              className={
                showFolder ? "form-pills form-pills-active" : "form-pills"
              }
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
                placeholder={assignedFolders.length === 0 ? "Enter Folder" : ""}
                type="text"
                onFocus={() => setShowFolder(true)}
                onBlur={handleOnBlurFolder}
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control-borderless"
                autocomplete="off"
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
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => setHovering(false)}
                      onClick={() => {
                        handleSelectFolder(folder);
                        setShowFolder(false);
                        setHovering(false);
                      }}
                    >
                      {folder}
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
            <Button type="submit" className="btn-dark btn-long btn-with-icon">
              <HiOutlinePencil></HiOutlinePencil>Update Item
            </Button>
          ) : (
            <Button type="submit" className="btn-dark btn-long btn-with-icon">
              <HiPlus></HiPlus>Add Item
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default Card;
