import React from "react";
import { HiExclamationCircle } from "react-icons/hi";

const PrimaryAlert = ({title, message}) => {
  return (
    <div className="primary-alert standard-stack gap-10">
      <div className="alert-header">
        <HiExclamationCircle className="icon"></HiExclamationCircle>{title}
      </div>
      <small>
        {message}
      </small>
    </div>
  );
};

export default PrimaryAlert;
