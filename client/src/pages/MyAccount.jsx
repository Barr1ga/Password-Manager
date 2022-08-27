import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { HiExclamation, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";

const VaultSettings = () => {
  const {
    register: accountField,
    handleSubmit: handleSubmitAccount,
    watch: watchAccount,
    // reset: resetAccountFields,
    formState: { errors: errorsAccount },
  } = useForm({
    mode: "all",
    defaultValues: {
      //   sex: "",
    },
  });

  const onSubmitAccount = (data) => {
    console.log(data);
  };

  const {
    register: emailField,
    handleSubmit: handleSubmitEmail,
    watch: watchEmail,
    // reset: resetEmailFields,
    formState: { errors: errorsEmail },
  } = useForm({
    mode: "all",
    defaultValues: {
      //   sex: "",
    },
  });

  const onSubmitEmail = (data) => {
    console.log(data);
  };

  const {
    register: masterField,
    handleSubmit: handleSubmitMaster,
    watch: watchMaster,
    // reset: resetMasterFields,
    formState: { errors: errorsMaster },
  } = useForm({
    mode: "all",
    defaultValues: {
      //   sex: "",
    },
  });

  const onSubmitMaster = (data) => {
    console.log(data);
  };

  const onDeleteAccount = () => {
    console.log("deleteAccount");
  };

  return (
    <div className="margin-content">
      <div className="page-header padding-side">
        <h4>Vault Settings</h4>
        <Link to="/">
          <HiOutlineX className="btn-close"></HiOutlineX>
        </Link>
      </div>
      <div className="vault-settings padding-side standard-stack gap-20">
        <div className="standard-stack gap-10">
          <h5>My Account</h5>
          <form onSubmit={handleSubmitAccount(onSubmitAccount)}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                {...accountField("name", {
                  required: {
                    value: true,
                    message: "Your name is required",
                  },
                })}
                className={
                  errorsAccount.name
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              {errorsAccount.name && (
                <small className="error-message">
                  ⚠ {errorsAccount.name.message}
                  <br></br>
                </small>
              )}
              <small>
                Your name may appear around the vault where you are a member of.
              </small>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                disabled
              />
            </div>

            <div className="form-group">
              <label>Master Password</label>
              <input
                type="text"
                {...accountField("masterPassword", {
                  required: {
                    value: true,
                    message: "Your master password is required",
                  },
                })}
                className={
                  errorsAccount.masterPassword
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              {errorsAccount.masterPassword && (
                <small className="error-message">
                  ⚠ {errorsAccount.masterPassword.message}
                </small>
              )}
            </div>
            <small>
              All of the fields on this page are optional and can be deleted at
              any time, and by filling them out, you're giving us consent to
              share this data wherever your user profile appears. Please see our
              privacy statement to learn more about how we use this information.
            </small>

            <div className="form-group">
              <label>Master Password Hint</label>
              <input
                type="text"
                {...accountField("masterPasswordHint")}
                className={
                  errorsAccount.masterPasswordHint
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              {errorsAccount.masterPasswordHint && (
                <small className="error-message">
                  ⚠ {errorsAccount.masterPasswordHint.message}
                </small>
              )}
            </div>
            
            <div className="form-group">
              <Button type="submit" className="btn-dark">
                Save Account
              </Button>
            </div>
          </form>
        </div>

        <div className="standard-stack">
          <h5>Change Email</h5>
          <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                {...emailField("email", {
                  required: {
                    value: true,
                    message: "Your email is required",
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
                  ⚠ {errorsEmail.email.message}
                </small>
              )}
            </div>
            <div className="form-group">
              <label>Master Password</label>
              <input
                type="text"
                {...emailField("masterPassword", {
                  required: {
                    value: true,
                    message: "Your master password is required",
                  },
                })}
                className={
                  errorsEmail.masterPassword
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              {errorsEmail.masterPassword && (
                <small className="error-message">
                  ⚠ {errorsEmail.masterPassword.message}
                </small>
              )}
            </div>
            <div className="form-group">
              <Button type="submit" className="btn-dark">
                Change Email
              </Button>
            </div>
          </form>
        </div>

        <div className="standard-stack">
          <h5>Change Master Password</h5>
          <form onSubmit={handleSubmitMaster(onSubmitMaster)}>
            <div className="form-group">
              <label>Current Master Password</label>
              <input
                type="text"
                {...masterField("currentMasterPassword", {
                  required: {
                    value: true,
                    message: "Your current master password is required",
                  },
                })}
                className={
                  errorsMaster.currentMasterPassword
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              {errorsMaster.currentMasterPassword && (
                <small className="error-message">
                  ⚠ {errorsMaster.currentMasterPassword.message}
                </small>
              )}
            </div>
            <div className="form-group">
              <label>New Master Password</label>
              <input
                type="text"
                {...masterField("newMasterPassword", {
                  required: {
                    value: true,
                    message: "Your new master password is required",
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
                  ⚠ {errorsMaster.newMasterPassword.message}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Re-type Master Password</label>
              <input
                type="text"
                {...masterField("reTypeMasterPassword", {
                  required: {
                    value: true,
                    message: "Re-typing your master password is required",
                  },
                })}
                className={
                  errorsMaster.reTypeMasterPassword
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              {errorsMaster.reTypeMasterPassword && (
                <small className="error-message">
                  ⚠ {errorsMaster.reTypeMasterPassword.message}
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Master Password Hint (optional)</label>
              <input
                type="text"
                {...masterField("masterPasswordHint", {
                  required: {
                    value: true,
                    message: "Your master password hint is required",
                  },
                })}
                className={
                  errorsMaster.masterPasswordHint
                    ? "form-control form-error"
                    : "form-control "
                }
              />
              {errorsMaster.masterPasswordHint && (
                <small className="error-message">
                  ⚠ {errorsMaster.masterPasswordHint.message}
                </small>
              )}
            </div>
            <small>
              A master password hint can help you remember your password if you forget it.
            </small>
            
            <div className="form-group">
              <Button type="submit" className="btn-dark">
                Change Master Password
              </Button>
            </div>
          </form>
        </div>

        <div className="form-group">
          <h5 className="delete-account">Delete Account</h5>
          <form onSubmit={onDeleteAccount}>
            <div className="form-group">
              <div className="warning-alert standard-stack gap-10">
                <div className="alert-header">
                  <HiExclamation className="icon"></HiExclamation>WARNING
                </div>
                <small>
                  Once you delete your account, there is no going back. Please
                  be certain.
                </small>
              </div>
            </div>
            <div className="form-group">
              <Button type="submit" className="btn-secondary danger">
                Delete
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VaultSettings;
