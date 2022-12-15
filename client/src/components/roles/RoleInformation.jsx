import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  HiOutlineClipboardList,
  HiOutlinePencil,
  HiOutlineTrash,
  HiPlus,
  HiViewGrid,
} from "react-icons/hi";
import WarningAlert from "../alerts/WarningAlert";
import { useDispatch, useSelector } from "react-redux";
import MembersList from "../vaultSettings/roles/MembersList";
import ConfirmModal from "../helpers/ConfirmModal";
import {
  createRole,
  resetSelectedRole,
  resetRoleQueryFulfilled,
  updateRole,
  deleteRole,
} from "../../features/slice/roleSlice";
import { Link } from "react-router-dom";
import SpinnerLoader from "../SpinnerLoader";
import { createLog } from "../../features/slice/auditLogSlice";
import {
  assignMultipleMemberRole,
  unAssignMultipleMemberRole,
} from "../../features/slice/memberSlice";

const defaultColorOne = "#ffffff";
const defaultColorTwo = "#b970ff";
const colorPresetsOne = ["#88a0b8", "#e3ca3b", "#fa6328", "#e0388f", "#f2293d"];
const colorPresetsTwo = ["#48d973", "#15a35f", "#219afc", "#667dff", "#daa3ff"];

const RoleInformation = ({
  method,
  defaultValues,
  handleCloseModal,
  setConfirmClose,
}) => {
  const [show, setShow] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    defaultValues?.color || "#ffffff"
  );
  const [showFolder, setShowFolder] = useState(false);
  const [hovering, setHovering] = useState(false);
  const { authUser } = useSelector((state) => state.auth);
  const {
    roles,
    roleFulfilled,
    roleError,
    roleCreatedFullfilled,
    roleUpdatedFullfilled,
  } = useSelector((state) => state.roles);
  const { members } = useSelector((state) => state.members);
  const [search, setSearch] = useState("");
  const { folders } = useSelector((state) => state.folders);
  const folderRef = useRef();
  const [assignedFolders, setAssignedFolders] = useState(
    defaultValues?.folders || []
  );
  const [tab, setTab] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setFormData] = useState("");
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [preAssignedMembers, setPreassignedMembers] = useState([]);
  const [unAssignedMembers, setUnAssignedMembers] = useState([]);
  const handleCloseConfirmation = () => setShowConfirmationModal(false);
  const handleShowConfirmation = () => setShowConfirmationModal(true);
  const dispatch = useDispatch();

  const vaultOwnerUid = roles.find((role) => role.name === "Vault Owner")?.uid;

  useEffect(() => {
    if (method === "update") {
      const membersWithCurrentRole = members.filter((member) =>
        member.roleUids.includes(defaultValues?.uid)
      );

      setPreassignedMembers(membersWithCurrentRole);
      setUnAssignedMembers([]);
      setAssignedMembers(membersWithCurrentRole);
    }
  }, [defaultValues, members]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const watchName = watch("name");
  const watchAbbreviation = watch("abbreviation");

  const handleOnBlurFolder = () => {
    if (!hovering) {
      setShowFolder(false);
    }
  };

  useEffect(() => {
    if (method === "update") {
      setSelectedColor(defaultValues?.color);
      setAssignedFolders(defaultValues?.folders);
      reset(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (roleCreatedFullfilled && method === "create") {
      const roleUid = roles[roles.length - 1]?.uid;
      console.log({ roleUid, assignedMembers });
      dispatch(
        assignMultipleMemberRole({
          uid: authUser.uid,
          roleUid: roleUid,
          assignedMembers: assignedMembers.map((member) => member.uid),
        })
      );
    }
  }, [roleCreatedFullfilled]);

  const onSubmit = (data) => {
    const roleUid = data.uid;
    console.log(roleUid);
    if (data.uid) {
      delete data.uid;
    }
    let newData = {
      uid: authUser.uid,
      roleData: {
        ...data,
        color: selectedColor,
        folders: assignedFolders,
      },
    };

    if (method === "create") {
      setCreateLoading(true);
      console.log(assignedMembers.map((member) => member.uid));

      dispatch(createRole(newData));

      const auditData = {
        uid: authUser.uid,
        auditLogData: {
          actorUid: authUser.uid,
          action: "role/create",
          description: "created the role",
          benefactor: newData.roleData.name,
          date: new Date(),
        },
      };
      dispatch(createLog(auditData));
    }

    if (method === "update") {
      newData.roleUid = defaultValues.uid;
      setFormData(newData);
      handleShowConfirmation();
    }
  };

  const handleUpdateRoleData = () => {
    setUpdateLoading(true);
    formData.unAssignedMembers = unAssignedMembers.map((member) => member.uid);

    dispatch(
      assignMultipleMemberRole({
        uid: authUser.uid,
        roleUid: formData.roleUid,
        assignedMembers: assignedMembers.map((member) => member.uid),
      })
    );

    dispatch(
      unAssignMultipleMemberRole({
        uid: authUser.uid,
        roleUid: formData.roleUid,
        unAssignedMembers: unAssignedMembers.map((member) => member.uid),
      })
    );

    dispatch(updateRole(formData));

    const auditData = {
      uid: authUser.uid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "role/update",
        description: "updated the role",
        benefactor: formData.roleData.name,
      },
    };
    dispatch(createLog(auditData));
  };

  // audit log
  useEffect(() => {
    if (roleCreatedFullfilled || roleUpdatedFullfilled) {
      setUpdateLoading(false);
      setCreateLoading(false);
      handleCloseConfirmation();
      if (handleCloseModal) {
        handleCloseModal();
      }
      dispatch(resetRoleQueryFulfilled());
    }
  }, [roleCreatedFullfilled, roleUpdatedFullfilled]);

  // folders
  let filteredFolders = folders?.filter(
    (folder) => !assignedFolders.includes(folder.name)
  );
  filteredFolders =
    search !== ""
      ? filteredFolders.filter((folder) =>
          folder.name.toLowerCase().includes(search.toLowerCase())
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

  const handleDeleteRole = () => {
    setDeleteLoading(true);
    dispatch(deleteRole({ uid: authUser.uid, roleUid: defaultValues.uid }));

    // dispatch(
    //   unAssignMultipleMemberRole({
    //     uid: authUser.uid,
    //     roleUid: formData.roleUid,
    //     unAssignedMembers: unAssignedMembers.map((member) => member.uid),
    //   })
    // );

    const auditData = {
      uid: authUser.uid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "role/hardDelete",
        description: "permanently deleted the role",
        benefactor: defaultValues.name,
        date: new Date(),
      },
    };
    dispatch(createLog(auditData));
  };

  if (setConfirmClose) {
    if (isDirty) {
      setConfirmClose(true);
    } else {
      setConfirmClose(false);
    }
  }

  return (
    <div className="role-information standard-stack gap-10">
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
              {defaultValues && defaultValues.uid === vaultOwnerUid ? (
                <>
                  <div className="form-group">
                    <label>Name of the Role</label>
                    <div className="form-control-disabled">{"Vault Owner"}</div>
                    <small></small>
                  </div>

                  <div className="form-group">
                    <label>Abbreviation</label>
                    <div className="form-control-disabled">{"VO"}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>
                      Name of the Role <span className="error-message">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                        validate: (value) =>
                          value !== "Vault Owner" ||
                          "Name must not be Vault Owner",
                      })}
                      className={
                        errors.name
                          ? "form-control form-error"
                          : "form-control "
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
                      Abbreviation <span className="error-message">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("abbreviation", {
                        required: {
                          value: true,
                          message: "Abbreviation is required",
                        },
                        validate: (value) =>
                          value !== "VO" || "Abbreviation must not be VO",
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
                </>
              )}
              <div className="form-group role-preview">
                <div className="image">V</div>
                <div className="name standard-stack">
                  <span className="name" style={{ color: selectedColor }}>
                    Vaulteer
                  </span>
                  <small className="name">
                    Viewing <b>All Roles</b> <HiViewGrid></HiViewGrid>
                  </small>
                </div>
              </div>

              <div className="form-group role-preview">
                <small className="role-tag" style={{ color: selectedColor }}>
                  {watchAbbreviation !== "" ? watchAbbreviation : "VT"}
                </small>
                {watchName !== "" ? watchName : "Vaulteer Team"}
              </div>

              <div className="standard-stack">
                <div className="form-group role-color-presets">
                  <label>
                    Role Color <span className="error-message">*</span>
                  </label>
                  <div className="presets">
                    <button
                      type="button"
                      className="default-color white"
                      onClick={() => setSelectedColor(defaultColorOne)}
                      style={{ backgroundColor: defaultColorOne }}
                    >
                      {selectedColor === defaultColorOne && (
                        <div className="selected"></div>
                      )}
                    </button>
                    <button
                      type="button"
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
                        {colorPresetsOne.map((color, idx) => (
                          <button
                            key={idx}
                            type="button"
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
                        {colorPresetsTwo.map((color, idx) => (
                          <button
                            key={idx}
                            type="button"
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

                {defaultValues && defaultValues.uid === vaultOwnerUid ? (
                  <>
                    <div className="form-group">
                      <label>Folders Accessed</label>
                      <div className="form-control-disabled"></div>
                      <small>
                        Vault owners have access to all created folders in this
                        vault.
                      </small>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group form-select-group">
                      <label>Folders Accessed</label>
                      <div
                        className=""
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
                              assignedFolders.length === 0
                                ? "Select Folder"
                                : ""
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
                                    handleSelectFolder(folder.name);
                                    folderRef?.current.focus();
                                  }}
                                >
                                  {folder.name}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {tab === 2 && (
            <>
              <div className="form-group">
                <div className="vault-members">
                  <MembersList
                    method={method}
                    preAssignedMembers={preAssignedMembers}
                    unAssignedMembers={unAssignedMembers}
                    setUnAssignedMembers={setUnAssignedMembers}
                    assignedMembers={assignedMembers}
                    setAssignedMembers={setAssignedMembers}
                  ></MembersList>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            {method === "create" ? (
              <>
                {createLoading ? (
                  <Button
                    type="submit"
                    className="btn-dark btn-long btn-with-icon"
                    disabled={!isDirty || !isValid}
                  >
                    <SpinnerLoader></SpinnerLoader>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="btn-dark btn-long btn-with-icon"
                    disabled={!isDirty || !isValid}
                  >
                    <HiPlus></HiPlus>Add Role
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  className="btn-dark btn-long btn-with-icon"
                  disabled={
                    (!isDirty || !isValid) &&
                    selectedColor === defaultValues?.color &&
                    assignedFolders === defaultValues?.folders &&
                    assignedMembers === preAssignedMembers
                  }
                >
                  <HiOutlinePencil></HiOutlinePencil>Update Role
                </Button>
                <Modal
                  size="sm"
                  show={showConfirmationModal}
                  onHide={handleCloseConfirmation}
                  backdrop="static"
                  keyboard={false}
                  centered
                >
                  <Modal.Body className="confirmation-modal-body">
                    <div className="confirmation-modal">
                      <h5>
                        {"Are you sure you want to save and update this role?"}
                      </h5>
                      <small>
                        {
                          "This will update the information you use for this role."
                        }
                      </small>
                      <div className="options gap-10">
                        <Button
                          type="button"
                          className="btn-secondary btn-long"
                          onClick={handleCloseConfirmation}
                        >
                          Cancel
                        </Button>
                        {updateLoading ? (
                          <Button type="button" className="btn-dark btn-long">
                            <SpinnerLoader></SpinnerLoader>
                          </Button>
                        ) : (
                          <Button
                            onClick={handleUpdateRoleData}
                            type="button"
                            className="btn-dark btn-long"
                          >
                            <>Save</>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </>
            )}
          </div>

          {method === "update" && (
            <ConfirmModal
              proceedInteraction={
                <Button
                  type="button"
                  onClick={handleDeleteRole}
                  className="btn-dark btn-long"
                >
                  {deleteLoading ? (
                    <SpinnerLoader></SpinnerLoader>
                  ) : (
                    <>Delete</>
                  )}
                </Button>
              }
              component={
                <div className="form-group">
                  <Button
                    type="button"
                    className="btn-secondary danger btn-long btn-with-icon"
                  >
                    <HiOutlineTrash></HiOutlineTrash>Delete Role
                  </Button>
                </div>
              }
              headerMessage={
                "Are you sure you want to permanently delete this role?"
              }
              bodyMessage={
                "This role will be deleted immediately, which cannot be undone. Please be certain."
              }
            ></ConfirmModal>
          )}
        </form>
      </div>
    </div>
  );
};

export default RoleInformation;
