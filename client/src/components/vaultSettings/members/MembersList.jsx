import React, { useState } from "react";
import { useSelector } from "react-redux";
import Member from "./Member";
import { useForm } from "react-hook-form";
import { HiOutlineSearch } from "react-icons/hi";

const MembersList = () => {
  const [searchValue, setSearchValue] = useState("");
  const { members } = useSelector((state) => state.members);

  let filteredMembers =
    searchValue !== ""
      ? members.filter(
          (member) =>
            member.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            member.email.toLowerCase().includes(searchValue.toLowerCase())
        )
      : members;

  return (
    <>
      <div className="vault-members">
        <div className="form-group form-search">
          <input
            placeholder="Search Member"
            type="text"
            className="form-control"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <HiOutlineSearch className="icon"></HiOutlineSearch>
        </div>
        <div className="standard-stack">
          <span className="member-count">{filteredMembers.length} Members</span>

          {filteredMembers.map((member, idx) => (
            <Member key={idx} member={member}></Member>
          ))}
        </div>
      </div>
    </>
  );
};

export default MembersList;
