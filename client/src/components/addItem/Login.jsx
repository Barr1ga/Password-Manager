import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
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

const Logins = ({
  setCurrentImageLetter,
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

  const onSubmit = (data) => {
    console.log(data);
    // dispatch(createPasswordItem(data));
    // if (method === "update") {
    //   dispatch(updatePasswordItem(data));
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
      ? filteredFolders.filter((folder) =>
          folder.toLowerCase().includes(search.toLowerCase())
        )
      : filteredFolders;

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

export default Logins;
