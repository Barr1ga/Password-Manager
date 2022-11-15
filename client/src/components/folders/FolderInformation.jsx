import React, { useEffect, useState } from "react";
import ConfirmModal from "../helpers/ConfirmModal";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  createFolder,
  deleteFolder,
  resetFolderQueryFulfilled,
} from "../../features/slice/folderSlice";
import SpinnerLoader from "../SpinnerLoader";
import { createLog } from "../../features/slice/auditLogSlice";
import { updateFolder } from "../../features/slice/folderSlice";

const FolderInformation = ({
  method,
  defaultValues,
  handleCloseModal,
  setConfirmClose,
}) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setFormData] = useState("");
  const { authUser } = useSelector((state) => state.auth);
  const { folders, folderFulfilled, folderError } = useSelector(
    (state) => state.folders
  );

  console.log("test");

  const handleCloseConfirmation = () => setShowConfirmationModal(false);
  const handleShowConfirmation = () => setShowConfirmationModal(true);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data);

    if (data.uid) {
      delete data.uid;
    }
    let newData = {
      uid: authUser.uid,
      folderData: {
        ...data,
      },
    };

    if (method === "create") {
      setCreateLoading(true);
      dispatch(createFolder(newData));

      const auditData = {
        uid: authUser.uid,
        auditLogData: {
          actorUid: authUser.uid,
          action: "folder/create",
          description: "created the folder",
          benefactor: newData.folderData.name,
          date: new Date(),
        },
      };
      dispatch(createLog(auditData));
    }

    if (method === "update") {
      newData.folderUid = defaultValues.uid;
      setFormData(newData);
      handleShowConfirmation();
    }
  };

  const handleUpdateFolderData = () => {
    setUpdateLoading(true);
    dispatch(updateFolder(formData));

    const auditData = {
      uid: authUser.uid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "folder/update",
        description: "updated the folder",
        benefactor: formData.folderData.name,
      },
    };
    dispatch(createLog(auditData));
  };

  const handleDeleteFolder = () => {
    setDeleteLoading(true);
    dispatch(deleteFolder({ uid: authUser.uid, folderUid: defaultValues.uid }));

    const auditData = {
      uid: authUser.uid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "folder/hardDelete",
        description: "permanently deleted the folder",
        benefactor: defaultValues.name,
        date: new Date(),
      },
    };
    dispatch(createLog(auditData));
  };

  // audit log
  useEffect(() => {
    if (folderFulfilled || folderError) {
      setUpdateLoading(false);
      setCreateLoading(false);
      handleCloseConfirmation();
      if (handleCloseModal) {
        handleCloseModal();
      }
      dispatch(resetFolderQueryFulfilled());
    }
  }, [folderFulfilled, folderError]);

  if (setConfirmClose) {
    if (isDirty) {
      setConfirmClose(true);
    } else {
      setConfirmClose(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>
          Folder Name<span className="error-message">*</span>
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
            errors.folderName ? "form-control form-error" : "form-control "
          }
        />
        {errors.folderName && (
          <small className="error-message">
            {errors.folderName.message}
            <br></br>
          </small>
        )}
      </div>
      <div className="form-group">
        {method === "create" ? (
          <Button
            type="submit"
            className="btn-dark btn-long btn-with-icon"
            disabled={!isDirty || !isValid}
          >
            {createLoading ? (
              <SpinnerLoader></SpinnerLoader>
            ) : (
              <>
                <HiPlus></HiPlus>Add Folder
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              type="submit"
              className="btn-dark btn-long btn-with-icon"
              disabled={!isDirty || !isValid}
            >
              <HiOutlinePencil></HiOutlinePencil>Update Folder
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
                    {"Are you sure you want to save and update this folder?"}
                  </h5>
                  <small>
                    {
                      "This will update the information you use for this folder."
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
                    <Button
                      onClick={handleUpdateFolderData}
                      type="button"
                      className="btn-dark btn-long"
                    >
                      {updateLoading ? (
                        <SpinnerLoader></SpinnerLoader>
                      ) : (
                        <>Save</>
                      )}
                    </Button>
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
              onClick={handleDeleteFolder}
              className="btn-dark btn-long"
            >
              {deleteLoading ? <SpinnerLoader></SpinnerLoader> : <>Delete</>}
            </Button>
          }
          component={
            <div className="form-group">
              <Button
                type="button"
                className="btn-secondary danger btn-long btn-with-icon"
              >
                <HiOutlineTrash></HiOutlineTrash>Delete Folder
              </Button>
            </div>
          }
          headerMessage={
            "Are you sure you want to permanently delete this folder?"
          }
          bodyMessage={
            "This folder will be deleted immediately, which cannot be undone. Please be certain."
          }
        ></ConfirmModal>
      )}
    </form>
  );
};

export default FolderInformation;
