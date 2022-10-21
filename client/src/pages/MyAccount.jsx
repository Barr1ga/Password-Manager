import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import WarningAlert from "../components/alerts/WarningAlert";
import MyAccount from "../components/vaultSettings/myAccount/MyAccount";
import ChangeEmail from "../components/vaultSettings/myAccount/ChangeEmail";
import ChangePassword from "../components/vaultSettings/myAccount/ChangePassword";
import AccountRemoval from "../components/vaultSettings/myAccount/AccountRemoval";
import ConfirmModal from "../components/helpers/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { logOut, removeAccount } from "../features/slice/authSlice";
import SpinnerLoader from "../components/SpinnerLoader";

const VaultSettings = () => {
  const { authLoading } = useSelector((state) => state.auth);

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

          <AccountRemoval></AccountRemoval>
        </div>
      </div>
    </div>
  );
};

export default VaultSettings;
