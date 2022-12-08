import React, { useEffect, useState } from "react";
import ConfirmModal from "../helpers/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { HiLockClosed, HiOutlineLockClosed, HiOutlineX } from "react-icons/hi";
import { getVaultOwners } from "../../features/slice/authSlice";

const ChangeVault = () => {
  const [selectedVault, setSelectedVault] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const dispatch = useDispatch();
  const { authUser, vaults } = useSelector((state) => state.auth);
  // console.log(vaults);
  // useEffect(() => {
  //   dispatch(getVaultOwners({ uid: authUser.uid }));
  // }, []);

  const handleChangeVault = () => {
    console.log("changeVault");
  };

  const handleOpenModal = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  return (
    <>
      <div className="sidenav-button" onClick={handleOpenModal}>
        {modalShow ? (
          <HiLockClosed></HiLockClosed>
        ) : (
          <HiOutlineLockClosed></HiOutlineLockClosed>
        )}
        <p>Your Vaults {true && <span className="notif-ball"></span>}</p>
      </div>
      <Modal
        scrollable
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        show={modalShow}
        onHide={handleCloseModal}
      >
        <Modal.Header>
          <div className="page-header-with-close">
            <h4>Change Vault</h4>
            {confirmClose ? (
              <ConfirmModal
                proceedInteraction={
                  <Button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-dark btn-long"
                  >
                    Leave
                  </Button>
                }
                component={<HiOutlineX className="btn-close"></HiOutlineX>}
                headerMessage={"Are you sure you want to leave this section?"}
                bodyMessage={
                  "You have unsaved content, and will be lost unless you save it."
                }
              ></ConfirmModal>
            ) : (
              <HiOutlineX
                className="btn-close"
                onClick={handleCloseModal}
              ></HiOutlineX>
            )}
          </div>
        </Modal.Header>
        <Modal.Body className="add-item-modal standard-stack gap-10">
          <div className="user-vaults">
            {vaults.map((vault) => (
              <div
                className={
                  selectedVault === vault.vault
                    ? "vault-item selected"
                    : "vault-item"
                }
                onClick={() => setSelectedVault(vault.vault)}
              >
                {vault.username}'s Vault
              </div>
            ))}
          </div>
          <ConfirmModal
            proceedInteraction={
              <Button
                type="button"
                className="btn-dark btn-long"
                onClick={handleChangeVault}
              >
                Change
              </Button>
            }
            component={
              <Button className="btn-dark btn-long">Change Vault</Button>
            }
            headerMessage={"Change Vault"}
            bodyMessage={"Are you sure you want to change vault?"}
          ></ConfirmModal>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangeVault;
