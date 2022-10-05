import React from "react";
import Button from "react-bootstrap/Button";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import WarningAlert from "../components/alerts/WarningAlert";
import MyAccount from "../components/vaultSettings/myAccount/MyAccount";
import ChangeEmail from "../components/vaultSettings/myAccount/ChangeEmail";
import ChangePassword from "../components/vaultSettings/myAccount/ChangePassword";
import ConfirmModal from "../components/helpers/ConfirmModal";

const VaultSettings = () => {
  const onDeleteAccount = () => {
    console.log("deleteAccount");
  };

  const handleDeleteAccount = () => {};

  return (
    <div className="scroll-view-long">
      <div className="margin-content">
        <div className="page-header page-header-with-close padding-side">
          <h4>Vault Settings</h4>

          <Link to="/">
            <HiOutlineX className="btn-close"></HiOutlineX>
          </Link>
        </div>
        <div className="vault-settings padding-side standard-stack gap-10">
          <MyAccount></MyAccount>
          <hr></hr>

          <ChangeEmail></ChangeEmail>
          <hr></hr>

          <ChangePassword></ChangePassword>
          <hr></hr>

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
    </div>
  );
};

export default VaultSettings;
