import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ChangeEmail from "../components/vaultSettings/myAccount/ChangeEmail";
import ChangePassword from "../components/vaultSettings/myAccount/ChangePassword";
import AccountRemoval from "../components/vaultSettings/myAccount/AccountRemoval";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthErrors } from "../features/slice/authSlice";

const VaultSettings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (authFulfilled) {
      navigate("/");
    }

    return () => {
      dispatch(resetAuthErrors());
    }
  }, [authFulfilled]);

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
