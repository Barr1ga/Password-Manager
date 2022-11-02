import React from "react";
import WarningAlert from "../../alerts/WarningAlert";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import VaultMembers from "../../VaultMembers";

const VaultEmails = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <div className="standard-stack">
      <div className="form-group">
        <div className="padding-side">
          <h5>Add Users</h5>
          <form>
            <div className="form-group">
              <WarningAlert
                message={
                  "Please note that inviting users to this vault may lead to unauthorized access to sensitive information. Assign proper authorizations to new and existing users by giving them appropriate roles."
                }
              ></WarningAlert>
            </div>
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
                  {errors.name.message}
                  <br></br>
                </small>
              )}

              <small>
                You can add the emails addresses of users to give them access to
                this vault.
              </small>
            </div>
            <div className="form-group">
              <Button type="submit" className="btn-dark">
                Invite Email
              </Button>
            </div>
          </form>
        </div>

        <VaultMembers></VaultMembers>
      </div>
    </div>
  );
};

export default VaultEmails;
