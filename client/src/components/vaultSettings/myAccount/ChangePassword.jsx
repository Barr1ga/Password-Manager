import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  changePasswordReauthentication,
  logOut,
  updateUserPasswordHint,
} from "../../../features/slice/authSlice";
import SpinnerLoader from "../../SpinnerLoader";
import Modal from "react-bootstrap/Modal";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const ChangePassword = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState("");
  const [showCurrentMasterPassword, setShowCurrentMasterPassword] =
    useState(false);
  const [showNewMasterPassword, setShowNewMasterPassword] = useState(false);
  const [showReTypeNewMasterPassword, setShowReTypeNewMasterPassword] =
    useState(false);
  const { authUser } = useSelector((state) => state.auth);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [password, setPassword] = useState("");
  const [masterPasswordHint, setMasterPasswordHint] = useState("");
  const dispatch = useDispatch();

  const {
    authChangedPassword,
    authChangedPasswordReauthFulfilled,
    authChangedPasswordFulfilled,
    authChangedPasswordLoading,
    authErrorCode,
    authErrorMessage,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authChangedPasswordReauthFulfilled) {
      dispatch(changePassword(password));
      dispatch(
        updateUserPasswordHint({ uid: authUser.uid, masterPasswordHint })
      );
    }

    if (authChangedPasswordFulfilled) {
      dispatch(logOut());
    }
  }, [authChangedPasswordReauthFulfilled]);

  const {
    register: masterField,
    handleSubmit: handleSubmitMaster,
    watch,
    formState: { errors: errorsMaster, isDirty, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const watchNewPassword = watch("newMasterPassword");

  const onSubmitMaster = (data) => {
    setFormData(data);
    handleShow();
  };

  const handleChangePassword = () => {
    const { currentMasterPassword, newMasterPassword, masterPasswordHint } =
      formData;
    dispatch(changePasswordReauthentication(currentMasterPassword));
    setPassword(newMasterPassword);
    setMasterPasswordHint(masterPasswordHint);
  };

  useEffect(() => {
    if (authChangedPassword && authErrorMessage !== "" && !authChangedPasswordLoading) {
      if (show) {
        handleClose();
      }
    }
  }, [authChangedPassword, authErrorMessage, authChangedPasswordLoading]);

  return (
    <div className="standard-stack">
      <div className="form-group">
        <h5 className="delete-account">Change Master Password</h5>

        <form onSubmit={handleSubmitMaster(onSubmitMaster)}>
          <div className="form-group">
            <label>
              Current Master Password <span className="error-message">*</span>
            </label>
            <span className="password-input">
              <input
                type={showCurrentMasterPassword ? "text" : "password"}
                {...masterField("currentMasterPassword", {
                  required: {
                    value: true,
                    message: "Current master password is required",
                  },
                })}
                className={
                  errorsMaster.currentMasterPassword ||
                  (authChangedPassword &&
                    (authErrorCode === "auth/too-many-requests" ||
                      authErrorCode === "auth/wrong-password"))
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              <div className="interactions">
                {showCurrentMasterPassword ? (
                  <HiOutlineEye
                    onClick={() => setShowCurrentMasterPassword(false)}
                  ></HiOutlineEye>
                ) : (
                  <HiOutlineEyeOff
                    onClick={() => setShowCurrentMasterPassword(true)}
                  ></HiOutlineEyeOff>
                )}
              </div>
            </span>

            {errorsMaster.currentMasterPassword && (
              <small className="error-message">
                {errorsMaster.currentMasterPassword.message}
                <br></br>
              </small>
            )}
            {authChangedPassword && authErrorMessage !== "" && (
              <div className="form-group">
                <small className="error-message">{authErrorMessage}</small>
              </div>
            )}
            <small>
              The master password is the password you use to access your vault.
              It is very important that you do not forget your master password.
              There is no way to recover the password in the event that you
              forget it.
            </small>
          </div>

          <div className="form-group">
            <label>
              New Master Password <span className="error-message">*</span>
            </label>
            <span className="password-input">
              <input
                type={showNewMasterPassword ? "text" : "password"}
                {...masterField("newMasterPassword", {
                  required: {
                    value: true,
                    message: "New master password is required",
                  },
                })}
                className={
                  errorsMaster.newMasterPassword
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              <div className="interactions">
                {showNewMasterPassword ? (
                  <HiOutlineEye
                    onClick={() => setShowNewMasterPassword(false)}
                  ></HiOutlineEye>
                ) : (
                  <HiOutlineEyeOff
                    onClick={() => setShowNewMasterPassword(true)}
                  ></HiOutlineEyeOff>
                )}
              </div>
            </span>

            {errorsMaster.newMasterPassword && (
              <small className="error-message">
                {errorsMaster.newMasterPassword.message}
              </small>
            )}
          </div>

          <div className="form-group">
            <div className="form-group">
              <label>
                Re-type New Master Password{" "}
                <span className="error-message">*</span>
              </label>
              <span className="password-input">
                <input
                  type={showReTypeNewMasterPassword ? "text" : "password"}
                  {...masterField("reTypeMasterPassword", {
                    required: {
                      value: true,
                      message: "Re-typing master password is required",
                    },
                    validate: (value) =>
                      watchNewPassword === value || "Passwords do not match",
                  })}
                  className={
                    errorsMaster.reTypeMasterPassword
                      ? "form-control form-error"
                      : "form-control "
                  }
                />
                <div className="interactions">
                  {showReTypeNewMasterPassword ? (
                    <HiOutlineEye
                      onClick={() => setShowReTypeNewMasterPassword(false)}
                    ></HiOutlineEye>
                  ) : (
                    <HiOutlineEyeOff
                      onClick={() => setShowReTypeNewMasterPassword(true)}
                    ></HiOutlineEyeOff>
                  )}
                </div>
              </span>

              {errorsMaster.reTypeMasterPassword && (
                <small className="error-message">
                  {errorsMaster.reTypeMasterPassword.message}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Master Password Hint (optional)</label>
              <input
                type="text"
                {...masterField("masterPasswordHint", {})}
                className={
                  errorsMaster.masterPasswordHint
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              {errorsMaster.masterPasswordHint && (
                <>
                  <small className="error-message">
                    {errorsMaster.masterPasswordHint.message}
                  </small>
                  <br></br>
                </>
              )}
              <small>
                A master password hint can help you remember your password if
                you forget it.
              </small>
            </div>
          </div>

          <Button
            type="submit"
            className="btn-secondary danger"
            style={{ width: "235px" }}
            disabled={!isDirty || !isValid}
          >
            {authChangedPasswordLoading ? (
              <SpinnerLoader></SpinnerLoader>
            ) : (
              <>Change Master Password</>
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
              <h5>{"Are you sure you want to change your master password?"}</h5>
              <small>
                {
                  "This will change the master password you use to login. You will no longer be able to sign in with your current master password."
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
                  onClick={handleChangePassword}
                  type="button"
                  className="btn-secondary btn-long danger"
                >
                  {authChangedPasswordLoading ? (
                    <SpinnerLoader></SpinnerLoader>
                  ) : (
                    <>Change</>
                  )}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ChangePassword;
