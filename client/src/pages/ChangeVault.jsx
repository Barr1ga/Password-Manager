import React from "react";
import ConfirmModal from "../components/helpers/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { HiOutlineLockClosed } from "react-icons/hi";

const ChangeVault = () => {
  const handleChangeVault = () => {
    console.log("changeVault");
  };

  return (
    <div className="scroll-view-long">
      <div className="page-header page-header-with-close padding-side">
        <h4>Change Vault</h4>
      </div>
      <div className="vault-settings padding-side standard-stack gap-10">
        as
      </div>
    </div>
    // <ConfirmModal
    //   proceedInteraction={
    //     <Button
    //       type="button"
    //       className="btn-dark btn-long"
    //       onClick={handleChangeVault}
    //     >
    //       Change
    //     </Button>
    //   }
    //   component={
    //     <div className="sidenav-button">
    //       <HiOutlineLockClosed></HiOutlineLockClosed>{" "}
    //       <p>Change Vault {true && <span className="notif-ball"></span>}</p>
    //     </div>
    //   }
    //   headerMessage={"Change Vault"}
    //   bodyMessage={"Are you sure you want to change vault?"}
    // ></ConfirmModal>
  );
};

export default ChangeVault;
