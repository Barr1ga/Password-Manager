import React, { useState } from "react";
import VaultMember from "./VaultMember";
import { RiArrowRightSLine } from "react-icons/ri";
import VaultRoles from "./VaultRoles";

const VaultMembers = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "horebBarriga",
      email: "hor.barr1ga@gmail.com",
      role: "vault owner",
    },
    {
      id: 1,
      name: "DainSiao",
      email: "dainalou@gmail.com",
      role: "vault owner",
    },
    {
      id: 1,
      name: "CJCaburnay",
      email: "caburnaycj@gmail.com",
      role: "employee",
    },
    { id: 1, name: "Bryll", email: "bryllandales@gmail.com", role: "family" },
    {
      id: 1,
      name: "JemseyAmonsot",
      email: "jemseyamonsot@gmail.com",
      role: "family",
    },
  ]);

  const roles = [...new Set(members.map((member) => member.role))];
  const idx = roles.indexOf("vault owner");
  //   swap index
  [roles[0], roles[idx]] = [roles[idx], roles[0]];

  return (
    <div className="vault-members standard-stack gap-10">
      <h5>Vault Members</h5>

      {roles.map((role) => (
        <VaultRoles role={role} members={members}></VaultRoles>
      ))}
    </div>
  );
};

export default VaultMembers;
