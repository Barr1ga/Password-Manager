import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";

const MyAccount = () => {
  const {
    register: accountField,
    handleSubmit: handleSubmitAccount,
    formState: { errors: errorsAccount },
  } = useForm({
    mode: "all",
    defaultValues: {},
  });

  const onSubmitAccount = (data) => {
    console.log(data);
  };

  return (
    <div className="standard-stack">
      <div className="form-group">
        <h5>My Account</h5>
        <form onSubmit={handleSubmitAccount(onSubmitAccount)}>
          <div className="form-group">
            <label>
              Name <span className="error-message">*</span>
            </label>
            <input
              type="text"
              {...accountField("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              className={
                errorsAccount.name ? "form-control form-error" : "form-control "
              }
            />
            {errorsAccount.name && (
              <small className="error-message">
                {errorsAccount.name.message}
                <br></br>
              </small>
            )}
            <small>
              Your name may appear around the vault where you are a member of.
            </small>
          </div>

          <div className="form-group">
            <label>
              Email Address
            </label>
            <div className="form-control-disabled">hor.barr1ga@gmail.com</div>
          </div>

          <div className="form-group">
            <label>Master Password Hint</label>
            <input
              type="text"
              {...accountField("masterPasswordHint")}
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
          <Button type="submit" className="btn-dark" style={{width: "140px"}}>
            Save Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
