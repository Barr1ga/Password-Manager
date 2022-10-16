import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const MyAccount = () => {
  const { authUser, username, masterPasswordHint } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {}, []);

  const {
    register,
    handleSubmit,
    formState: { errors: errorsAccount },
  } = useForm({
    mode: "all",
    defaultValues: {
      username: username,
      masterPasswordHint: masterPasswordHint,
    },
  });

  const onSubmitAccount = (data) => {
    console.log(data);
  };

  return (
    <div className="my-account">
      <div className="form-group standard-stack gap-10">
        <h5>My Account</h5>
        <div className="user">
          <div className="image">{username.charAt(0)}</div>
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
            <label>Master Password Hint</label>
            <input
              type="text"
              {...register("masterPasswordHint")}
              className={
                errorsAccount.masterPasswordHint
                  ? "form-control form-error"
                  : "form-control "
              }
            />
            {errorsAccount.masterPasswordHint && (
              <small className="error-message">
                {errorsAccount.masterPasswordHint.message}
              </small>
            )}
          </div>
          <div className="form-group">
            <small>
              All of the fields on this page are optional and can be deleted at
              any time, and by filling them out, you're giving us consent to
              share this data wherever your user profile appears. Please see our
              privacy statement to learn more about how we use this information.
            </small>
          </div>
          <Button type="submit" className="btn-dark">
            Save Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
