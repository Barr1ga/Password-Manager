import React from "react";
import { HiDotsVertical, HiLink, HiStar } from "react-icons/hi";

const PasswordItem = ({ password }) => {
  return (
    <div className="password-item gap-10 padding-side">
      <div className="icon"></div>
      <div className="name standard-stack">
        <a className={password.trash ? "siteName trashed btn-link" : "siteName btn-link"} href={password.link} target="_blank">
          {password.siteName} <HiLink className="link-icon"></HiLink> {password.favorite && <HiStar className="favorited"></HiStar>}
        </a>
        <small>{password.email}</small>
      </div>
      <HiDotsVertical className="three-dots"></HiDotsVertical>
    </div>
  );
};

export default PasswordItem;
