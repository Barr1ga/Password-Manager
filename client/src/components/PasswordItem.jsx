import React from "react";
import {HiDotsVertical, HiLink} from "react-icons/hi"


const PasswordItem = () => {
  return (
    <div className="password-item gap-10 padding-side">
      <div className="icon"></div>
      <div className="name">
        <p className="siteName">Amazon <HiLink className="link-icon"></HiLink></p>
        <small>hor.barr1ga@gmail.com</small>
      </div>
      <HiDotsVertical className="three-dots"></HiDotsVertical>
    </div>
  );
};

export default PasswordItem;
