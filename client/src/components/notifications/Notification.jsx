import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { HiOutlineLockOpen } from "react-icons/hi";
import { formatDate } from "../../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { joinVault } from "../../features/slice/authSlice";
import { createLog } from "../../features/slice/auditLogSlice";
import SpinnerLoader from "../SpinnerLoader";

const Notification = ({ notification }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { authUser, vaults, authFulfilled } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authFulfilled) {
      setLoading(false);
    }
  }, [authFulfilled]);

  const handleJoinVault = () => {
    setLoading(true);
    var userVaults = vaults.map((vault) => vault.vault);
    userVaults = [...userVaults, notification.actorUid];
    dispatch(
      joinVault({
        uid: authUser.uid,
        userVaults,
        vaultUid: notification.actorUid,
      })
    );

    const auditData = {
      uid: notification.actorUid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "user/joined",
        description: "joined this vault",
        benefactor: notification.username,
        date: new Date(),
      },
    };
    dispatch(createLog(auditData));
  };

  return (
    <div className="notification-item padding-side">
      <div className="user">
        <div className="image">{notification.username?.charAt(0)}</div>
      </div>
      <div className="notification-body standard-stack gap-10">
        <div className="name">
          <div className="standard-stack gap-10">
            <p>
              <b>{notification.username}</b>
              <span>{notification.description}</span>
            </p>
            <small>{formatDate(notification?.date)}</small>
          </div>
        </div>
        <div className="server standard-stack gap-10">
          {vaults?.some((vault) => vault.vault === notification.actorUid) ? (
            <Button type="button" className="btn-dark" disabled>
              Joined
            </Button>
          ) : (
            <Button
              type="button"
              className="btn-dark"
              onClick={() => handleJoinVault()}
            >
              {loading ? <SpinnerLoader></SpinnerLoader> : <>Join Vault</>}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
