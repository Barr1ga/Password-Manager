import React, { useState } from "react";
import { RiShieldFlashFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import {
  HiOutlineLogin,
  HiOutlineLightBulb,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiLightBulb,
} from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/slice/authSlice";
import OtherLinks from "./OtherLinks";
import GoogleIcon from "../assets/icons8-google.svg";
import FacebookIcon from "../assets/icons8-facebook.svg";

const Login = ({ handleLogin, handleShowRegistration }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

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

  const onSubmit = (data) => {
    console.log(data);
    dispatch(setUser());
  };

  return (
    <>
      <Modal
        dialogClassName="login-modal"
        size="md"
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
            <h5 className="login-title">Login to Vaulteer</h5>

            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>
                    Email Address <span className="error-message">*</span>
                  </label>
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
                    {showPasswordHint ? (
                      <HiOutlineLightBulb></HiOutlineLightBulb>
                    ) : (
                      <HiLightBulb></HiLightBulb>
                    )}
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
                  <Button
                    type="submit"
                    className="btn-dark btn-with-icon btn-long"
                  >
                    <HiOutlineLogin></HiOutlineLogin>Log in
                  </Button>
                </div>
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
                    <img src={GoogleIcon} alt="google.svg" className="custom-small-icons"></img>Continue with Google
                  </Button>
                </div>
                <div className="form-group">
                  <Button
                    type="button"
                    className="btn-secondary btn-with-icon btn-long"
                  >
                    <img src={FacebookIcon} alt="facebook.svg" className="custom-small-icons"></img>Continue with Facebook
                  </Button>
                </div>
                <small>
                  Dont have an account?{" "}
                  <button className="btn-link" onClick={handleShowRegistration}>
                    <b>Sign up</b>
                  </button>
                </small>
              </form>
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

export default Login;
