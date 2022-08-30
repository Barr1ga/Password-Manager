import React, { useState } from "react";
import { RiShieldFlashFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import {
  HiOutlineLogin,
  HiOutlineLightBulb,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const Login = ({ handleLogin, handleShowRegistration }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
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

  return (
    <>
      <Modal
        dialogClassName="modal-smmd"
        show={show}
        backdrop="static"
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
            <h5>Login</h5>

            <div>
              <form>
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
                  <label>Master Password</label>
                  <span className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("masterPassword", {
                        required: {
                          value: true,
                          message: "Master Password is required",
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
                </div>
                <div className="form-group">
                  <Button
                    className="btn-secondary btn-with-icon btn-long"
                    onClick={() => setShowPasswordHint((prev) => !prev)}
                  >
                    <HiOutlineLightBulb></HiOutlineLightBulb>
                    {showPasswordHint ? "Hide" : "Get"} master password hint
                  </Button>
                </div>
                {showPasswordHint && (
                  <div className="form-group">
                    <div className="password-hint">
                      <b>Hint:</b> This is a hint message. A very long one that
                      is
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <Button className="btn-dark btn-with-icon btn-long" onClick={handleLogin}>
                    <HiOutlineLogin></HiOutlineLogin>Login
                  </Button>
                </div>
                <small className="form-group">
                  Dont have an account?{" "}
                  <a className="btn-link" onClick={handleShowRegistration}>
                    <b>Sign up</b>
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

export default Login;
