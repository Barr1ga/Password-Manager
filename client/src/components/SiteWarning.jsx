import React from "react";
import { HiExclamationCircle } from "react-icons/hi";

const SiteWarning = () => {
  return (
    <div className="site-warning">
      <div className="title padding-side gap-10">
        <HiExclamationCircle className="icon"></HiExclamationCircle>
        <h5>Security Reminder</h5>
      </div>
      <div className="message">
        <p>
          Vaulteer will never ask you to divulge your password. Persons or
          messages asking you to reveal your login or password are illegitimate
          even if they might seem to be legitimate. Be suspicious-ignore or
          delete such requests — <span>Vaulteer</span>
        </p>
      </div>
    </div>
  );
};

export default SiteWarning;
