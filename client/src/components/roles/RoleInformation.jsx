import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import {
  HiOutlineClipboardList,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiPlus,
  HiViewGrid,
} from "react-icons/hi";
import WarningAlert from "../alerts/WarningAlert";
import { useDispatch, useSelector } from "react-redux";
import MembersList from "../vaultSettings/roles/MembersList";
import ConfirmModal from "../helpers/ConfirmModal";
import { createRole, resetSelectedRole, updateRole } from "../../features/slice/roleSlice";
import { Link, useNavigate } from "react-router-dom";
import SpinnerLoader from "../SpinnerLoader";

const defaultColorOne = "#ffffff";
const defaultColorTwo = "#b970ff";
const colorPresetsOne = ["#88a0b8", "#e3ca3b", "#fa6328", "#e0388f", "#f2293d"];
const colorPresetsTwo = ["#48d973", "#15a35f", "#219afc", "#667dff", "#daa3ff"];

const RoleInformation = ({ method, defaultValues }) => {
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#9e58e0");
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
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: (({ uid, ...data }) => data)(defaultValues),
  });

  const watchName = watch("name");
  const watchAbbreviation = watch("abbreviation");

  const handleOnBlurFolder = () => {
    if (!hovering) {
      setShowFolder(false);
    }
  };

  const onSubmit = (data) => {
    let newData = {
      uid: authUser.uid,
      roleData: {
        abbreviation: data.abbreviation,
        color: selectedColor,
        folders: assignedFolders,
        membersUids: assignedMembers.map((member) => member.uid),
        name: data.name,
      },
    };

    if (method === "create") {
      console.log(newData);
      setCreateLoading(true);
      dispatch(createRole(newData));
    }

    if (method === "update") {
      newData.roleUid = defaultValues.uid;
      console.log(newData);
      setUpdateLoading(true);
      dispatch(updateRole(newData));
    }
  };

  // audit log
  // useEffect(() => {
  //   if (isDirty) {
  //     if (itemUpdatedFullfilled) {
  //       const recentItemUid = items[0].uid;
  //       const auditData = {
  //         uid: authUser.uid,
  //         itemLogData: {
  //           actorUid: authUser.uid,
  //           action: "item/update",
  //           description: "updated the item",
  //           benefactorUid: recentItemUid,
  //           date: new Date(),
  //         },
  //       };
  //       dispatch(createItemLog(auditData));
  //     }

  //     if (itemCreatedFullfilled) {
  //       const auditData = {
  //         uid: authUser.uid,
  //         itemLogData: {
  //           actorUid: authUser.uid,
  //           action: "item/create",
  //           description: "created the item",
  //           benefactorUid: defaultValues.uid,
  //           date: new Date(),
  //         },
  //       };
  //       dispatch(createItemLog(auditData));
  //     }
  //   }

  //   if (itemFulfilled || itemError) {
  //     setUpdateLoading(false);
  //     setCreateLoading(false);
  //   }

  //   dispatch(resetItemQueryFulfilled());
  // }, [itemFulfilled, itemError]);

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

  const handleDeleteRole = () => {
    console.log(defaultValues.uid);
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

      <div className="standard-stack gap-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          {tab === 1 && (
            <>
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

              <div className="form-group">
                <label>
                  Abbreviation<span className="error-message">*</span>
                </label>
                <input
                  type="text"
                  {...register("abbreviation", {
                    required: {
                      value: true,
                      message: "Abbreviation is required",
                    },
                  })}
                  className={
                    errors.abbreviation
                      ? "form-control form-error"
                      : "form-control "
                  }
                />
                {errors.abbreviation && (
                  <small className="error-message">
                    {errors.abbreviation.message}
                    <br></br>
                  </small>
                )}
              </div>

              <div className="form-group role-preview">
                <div className="image">V</div>
                <div className="name standard-stack">
                  <span className="name" style={{ color: selectedColor }}>
                    Vaulteer
                  </span>
                  <small className="name">
                    Viewing <b>All Items</b> <HiViewGrid></HiViewGrid>
                  </small>
                </div>
              </div>

              <div className="form-group role-preview">
                <span className="role-tag" style={{ color: selectedColor }}>
                  {watchAbbreviation}
                </span>
                {watchName}
              </div>

              <div className="standard-stack">
                <div className="form-group role-color-presets">
                  <label>
                    Role Color <span className="error-message">*</span>
                  </label>
                  <div className="presets">
                    <button
                      className="default-color white"
                      onClick={() => setSelectedColor(defaultColorOne)}
                      style={{ backgroundColor: defaultColorOne }}
                    >
                      {selectedColor === defaultColorOne && (
                        <div className="selected"></div>
                      )}
                    </button>
                    <button
                      className="default-color"
                      onClick={() => setSelectedColor(defaultColorTwo)}
                      style={{ backgroundColor: defaultColorTwo }}
                    >
                      {selectedColor === defaultColorTwo && (
                        <div className="selected"></div>
                      )}
                    </button>
                    <span className="standard-stack gap-10">
                      <div className="preset-row">
                        {colorPresetsOne.map((color) => (
                          <button
                            className="color"
                            onClick={() => setSelectedColor(color)}
                            style={{ backgroundColor: color }}
                          >
                            {selectedColor === color && (
                              <div className="selected"></div>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="preset-row">
                        {colorPresetsTwo.map((color) => (
                          <button
                            className="color"
                            onClick={() => setSelectedColor(color)}
                            style={{ backgroundColor: color }}
                          >
                            {selectedColor === color && (
                              <div className="selected"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </span>
                  </div>
                  <small>
                    Colors of members are determined by their most recent roles
                    acquired
                  </small>
                </div>
              </div>

              <div className="form-group">
                <hr></hr>
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
                  <label>Folders Accessed</label>
                  <div
                    className="form-group"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                  >
                    <div
                      className={
                        showFolder
                          ? "form-pills form-pills-active"
                          : "form-pills"
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
                    <small>
                      The folders selected in this field determines which
                      folders this role has access to.
                    </small>
                    {showFolder && (
                      <div className="select-options folder-options">
                        {filteredFolders.length === 0 && (
                          <div className="option disabled">
                            No folders found
                          </div>
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
              </div>
            </>
          )}

          {tab === 2 && (
            <>
              <div className="form-group">
                <div className="vault-members">
                  <MembersList
                    methor={"create"}
                    assignedMembers={assignedMembers}
                    setAssignedMembers={setAssignedMembers}
                  ></MembersList>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            {method === "create" ? (
              <Button type="submit" className="btn-dark btn-long btn-with-icon">
                {createLoading ? (
                  <SpinnerLoader></SpinnerLoader>
                ) : (
                  <>
                    <HiPlus></HiPlus>Add Role
                  </>
                )}
              </Button>
            ) : (
              <Button type="submit" className="btn-dark btn-long btn-with-icon">
                {updateLoading ? (
                  <SpinnerLoader></SpinnerLoader>
                ) : (
                  <>
                    <HiOutlinePencil></HiOutlinePencil>Update Role
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="form-group">
            <Button
              type="button"
              className="btn-secondary danger btn-long btn-with-icon"
              onClick={handleDeleteRole}
            >
              {deleteLoading ? (
                <SpinnerLoader></SpinnerLoader>
              ) : (
                <>
                  <HiOutlineTrash></HiOutlineTrash>Delete Role
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <hr></hr>
      <div className="last-updated">
        <div>
          <Link to="/AuditLog" type="button">
            <HiOutlineClipboardList></HiOutlineClipboardList>
          </Link>
        </div>
        <small>
          Last updated: Thu Sep 01 2022 21:01:16 GMT+0800 (Philippine Standard
          Time)
        </small>
      </div>
    </div>
  );
};

export default RoleInformation;
