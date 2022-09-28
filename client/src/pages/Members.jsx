import React from "react";
import WarningAlert from "../components/alerts/WarningAlert";
import { HiOutlineX } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import VaultEmails from "../components/VaultSettings/VaultEmails";

const Members = () => {
  return (
    <div className="margin-content">
      <div className="page-header padding-side">
        <h4>Members</h4>
        <Link to="/">
          <HiOutlineX className="btn-close"></HiOutlineX>
        </Link>
      </div>
      <div className="vault-settings standard-stack gap-20">
        <VaultEmails></VaultEmails>
      </div>
    </div>
  );
};

export default Members;
