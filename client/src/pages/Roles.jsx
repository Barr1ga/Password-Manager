import React from "react";
import WarningAlert from "../components/WarningAlert";
import { HiOutlineX, HiOutlineArrowLeft } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import VaultRoles from "../components/VaultSettings/VaultRoles";

const Roles = () => {
  return (
    <div className="margin-content">
      <div className="page-header padding-side">
        <h4>Roles</h4>
        <Link to="/">
          <HiOutlineX className="btn-close"></HiOutlineX>
        </Link>
      </div>
      <div className="vault-settings standard-stack gap-20">
        <VaultRoles></VaultRoles>
      </div>
    </div>
  );
};

export default Roles;
