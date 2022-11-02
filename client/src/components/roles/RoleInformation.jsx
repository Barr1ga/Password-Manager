import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { HiPlus } from "react-icons/hi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import WarningAlert from "../alerts/WarningAlert";

const RoleInformation = ({ method, defaultValues }) => {
  const [folders, setFolders] = useState([]);
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);

  const folderRef = useRef();

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const handleOnBlurFolder = () => {
    if (!hovering) {
      setShowFolder(false);
    }
  };

  return (
    <div className="standard-stack gap-10">
      <form>
        <div className="standard-stack">
          <h5>Display Information</h5>

          <div className="form-group"></div>

          <div className="form-group">
            <label>
              Name of the Role<span className="error-message">*</span>
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
        </div>

        <div className="standard-stack">
          <h5>Permissions</h5>

          <div className="form-group">
            <WarningAlert
              message={
                "Folders may contain sensitive information. Please be certain."
              }
            ></WarningAlert>
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
            <Button type="submit" className="btn-dark btn-long btn-with-icon">
              <HiPlus></HiPlus>Add Item
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RoleInformation;
