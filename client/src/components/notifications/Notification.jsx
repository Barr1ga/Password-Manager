import React from "react";
import Button from "react-bootstrap/Button";
import { HiOutlineLockOpen } from "react-icons/hi";
import { formatDate } from "../../utils/date";

const notification = ({ notification }) => {
  const handleJoinVault = () => {
    console.log("test");
  };

  console.log(notification);
  //   console.log(formatDate(notification.date));
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
          <Button
            type="button"
            className="btn-dark"
            onClick={() => handleJoinVault()}
          >
            Join Vault
          </Button>
        </div>
      </div>
    </div>
  );
};

export default notification;
