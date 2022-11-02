import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { HiPlus, HiOutlinePencil } from "react-icons/hi";
import TextareaAutosize from "react-textarea-autosize";
import { HiStar } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../../features/slice/itemSlice";

const SecureNote = ({ currentImage, setCurrentImageLetter, method, defaultValues }) => {
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [assignedFolders, setAssignedFolders] = useState(
    defaultValues?.folders || []
  );
  const [search, setSearch] = useState("");
  const { folders } = useSelector((state) => state.folders);

  const folderRef = useRef();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const watchName = watch("name");

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

  useEffect(() => {
    if (watchName !== "") {
      setCurrentImageLetter(watchName?.charAt(0));
    }
  }, [setCurrentImageLetter, watchName]);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      type: "secureNote",
      image: currentImage,
      favorite,
      folders: assignedFolders,
      trash: false,
    };

    console.log(newData);

    if (method === "create") {
      dispatch(createItem(newData));
    }

    if (method === "update") {
      // dispatch(updatePasswordItem(data));
    }
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
      ? filteredFolders.filter((folder) =>
          folder.toLowerCase().includes(search.toLowerCase())
        )
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
                            handleSelectFolder(folder);
                            folderRef?.current.focus();
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

export default SecureNote;
