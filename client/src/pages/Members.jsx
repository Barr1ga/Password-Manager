import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import VaultMembers from "../components/vaultSettings/members/Members";

const Members = () => {
  return (
    <div className="scroll-view-long">
      <div className="margin-content">
        <div className="page-header padding-side">
          <h4>Members</h4>
          <Link to="/">
            <HiOutlineX className="btn-close"></HiOutlineX>
          </Link>
        </div>
        <div className="vault-settings standard-stack gap-20">
          <VaultMembers></VaultMembers>
        </div>
      </div>
    </div>
  );
};

export default Members;
