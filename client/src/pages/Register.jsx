import React, { useState } from "react";
import { RiShieldFlashFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { HiOutlineLogin, HiOutlineLightBulb } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";

const Register = () => {
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
        size="md"
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
          <div className="margin-content">
            <div>
              <form>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="text"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "User email is required",
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
                </div>

                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    {...register("masterPassword", {
                      required: {
                        value: true,
                        message: "Master Password is required",
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
                  <input
                    type="text"
                    {...register("masterPassword", {
                      required: {
                        value: true,
                        message: "Master Password is required",
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
                  <small>
                    The master password is the password you use to access your
                    vault. It is very important that you do not forget your
                    master password. There is no way to recover the password in
                    the event that you forget it.
                  </small>
                </div>

                <div className="form-group">
                  <label>Master Password Hint</label>
                  <input
                    type="text"
                    {...register("masterPasswordHint")}
                    className={
                      errors.masterPasswordHint
                        ? "form-control form-error"
                        : "form-control "
                    }
                  />
                  {errors.masterPasswordHint && (
                    <small className="error-message">
                      ⚠ {errors.masterPasswordHint.message}
                    </small>
                  )}
                </div>

                <div className="form-group">
                <div className="form-group">
                  <label>Re-type Master Password</label>
                  <input
                    type="text"
                    {...register("reTypeMasterPassword", {
                      required: {
                        value: true,
                        message: "Re-typing master password is required",
                      },
                    })}
                    className={
                      errors.reTypeMasterPassword
                        ? "form-control form-error"
                        : "form-control "
                    }
                  />
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
                    {...register("masterPasswordHint", {
                      required: {
                        value: true,
                        message: "Master password hint is required",
                      },
                    })}
                    className={
                      errors.masterPasswordHint
                        ? "form-control form-error"
                        : "form-control "
                    }
                  />
                  {errors.masterPasswordHint && (
                    <small className="error-message">
                      ⚠ {errors.masterPasswordHint.message}
                    </small>
                  )}
                  <small>
                    A master password hint can help you remember your password
                    if you forget it.
                  </small>
                </div>
              </div>
                {showPasswordHint && (
                  <div className="form-group">
                    <div className="password-hint">
                      <b>Hint:</b> This is a hint message. A very long one that
                      is
                    </div>
                  </div>
                )}
                <small className="form-group">
                  <Button className="btn-dark btn-with-icon btn-long">
                    <HiOutlineLogin></HiOutlineLogin>Login
                  </Button>
                  Dont have an account?
                  <a className="btn-link">
                    <b>Sign in</b>
                  </a>
                </small>
              </form>
              <small>
                A master password hint can help you remember your password if
                you forget it.
              </small>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
