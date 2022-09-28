import React from "react";
import { HiExclamation } from "react-icons/hi";

const PrimaryAlert = ({title, message}) => {
  return (
    <div className="primary-alert standard-stack gap-10">
      <div className="alert-header">
        <HiExclamation className="icon"></HiExclamation>{title}
      </div>
      <small>
        {message}
      </small>
    </div>
  );
};

export default PrimaryAlert;
