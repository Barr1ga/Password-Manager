import React from "react";
import { HiExclamation } from "react-icons/hi";

const WarningAlert = ({message}) => {
  return (
    <div className="warning-alert standard-stack gap-10">
      <div className="alert-header">
        <HiExclamation className="icon"></HiExclamation>WARNING
      </div>
      <small>
        {message}
      </small>
    </div>
  );
};

export default WarningAlert;
