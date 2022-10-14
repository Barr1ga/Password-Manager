import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import PrimaryAlertInteractive from "../alerts/PrimaryAlertInteractive";
import {
  changeEmail,
  changeEmailReauthentication,
  logOut,
  sendVerification,
} from "../../features/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import SpinnerLoader from "../SpinnerLoader";

const ChangeEmail = () => {
  const [verificationSent, setVerificationSent] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const dispatch = useDispatch();

  const {
    authChangedEmail,
    authChangedEmailFulfilled,
    authChangedEmailLoading,
    authErrorCode,
    authErrorMessage,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authChangedEmail) {
      dispatch(changeEmail(email));
    }

    if (authChangedEmailFulfilled) {
      dispatch(logOut());
    }
  }, [authChangedEmail]);

  const {
    register: emailField,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const onSubmitEmail = (data) => {
    console.log(data);
    const { email, masterPassword } = data;
    setEmail(email);
    setPasswordInput(masterPassword);
    dispatch(changeEmailReauthentication(masterPassword));
  };

  const handleResendEmail = () => {
    dispatch(sendVerification());
  };

  const handleUndoEmailChange = () => {
    setVerificationSent(false);
  };

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
                  Master Password <span className="error-message">*</span>
                </label>
                <input
                  type="text"
                  {...emailField("masterPassword", {
                    required: {
                      value: true,
                      message: "Master password is required",
                    },
                  })}
                  className={
                    errorsEmail.masterPassword ||
                    authErrorCode === "auth/too-many-requests" ||
                    authErrorCode === "auth/wrong-password"
                      ? "form-control form-error"
                      : "form-control "
                  }
                />
                {errorsEmail.masterPassword && (
                  <small className="error-message">
                    {errorsEmail.masterPassword.message}
                  </small>
                )}
              </div>
              {authErrorMessage !== "" && (
                <div className="form-group">
                  <small className="error-message">{authErrorMessage}</small>
                </div>
              )}
              <Button type="submit" className="btn-dark" style={{width: "140px"}}>
                {authChangedEmailLoading ? (
                  <SpinnerLoader></SpinnerLoader>
                ) : (
                  <>Change Email</>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangeEmail;
