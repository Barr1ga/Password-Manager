import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  changePasswordReauthentication,
  logOut,
} from "../../../features/slice/authSlice";
import SpinnerLoader from "../../SpinnerLoader";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordHint, setPasswordHint] = useState("");
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
    }

    if (authChangedPasswordFulfilled) {
      dispatch(logOut());
    }
  }, [authChangedPasswordReauthFulfilled]);

  const {
    register: masterField,
    handleSubmit: handleSubmitMaster,
    watch,
    formState: { errors: errorsMaster },
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const watchNewPassword = watch("newMasterPassword");

  const onSubmitMaster = (data) => {
    console.log(data);
    const { currentMasterPassword, newMasterPassword, masterPasswordHint } =
      data;
    dispatch(changePasswordReauthentication(currentMasterPassword));
    setPassword(newMasterPassword);
    setPasswordHint(masterPasswordHint);
  };

  return (
    <div className="standard-stack">
      <div className="form-group">
        <h5>Change Master Password</h5>

        <form onSubmit={handleSubmitMaster(onSubmitMaster)}>
          <div className="form-group">
            <label>
              Current Master Password <span className="error-message">*</span>
            </label>
            <input
              type="text"
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
            <input
              type="text"
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
            {errorsMaster.newMasterPassword && (
              <small className="error-message">
                {errorsMaster.newMasterPassword.message}
              </small>
            )}
          </div>

          <div className="form-group">
            <div className="form-group">
              <label>
                Re-type Master Password <span className="error-message">*</span>
              </label>
              <input
                type="text"
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

          <Button type="submit" className="btn-dark" style={{ width: "235px" }}>
            {authChangedPasswordLoading ? (
              <SpinnerLoader></SpinnerLoader>
            ) : (
              <>Change Master Password</>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
