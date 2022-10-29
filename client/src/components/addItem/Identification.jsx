import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { HiPlus, HiOutlinePencil } from "react-icons/hi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import TextareaAutosize from "react-textarea-autosize";
import { HiStar } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

const Identifications = ({ method, defaultValues }) => {
  const [showFolder, setShowFolder] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [titles, setTitles] = useState(["Mr", "Mrs", "Ms", "Dr"]);
  const [favorite, setFavorite] = useState(false);
  const titleRef = useRef();
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
    defaultValues: {
      name: "",
      userName: "",
      password: "",
      folder: "",
    },
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

  const onSubmit = (data) => {
    console.log(data);
    // dispatch(createIdentificationItem(data));
    // if (method === "update") {
    //   dispatch(updateIdentificationItem(data));
    // }
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
          <label>Title</label>
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

export default Identifications;
