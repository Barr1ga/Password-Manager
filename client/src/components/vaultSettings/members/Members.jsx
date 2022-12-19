import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createNotification, resetNotificationQueryFulfilled } from "../../../features/slice/notificationSlice.js";
import WarningAlert from "../../alerts/WarningAlert.jsx";
import MembersList from "./MembersList.jsx";
import SpinnerLoader from "../../SpinnerLoader";
import { createLog } from "../../../features/slice/auditLogSlice.js";

const Members = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const { authUser, isUserOwner } = useSelector((state) => state.auth);
  const { notificationFulfilled, notificationError } = useSelector((state) => state.notifications);

  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "all",
  });

  const watchEmail = watch("email");

  useEffect(() => {
    if (notificationFulfilled || notificationError) {
      reset();
      setCreateLoading(false);
      dispatch(resetNotificationQueryFulfilled());
    }
  }, [notificationFulfilled, notificationError]);

  const onSubmit = (data) => {
    setCreateLoading(true);
    const notification = {
      benefactor: data.email,
      notificationData: {
        actorUid: authUser.uid,
        action: "user/invite",
        description: "Invited you to a vault",
        seen: false,
      },
    };

    dispatch(createNotification(notification));

    const auditData = {
      uid: notification.notificationData.actorUid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "user/invited",
        description: "invited the email",
        benefactor: data.email,
        date: new Date(),
      },
    };

    dispatch(createLog(auditData));
  };

  return (
    <div className="standard-stack gap-10">
      {isUserOwner && (
        <>
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
              {createLoading ? (
                <Button
                  type="button"
                  className="btn-dark"
                  disabled={!isDirty || !isValid}
                  style={{ width: "120px" }}
                >
                  <SpinnerLoader></SpinnerLoader>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="btn-dark"
                  disabled={!isDirty || !isValid}
                  style={{ width: "120px" }}
                >
                  <>Invite</>
                </Button>
              )}
            </div>
          </form>
          <div className="padding-side">
            <hr></hr>
          </div>
        </>
      )}

      <MembersList></MembersList>
    </div>
  );
};

export default Members;
