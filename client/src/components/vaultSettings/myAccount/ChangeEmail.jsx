import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import PrimaryAlertInteractive from "../../alerts/PrimaryAlertInteractive";
import {
  changeEmail,
  changeEmailReauthentication,
  logOut,
  updateUserEmail,
} from "../../../features/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import SpinnerLoader from "../../SpinnerLoader";
import Modal from "react-bootstrap/Modal";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const ChangeEmail = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { authUser } = useSelector((state) => state.auth);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [verificationSent, setVerificationSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const {
    authChangedEmail,
    authChangedEmailReauthFulfilled,
    authChangedEmailFulfilled,
    authChangedEmailLoading,
    authErrorCode,
    authErrorMessage,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authChangedEmailReauthFulfilled) {
      dispatch(changeEmail(email));
      dispatch(updateUserEmail({ uid: authUser.uid, email }));
    }

    if (authChangedEmailFulfilled) {
      dispatch(logOut());
    }
  }, [authChangedEmailReauthFulfilled]);

  const {
    register: emailField,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail, isDirty, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const onSubmitEmail = (data) => {
    setFormData(data);
    handleShow();
  };

  const handleEmailChange = () => {
    const { email, masterPassword } = formData;

    setEmail(email);
    dispatch(changeEmailReauthentication(masterPassword));
  };

  const handleResendEmail = () => {
    // dispatch(sendVerification());
  };

  const handleUndoEmailChange = () => {
    setVerificationSent(false);
  };

  useEffect(() => {
    if (
      (authChangedEmail, authErrorMessage !== "" && !authChangedEmailLoading)
    ) {
      if (show) {
        handleClose();
      }
    }
  }, [authChangedEmail, authErrorMessage, authChangedEmailLoading]);

  return (
    <div className="standard-stack">
      <div className="form-group">
        <h5>Change Email</h5>
        {verificationSent ? (
          <>
            <PrimaryAlertInteractive
              title={"Update pending verification"}
              message={`We just need you to check your email ${email} and to verify it's you and complete the update.`}
              interactions={
                <>
                  <button
                    className="btn-link"
                    type="button"
                    onClick={handleResendEmail}
                  >
                    <small>Resend Email</small>
                  </button>
                  <button
                    className="btn-link"
                    type="button"
                    onClick={handleUndoEmailChange}
                  >
                    <small>Undo Email Change</small>
                  </button>
                </>
              }
            ></PrimaryAlertInteractive>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
              <div className="form-group">
                <label>
                  New Email Address<span className="error-message">*</span>
                </label>
                <input
                  type="email"
                  {...emailField("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  className={
                    errorsEmail.email
                      ? "form-control form-error"
                      : "form-control "
                  }
                />
                {errorsEmail.email && (
                  <small className="error-message">
                    {errorsEmail.email.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>
                  Enter Master Password <span className="error-message">*</span>
                </label>
                <span className="password-input">
                  <input
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    {...emailField("masterPassword", {
                      required: {
                        value: true,
                        message: "Master Password is required",
                      },
                    })}
                    className={
                      errorsEmail.masterPassword ||
                      (authChangedEmail &&
                        authErrorCode !== "" &&
                        (authErrorCode === "auth/user-not-found" ||
                          authErrorCode === "auth/too-many-requests" ||
                          authErrorCode === "auth/wrong-password"))
                        ? "form-control form-error"
                        : "form-control "
                    }
                  />
                  <div className="interactions">
                    {showPassword ? (
                      <HiOutlineEye
                        onClick={() => setShowPassword(false)}
                      ></HiOutlineEye>
                    ) : (
                      <HiOutlineEyeOff
                        onClick={() => setShowPassword(true)}
                      ></HiOutlineEyeOff>
                    )}
                  </div>
                </span>
                {errorsEmail.masterPassword && (
                  <small className="error-message">
                    {errorsEmail.masterPassword.message}
                  </small>
                )}
              </div>
              {authChangedEmail && authErrorMessage !== "" && (
                <div className="form-group">
                  <small className="error-message">{authErrorMessage}</small>
                </div>
              )}

              <Button
                type="submit"
                className="btn-dark"
                style={{ width: "140px" }}
                disabled={!isDirty || !isValid}
              >
                <>Change Email</>
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
                  <h5>
                    {"Are you sure you want to change your email address?"}
                  </h5>
                  <small>
                    {
                      "This will change the email you use to login. You will no longer be able to sign in with your current email address."
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
                    {authChangedEmailLoading ? (
                      <Button type="button" className="btn-dark btn-long">
                        <SpinnerLoader></SpinnerLoader>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleEmailChange}
                        type="button"
                        className="btn-dark btn-long"
                      >
                        <>Change</>
                      </Button>
                    )}
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangeEmail;
