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
import { createWifiPasswordItem } from "../../features/slice/passwordSlice";
import { updateWifiPasswordItem } from "../../features/slice/passwordSlice";
import { useDispatch } from "react-redux";

const AddItemModal = ({ method, showPasswordGenerator, setShowPasswordGenerator }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [folders, setFolders] = useState(["folder1", "folder2", "folder3"]);
  const [favorite, setFavorite] = useState(false);
  const folderRef = useRef();

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
    
  });

  const watchPassword = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    data.folder = folderRef.current.value;
    dispatch(createWifiPasswordItem(data))
    if(method === "update"){
      dispatch(updateWifiPasswordItem(data))
    }
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
                SSID<span className="error-message">*</span>
              </label>
              <input
                type="text"
                {...register("ssid", {
                  required: {
                    value: true,
                    message: "SSID is required",
                  },
                })}
                className={
                  errors.ssid ? "form-control form-error" : "form-control "
                }
              />
              {errors.ssid && (
                <small className="error-message">
                  ⚠ {errors.ssid.message}
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
                {showFolder ? (
                  <RiArrowUpSLine className="icon"></RiArrowUpSLine>
                ) : (
                  <RiArrowDownSLine className="icon"></RiArrowDownSLine>
                )}
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
