import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { updateUserData } from "../../../features/slice/authSlice";
import SpinnerLoader from "../../SpinnerLoader";

const MyAccount = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const { authUser, authLoading, authFulfilled, username } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: errorsAccount },
  } = useForm({
    mode: "all",
    defaultValues: {
      username: username,
    },
  });

  const onSubmitAccount = (data) => {
    setFormData(data);
    handleShow();
  };

  const handleUpdateUserData = () => {
    console.log(formData);
    const { username } = formData;
    const cleanedUsername = username
      .trim()
      .replace(/^[^a-z]+|[^a-z\d_\-.]|[_\-.](?![a-z\d])/gi, "");
    dispatch(updateUserData({ uid: authUser.uid, username: cleanedUsername }));
    setValue("username", cleanedUsername);
    handleClose();
  };

  return (
    <div className="my-account">
      <div className="form-group standard-stack gap-10">
        <h5>My Account</h5>
        <div className="user">
          {authUser.photoURL ? (
            <img
              className="image"
              src={authUser.photoURL}
              alt={authUser.photoURL}
            ></img>
          ) : (
            <div className="image">{username?.charAt(0)}</div>
          )}
          <small>
            Sorry, we do not support<br></br>changing of avatars for now.
          </small>
        </div>
        <form onSubmit={handleSubmit(onSubmitAccount)}>
          <div className="form-group">
            <label>
              Name <span className="error-message">*</span>
            </label>
            <input
              type="text"
              {...register("username", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              className={
                errorsAccount.username
                  ? "form-control form-error"
                  : "form-control "
              }
            />
            {errorsAccount.username && (
              <small className="error-message">
                {errorsAccount.username.message}
                <br></br>
              </small>
            )}
            <small>
              Your username may appear around the vault where you are a member
              of.
            </small>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="form-control-disabled">{authUser.email}</div>
          </div>

          <div className="form-group">
            <small>
              All of the fields on this page are optional and can be deleted at
              any time, and by filling them out, you're giving us consent to
              share your username wherever your user profile appears. Please see
              our privacy statement to learn more about how we use this
              information.
            </small>
          </div>
          <Button type="submit" className="btn-dark">
            Save Account
          </Button>
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
                  {"Are you sure you want to save and update your profile?"}
                </h5>
                <small>
                  {"This will change the information you use for your account."}
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
                    onClick={handleUpdateUserData}
                    type="button"
                    className="btn-dark btn-long"
                  >
                    {authLoading ? <SpinnerLoader></SpinnerLoader> : <>Save</>}
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
