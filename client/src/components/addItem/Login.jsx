import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineRefresh,
  HiPlus,
} from "react-icons/hi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import PasswordGenerator from "../PasswordGenerator";
import TextareaAutosize from "react-textarea-autosize";
import { HiStar } from "react-icons/hi";
import { createPasswordItem } from "../../features/slice/passwordSlice";
import { useDispatch } from "react-redux";
const AddItemModal = ({ showPasswordGenerator, setShowPasswordGenerator, defaultValues }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [folders, setFolders] = useState(["folder1", "folder2", "folder3"]);
  const [favorite, setFavorite] = useState(false);
  const folderRef = useRef();
  
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

  const dispatch = useDispatch()

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues]);

  const watchPassword = watch("password");

  const onSubmit = (data) => {
    dispatch(createPasswordItem(data))
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
                Domain / Link <span className="error-message">*</span>
              </label>
              <input
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
                  ⚠ {errors.domain.message}
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
                  errors.userName ? "form-control form-error" : "form-control "
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
                requirements of the item.
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
