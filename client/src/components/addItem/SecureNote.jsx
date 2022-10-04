import React, { useState, useRef } from "react";
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
import { RiArrowDownSLine } from "react-icons/ri";
import ConfirmModal from "../helpers/ConfirmModal";
import PasswordGenerator from "../PasswordGenerator";
import TextareaAutosize from "react-textarea-autosize";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import { createSecureNoteItem } from "../../features/slice/passwordSlice";
import { updateSecureNoteItem, getBrandDetails } from "../../features/slice/passwordSlice";
import { useDispatch, useSelector } from "react-redux";

const AddItemModal = ({ method, showPasswordGenerator, setShowPasswordGenerator }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [folders, setFolders] = useState(["folder1", "folder2", "folder3"]);
  const [favorite, setFavorite] = useState(false);
  const folderRef = useRef();

  const dispatch = useDispatch()
  
  const {selectedPassword} = useSelector((state) => state.passwords);

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
      folder: "",
    },
  });

   

  const watchPassword = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    data.folder = folderRef.current.value;
    if(method === "update"){
      if (selectedPassword) {
        dispatch(updateSecureNoteItem({id:selectedPassword, data}))
        dispatch(getBrandDetails({brand: data.name, id: selectedPassword}))
      }
      return;
    }
    dispatch(createSecureNoteItem(data))
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
                  {errors.name.message}
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
                  {errors.folder.message}
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

            {method === "update" ? (
              <Button type="submit" className="btn-dark btn-long btn-with-icon">
                <HiOutlinePencil></HiOutlinePencil>Update Item
              </Button>
            ) : (
              <Button type="submit" className="btn-dark btn-long btn-with-icon">
                <HiPlus></HiPlus>Add Item
              </Button>
            )}
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
