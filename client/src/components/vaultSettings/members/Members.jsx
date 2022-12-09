import React from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import WarningAlert from "../../alerts/WarningAlert.jsx";
import MembersList from "./MembersList.jsx";

const Members = () => {
  const { authUser } = useSelector((state) => state.auth);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "all",
  });

  const watchEmail = watch("email");

  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(errors);
  console.log(authUser.email);
  return (
    <div className="standard-stack gap-10">
      <div className="padding-side">
        <h5>Invite People</h5>
      </div>
      <div className="form-group padding-side">
        <WarningAlert
          message={
            "Please note that inviting users to this vault may lead to unauthorized access to sensitive information. Assign proper authorizations to new and existing users by giving them appropriate roles."
          }
        ></WarningAlert>
      </div>
      <form className="padding-side" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email Address</label>

          <input
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              validate: (value) =>
                value !== authUser.email ||
                "You cannot invite yourself to this vault",
            })}
            className={
              errors.email ? "form-control form-error" : "form-control "
            }
          />
          {errors.email && (
            <small className="error-message">
              {errors.email.message}
              <br></br>
            </small>
          )}
          <small>
            You may provide access to this vault by inviting other people's
            email addresses.
          </small>
        </div>

        <div className="form-group">
          <Button type="submit" className="btn-dark">
            Invite Email
          </Button>
        </div>
      </form>
      <div className="padding-side">
        <hr></hr>
      </div>

      <MembersList></MembersList>
    </div>
  );
};

export default Members;
