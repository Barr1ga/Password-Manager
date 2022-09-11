import React from 'react'
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

const ChangeEmail = () => {
    const {
        register: emailField,
        handleSubmit: handleSubmitEmail,
        formState: { errors: errorsEmail },
      } = useForm({
        mode: "all",
        defaultValues: {
        },
      });

      const onSubmitEmail = (data) => {
        console.log(data);
      };
  return (
    <div className="standard-stack">
          <div className="form-group">
            <h5>Change Email</h5>
            <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
              <div className="form-group">
                <label>Email Address<span className="error-message">*</span></label>
                <input
                  type="email"
                  {...emailField("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  className={
                    errorsEmail.email
                      ? "form-control form-error"
                      : "form-control "
                  }
                />
                {errorsEmail.email && (
                  <small className="error-message">
                    ⚠ {errorsEmail.email.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>Master Password <span className="error-message">*</span></label>
                <input
                  type="text"
                  {...emailField("masterPassword", {
                    required: {
                      value: true,
                      message: "Master password is required",
                    },
                  })}
                  className={
                    errorsEmail.masterPassword
                      ? "form-control form-error"
                      : "form-control "
                  }
                />
                {errorsEmail.masterPassword && (
                  <small className="error-message">
                    ⚠ {errorsEmail.masterPassword.message}
                  </small>
                )}
              </div>
              <Button type="submit" className="btn-dark">
                Change Email
              </Button>
            </form>
          </div>
        </div>
  )
}

export default ChangeEmail