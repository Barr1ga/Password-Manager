import React, { useEffect, useState } from "react";
import ConfirmModal from "../../helpers/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { changeVault } from "../../../features/slice/authSlice";
import {
  resetItems,
  resetSelectedItem,
  setItemFetchedOnce,
  setItemGetFlag,
} from "../../../features/slice/itemSlice";
import { resetSelectedFolder } from "../../../features/slice/folderSlice";
import { resetSelectedRole } from "../../../features/slice/roleSlice";
import { useNavigate } from "react-router-dom";

const ChangeVault = () => {
  const [loading, setLoading] = useState(false);
  const [showVaults, setShowVaults] = useState(false);
  const dispatch = useDispatch();
  const { authUser, vaults, currentVault } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [currentVault]);

  const handleChangeVault = (vault) => {
    setShowVaults(false);
    setLoading(true);
    dispatch(setItemFetchedOnce(false));
    dispatch(resetSelectedItem());
    dispatch(resetSelectedFolder());
    dispatch(resetSelectedRole());
    dispatch(changeVault({ vaultUid: vault.vault }));
    dispatch(resetItems());
    navigate("/");
  };

  const openedVault = vaults.find((vault) => vault.vault === currentVault);

  return (
    <>
      {openedVault && (
        <div className="sidenav-vaults">
          {!showVaults && (
            <div
              className="vault-item"
              onClick={() => setShowVaults((prev) => !prev)}
            >
              <div className="image">{openedVault?.username?.charAt(0)}</div>
              <p>{openedVault?.username + "'s Vault"}</p>
            </div>
          )}
          {showVaults && (
            <div className="user-vaults">
              {vaults.map((vault, idx) => (
                <div
                  key={idx}
                  className={
                    currentVault === vault?.vault
                      ? "vault-item selected"
                      : "vault-item"
                  }
                  onClick={() => handleChangeVault(vault)}
                >
                  <div className="image">{vault.username?.charAt(0)}</div>
                  <p>{vault.username}'s Vault</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChangeVault;
