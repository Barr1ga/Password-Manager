import React, { useState, useRef, useEffect } from "react";
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
import { createWifiPasswordItem } from "../../features/slice/passwordSlice";
import { updateWifiPasswordItem } from "../../features/slice/passwordSlice";
import { useDispatch, useSelector } from "react-redux";

const WifiPassword = ({
  method,
  showPasswordGenerator,
  setShowPasswordGenerator,
  defaultValues,
}) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
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
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
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

  const watchPassword = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    // dispatch(createWifiPasswordItem(data));
    // if (method === "update") {
    //   dispatch(updateWifiPasswordItem(data));
    // }
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
                  {errors.ssid.message}
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
                    placeholder={
                      assignedFolders.length === 0 ? "Enter Folder" : ""
                    }
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
                <Button
                  type="submit"
                  className="btn-dark btn-long btn-with-icon"
                >
                  <HiOutlinePencil></HiOutlinePencil>Update Item
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="btn-dark btn-long btn-with-icon"
                >
                  <HiPlus></HiPlus>Add Item
                </Button>
              )}
            </div>
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

export default WifiPassword;
