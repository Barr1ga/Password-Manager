import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import WarningAlert from "../../alerts/WarningAlert";
import ConfirmModal from "../../helpers/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import SpinnerLoader from "../../SpinnerLoader";
import { accountRemovalReauthentication, logOut, removeAccount } from "../../../features/slice/authSlice";
import Modal from "react-bootstrap/Modal";

const VaultSettings = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const {
    authRemovedAccount,
    authRemovedAccountReauthFulfilled,
    authRemovedAccountFulfilled,
    authRemovedAccountLoading,
    authErrorCode,
    authErrorMessage,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authRemovedAccountReauthFulfilled) {
      dispatch(removeAccount());
    }

    if (authRemovedAccountFulfilled) {
      dispatch(logOut());
    }
  }, [authRemovedAccountFulfilled, authRemovedAccountReauthFulfilled]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    setFormData(data);
    handleShow();
  };

  const handleDeleteAccount = () => {
    const { currentMasterPassword } = formData;
    dispatch(accountRemovalReauthentication(currentMasterPassword));
  };

  return (
    <div className="form-group">
      <h5 className="delete-account">Account Removal</h5>
      <div className="form-group">
        <WarningAlert
          message={
            "Once you delete your account, there is no going back. Please be certain."
          }
        ></WarningAlert>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>
            Enter Master Password <span className="error-message">*</span>
          </label>
          <input
            type="text"
            {...register("currentMasterPassword", {
              required: {
                value: true,
                message: "Current master password is required",
              },
            })}
            className={
              errors.currentMasterPassword ||
              (authRemovedAccount &&
                (authErrorCode === "auth/too-many-requests" ||
                  authErrorCode === "auth/wrong-password"))
                ? "form-control form-error"
                : "form-control "
            }
          />
          {errors.currentMasterPassword && (
            <small className="error-message">
              {errors.currentMasterPassword.message}
              <br></br>
            </small>
          )}
          {authRemovedAccount && authErrorMessage !== "" && (
            <div className="form-group">
              <small className="error-message">{authErrorMessage}</small>
            </div>
          )}
        </div>
        <Button type="submit" className="btn-secondary danger" style={{width: "150px"}}>
          {authRemovedAccountLoading ? (
            <SpinnerLoader></SpinnerLoader>
          ) : (
            <>Delete Account</>
          )}
        </Button>
      </form>

      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="confirmation-modal-body">
          <div className="confirmation-modal">
            <h5>{"Are you sure you want to delete this account?"}</h5>
            <small>
              {
                "Your vault will be deleted along with your account. Additionally, all members of your vault will lose access to the passwords inside it."
              }
            </small>
            <div className="options gap-10">
              <Button
                type="button"
                className="btn-secondary btn-long"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteAccount}
                type="button"
                className="btn-secondary btn-long danger"
              >
                {authRemovedAccountLoading ? <SpinnerLoader></SpinnerLoader> : <>Delete</>}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VaultSettings;
