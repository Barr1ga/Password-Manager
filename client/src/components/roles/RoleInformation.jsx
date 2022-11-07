import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { HiOutlinePencil, HiOutlineX, HiPlus } from "react-icons/hi";
import WarningAlert from "../alerts/WarningAlert";
import { useDispatch, useSelector } from "react-redux";
import MembersList from "../vaultSettings/roles/MembersList";
import ConfirmModal from "../helpers/ConfirmModal";
import { createRole, resetSelectedRole } from "../../features/slice/roleSlice";
import { useNavigate } from "react-router-dom";

const RoleInformation = ({ method, defaultValues }) => {
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const { authUser } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const { folders } = useSelector((state) => state.folders);
  const folderRef = useRef();
  const [assignedFolders, setAssignedFolders] = useState(
    defaultValues?.folders || []
  );
  const [tab, setTab] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
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

  const onSubmit = (data) => {
    const newData = {
      uid: authUser.uid,
      roleData: {
        ...data,
        folders: assignedFolders,
        membersUids: assignedMembers.map((member) => member.uid),
      },
    };

    if (method === "create") {
      console.log(newData);
      setCreateLoading(true);
      dispatch(createRole(newData));
    }

    if (method === "update") {
      setUpdateLoading(true);
      // newData.itemUid = defaultValues.uid;
      // dispatch(updateItem(newData));
    }
  };

  // folders
  let filteredFolders = folders.filter(
    (folder) => !assignedFolders.includes(folder)
  );
  filteredFolders =
    search !== ""
      ? filteredFolders.filter((folder) =>
          folder.toLowerCase().includes(search.toLowerCase())
        )
      : filteredFolders;

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

  const handleCloseMobile = () => {
    dispatch(resetSelectedRole());
    navigate(-1);
  };

  const handleClose = () => {
    dispatch(resetSelectedRole());
  };

  return (
    <div className="role-information standard-stack gap-10">
      <div className="page-header">
        <div className="back-enabled">
          <h4>Update Role</h4>
        </div>
        <ConfirmModal
          proceedInteraction={
            <Button
              type="button"
              onClick={handleCloseMobile}
              className="btn-dark btn-long"
            >
              Leave
            </Button>
          }
          component={
            <div className="screen-version">
              <div className="mobile">
                <HiOutlineX className="btn-close"></HiOutlineX>
              </div>
            </div>
          }
          headerMessage={"Are you sure you want to leave this section?"}
          bodyMessage={
            "You have unsaved content, and will be lost unless you save it."
          }
        ></ConfirmModal>
        <ConfirmModal
          proceedInteraction={
            <Button
              type="button"
              onClick={handleClose}
              className="btn-dark btn-long"
            >
              Leave
            </Button>
          }
          component={
            <div className="screen-version">
              <div className="non-mobile">
                <HiOutlineX className="btn-close"></HiOutlineX>
              </div>
            </div>
          }
          headerMessage={"Are you sure you want to leave this section?"}
          bodyMessage={
            "You have unsaved content, and will be lost unless you save it."
          }
          continueMessage={"Leave"}
        ></ConfirmModal>
      </div>
      <div>
        <div className="tab">
          <div
            onClick={() => setTab(1)}
            className={tab === 1 ? "pills selected" : "pills"}
          >
            <p>Display Information</p>
          </div>
          <div
            onClick={() => setTab(2)}
            className={tab === 2 ? "pills selected" : "pills"}
          >
            <p>Assign Roles</p>
          </div>
        </div>
      </div>

      {tab === 1 && (
        <div className="standard-stack gap-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="standard-stack">
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
                {method === "create" ? (
                  <Button
                    type="submit"
                    className="btn-dark btn-long btn-with-icon"
                  >
                    <HiPlus></HiPlus>Add Role
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="btn-dark btn-long btn-with-icon"
                  >
                    <HiOutlinePencil></HiOutlinePencil>Update Role
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

      {tab === 2 && (
        <>
          <div className="vault-members">
            <MembersList
              methor={"create"}
              assignedMembers={assignedMembers}
              setAssignedMembers={setAssignedMembers}
            ></MembersList>
          </div>
        </>
      )}
    </div>
  );
};

export default RoleInformation;
