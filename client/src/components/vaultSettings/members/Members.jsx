import React, { useState } from "react";
import VaultMember from "./Member.jsx";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import WarningAlert from "../../alerts/WarningAlert.jsx";
import Member from "./Member";
import MembersList from "./MembersList.jsx";

const Members = () => {
  const {
    register,
    handleSubmit,
    watch,
    // reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      //   sex: "",
    },
  });
  return (
    <div className="standard-stack padding-side gap-10">
      <h5>Invite People</h5>
      <div className="form-group">
        <WarningAlert
          message={
            "Please note that inviting users to this vault may lead to unauthorized access to sensitive information. Assign proper authorizations to new and existing users by giving them appropriate roles."
          }
        ></WarningAlert>
      </div>
      <form>
        <div className="form-group">
          <label>Email Address</label>

          <input
            type="text"
            {...register("email")}
            className={
              errors.name ? "form-control form-error" : "form-control "
            }
          />
          {errors.name && (
            <small className="error-message">
              {errors.name.message}
              <br></br>
            </small>
          )}
          <small>
            You may provide access to this vault by inviting other people's
            email addresses.
          </small>
        </div>

        <div className="form-group">
          <Button className="btn-dark">Invite Email</Button>
        </div>
      </form>
      <hr></hr>

      <MembersList></MembersList>
    </div>
  );
};

export default Members;
