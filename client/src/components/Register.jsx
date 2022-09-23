import React, { useState } from "react";
import { RiShieldFlashFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import {
  HiOutlinePencilAlt,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import OtherLinks from "./OtherLinks";
import GoogleIcon from "../assets/icons8-google.svg";
import FacebookIcon from "../assets/icons8-facebook.svg";

const Register = ({ handleShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showReTypePassword, setShowReTypePassword] = useState(false);
  const [showRegistrationForms, setShowRegistrationForms] = useState(false);
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    mode: "all",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const masterPasswordValue = watch("masterPassword");

  const onSubmitEmail = (data) => {
    setEmail(data.email);
    setShowRegistrationForms(true);
  };

  console.log(email);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleBack = () => {
    setShowRegistrationForms(false);
  };

  return (
    <>
      <Modal
        dialogClassName={
          showRegistrationForms ? "registration-modal" : "login-modal"
        }
        size={showRegistrationForms ? "md" : ""}
        show={show}
        backdrop={false}
        keyboard={false}
      >
        <Modal.Header>
          <div className="login-register-header padding-side">
            <div className="logo gap-10">
              <RiShieldFlashFill className="icon"></RiShieldFlashFill>
              <h3>
                Vaulteer <span className="half">| Securities</span>
              </h3>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="standard-stack gap-10">
            <div className="back-enabled">
              {showRegistrationForms && (
                <HiOutlineArrowLeft
                  className="btn-back"
                  onClick={handleBack}
                ></HiOutlineArrowLeft>
              )}
              <h4 className="login-title">Register to Vaulteer</h4>
            </div>

            <div>
              {!showRegistrationForms ? (
                <>
                  <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
                    <div className="form-group">
                      <label>
                        Email Address <span className="error-message">*</span>
                      </label>
                      <input
                        type="email"
                        {...registerEmail("email", {
                          required: {
                            value: true,
                            message: "User email is required",
                          },
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Email is badly formatted",
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
                          <br></br>
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <p>
                        <small className="registration-agree-note">
                          By signing up, you confirm that you've read <br></br>
                          and accepted our{" "}
                          <span>
                            <button className="btn-link">
                              <b>Terms of Service</b>
                            </button>
                          </span>{" "}
                          and{" "}
                          <span>
                            <button className="btn-link">
                              <b>Privacy Policy</b>
                            </button>
                          </span>
                        </small>
                      </p>
                    </div>
                    <div className="form-group">
                      <Button
                        type="submit"
                        className="btn-dark btn-with-icon btn-long"
                      >
                        Continue
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        value={email}
                        type="email"
                        className="form-control"
                        disabled
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Name <span className="error-message">*</span>
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
                          errors.name
                            ? "form-control form-error"
                            : "form-control "
                        }
                      />
                      {errors.name && (
                        <small className="error-message">
                          ⚠ {errors.name.message}
                          <br></br>
                        </small>
                      )}
                      <small>What do we call you?</small>
                    </div>

                    <div className="form-group">
                      <label>
                        Master Password <span className="error-message">*</span>
                      </label>
                      <span className="password-input">
                        <input
                          type={showPassword ? "text" : "password"}
                          {...register("masterPassword", {
                            required: {
                              value: true,
                              message: "Master Password is required",
                            },
                            minLength: {
                              value: 8,
                              message:
                                "Password must be at least 8 characters.",
                            },
                          })}
                          className={
                            errors.masterPassword
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

                      {errors.masterPassword && (
                        <small className="error-message">
                          ⚠ {errors.masterPassword.message}
                          <br></br>
                        </small>
                      )}
                      <small>
                        The master password is the password you use to access
                        your vault. It is very important that you do not forget
                        your master password. There is no way to recover the
                        password in the event that you forget it.
                      </small>
                    </div>

                    <div className="form-group">
                      <div className="form-group">
                        <label>
                          Re-type Master Password{" "}
                          <span className="error-message">*</span>
                        </label>
                        <span className="password-input">
                          <input
                            type={showReTypePassword ? "text" : "password"}
                            {...register("reTypeMasterPassword", {
                              required: {
                                value: true,
                                message:
                                  "Re-typing master password is required",
                              },
                              validate: (value) =>
                                masterPasswordValue === value ||
                                "Passwords do not match",
                            })}
                            className={
                              errors.reTypeMasterPassword
                                ? "form-control form-error"
                                : "form-control "
                            }
                          />
                          <div className="interactions">
                            {showReTypePassword ? (
                              <HiOutlineEye
                                onClick={() => setShowReTypePassword(false)}
                              ></HiOutlineEye>
                            ) : (
                              <HiOutlineEyeOff
                                onClick={() => setShowReTypePassword(true)}
                              ></HiOutlineEyeOff>
                            )}
                          </div>
                        </span>

                        {errors.reTypeMasterPassword && (
                          <small className="error-message">
                            ⚠ {errors.reTypeMasterPassword.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label>Master Password Hint (optional)</label>
                        <input
                          type="text"
                          {...register("masterPasswordHint")}
                          className="form-control"
                        />
                        <small>
                          A master password hint can help you remember your
                          password if you forget it.
                        </small>
                      </div>
                    </div>
                    <div className="form-group">
                      <Button
                        type="submit"
                        className="btn-dark btn-with-icon btn-long"
                      >
                        <HiOutlinePencilAlt></HiOutlinePencilAlt>Register
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {!showRegistrationForms && (
                <>
                  <div className="form-group">
                    <small className="login-registration-options-separator">
                      OR
                    </small>
                  </div>
                  <div className="form-group">
                    <Button
                      type="button"
                      className="btn-secondary btn-with-icon btn-long"
                    >
                      <img
                        src={GoogleIcon}
                        alt="google.svg"
                        className="custom-small-icons"
                      ></img>
                      Log in with Google
                    </Button>
                  </div>
                  <div className="form-group">
                    <Button
                      type="button"
                      className="btn-secondary btn-with-icon btn-long"
                    >
                      <img
                        src={FacebookIcon}
                        alt="facebook.svg"
                        className="custom-small-icons"
                      ></img>
                      Log in with Facebook
                    </Button>
                  </div>
                </>
              )}
              <small className="form-group">
                Dont have an account?{" "}
                <button className="btn-link" onClick={handleShowLogin}>
                  <b>Log in</b>
                </button>
              </small>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <OtherLinks></OtherLinks>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
