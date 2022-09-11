import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import WarningAlert from "../components/WarningAlert";
import MyAccount from "../components/MyAccount/MyAccount";
import ChangeEmail from "../components/MyAccount/ChangeEmail";
import ChangePassword from "../components/MyAccount/ChangePassword";
import ConfirmModal from "../components/Helpers/ConfirmModal";

const VaultSettings = () => {
  const onDeleteAccount = () => {
    console.log("deleteAccount");
  };

  const handleDeleteAccount = () => {
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
          <h5 className="delete-account">Account Removal</h5>
          <div className="form-group">
            <WarningAlert
              message={
                "Once you delete your account, there is no going back. Please be certain."
              }
            ></WarningAlert>
          </div>
          <ConfirmModal
            handleProceed={handleDeleteAccount}
            component={
              <Button
                onClick={onDeleteAccount}
                type="button"
                className="btn-secondary danger"
              >
                Delete Account
              </Button>
            }
            headerMessage={"Are you sure you want to delete this account?"}
            bodyMessage={
              "Your vault will be deleted along with your account. Additionally, all members of your vault will lose access to the passwords inside it."
            }
            continueMessage={"Delete"}
          ></ConfirmModal>
        </div>
      </div>
    </div>
  );
};

export default VaultSettings;
