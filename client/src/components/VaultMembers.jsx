import React, { useState } from "react";
import VaultMember from "./VaultMember";

const VaultMembers = () => {
  const [members, setMembers] = useState([
    { id: 1, name: "horebBarriga", email: "hor.barr1ga@gmail.com", role: "owner" },
    { id: 1, name: "DainSiao", email: "dainalou@gmail.com", role: "owner" },
    { id: 1, name: "CJCaburnay", email: "caburnaycj@gmail.com", role: "member" },
    { id: 1, name: "Bryll", email: "bryllandales@gmail.com", role: "member" },
    { id: 1, name: "JemseyAmonsot", email: "jemseyamonsot@gmail.com", role: "member" },
  ]);

  return (
    <div className="vault-members standard-stack gap-10">
      <h5>Vault Members</h5>
      <span className="role padding-side">vault owners</span>

      <div className="members-list">
        {members.map((member, idx) => (
          <VaultMember key={idx} member={member}></VaultMember>
        ))}
      </div>
    </div>
  );
};

export default VaultMembers;
