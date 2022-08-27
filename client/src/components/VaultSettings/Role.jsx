import React from "react";
import { HiShieldCheck, HiDotsVertical } from "react-icons/hi";

const Role = ({role, count}) => {
  return (
    <div className="role-item gap-10 padding-side">
      <HiShieldCheck className="icon"></HiShieldCheck>
      <div className="name standard-stack">
        {role} — {count}
      </div>
      <HiDotsVertical className="three-dots"></HiDotsVertical>
    </div>
  );
};

export default Role;
