import React, { useState } from "react";
import { RiShieldFlashFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import {
  HiOutlinePencilAlt,
  HiOutlineLogin,
  HiOutlineLightBulb,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import Modal from "react-bootstrap/Modal";

const Register = ({ handleShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showReTypePassword, setShowReTypePassword] = useState(false);

  const [show, setShow] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      //   sex: "",
    },
  });

  const masterPasswordValue = watch("masterPassword");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Modal size="md" show={show} backdrop="static" keyboard={false}>
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
            <h5>Registration</h5>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    {...register("email", {
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
                      errors.email ? "form-control form-error" : "form-control "
                    }
                  />
                  {errors.email && (
                    <small className="error-message">
                      ⚠ {errors.email.message}
                      <br></br>
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label>Name</label>
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
                      ⚠ {errors.name.message}
                      <br></br>
                    </small>
                  )}
                  <small>What do we call you?</small>
                </div>

                <div className="form-group">
                  <label>Master Password</label>
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
                          message: "Password must be at least 8 characters.",
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
                    The master password is the password you use to access your
                    vault. It is very important that you do not forget your
                    master password. There is no way to recover the password in
                    the event that you forget it.
                  </small>
                </div>

                <div className="form-group">
                  <div className="form-group">
                    <label>Re-type Master Password</label>
                    <span className="password-input">
                      <input
                        type={showReTypePassword ? "text" : "password"}
                        {...register("reTypeMasterPassword", {
                          required: {
                            value: true,
                            message: "Re-typing master password is required",
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
                      A master password hint can help you remember your password
                      if you forget it.
                    </small>
                  </div>
                </div>

                <div className="form-group form-agree gap-10">
                  <input
                    type="checkbox"
                    {...register("agree", {
                      required: {
                        value: true,
                        message:
                          "You must read and agree to our Terms of Service and Privacy Policy in order to proceed",
                      },
                    })}
                  />
                  <small>
                    By checking this box you agree to our{" "}
                    <b>Terms of Service</b> <br></br>and <b>Privacy Policy</b>
                  </small>
                </div>
                <div className="form-group">
                  {errors.agree && (
                    <small className="error-message">
                      ⚠ {errors.agree.message}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <Button
                    type="submit"
                    className="btn-dark btn-with-icon btn-long"
                  >
                    <HiOutlinePencilAlt></HiOutlinePencilAlt>Register
                  </Button>
                </div>
                <small className="form-group">
                  Dont have an account?{" "}
                  <a className="btn-link" onClick={handleShowLogin}>
                    <b>Log in</b>
                  </a>
                </small>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
