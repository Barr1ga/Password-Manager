import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import WarningAlert from "../components/WarningAlert";
import MyAccount from "../components/MyAccount/MyAccount";
import ChangeEmail from "../components/MyAccount/ChangeEmail";
import ChangePassword from "../components/MyAccount/ChangePassword";

const VaultSettings = () => {
  const onDeleteAccount = () => {
    console.log("deleteAccount");
  };

  return (
    <div className="margin-content">
      <div className="page-header-with-close padding-side">
        <h4>Vault Settings</h4>
        <Link to="/">
          <HiOutlineX className="btn-close"></HiOutlineX>
        </Link>
      </div>
      <div className="vault-settings padding-side standard-stack gap-20">
        <MyAccount></MyAccount>
        <ChangeEmail></ChangeEmail>
        <ChangePassword></ChangePassword>

        <div className="form-group">
          <h5 className="delete-account">Delete Account</h5>
          <div className="form-group">
            <WarningAlert
              message={
                "Once you delete your account, there is no going back. Please be certain."
              }
            ></WarningAlert>
          </div>
          <Button
            onClick={onDeleteAccount}
            type="button"
            className="btn-secondary danger"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VaultSettings;
