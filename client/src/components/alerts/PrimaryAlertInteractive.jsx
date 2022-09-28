import React from "react";
import { HiExclamation } from "react-icons/hi";

const PrimaryAlert = ({title, message, interactions}) => {
  return (
    <div className="primary-alert interactive-alert standard-stack gap-10">
      <div className="alert-header">
        <HiExclamation className="icon"></HiExclamation>{title}
      </div>
      <small>
        {message}
      </small>
      <div className="interaction">
        {interactions}
      </div>
    </div>
  );
};

export default PrimaryAlert;
