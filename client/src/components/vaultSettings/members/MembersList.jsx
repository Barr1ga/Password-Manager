import React, { useState } from "react";
import { useSelector } from "react-redux";
import Member from "./Member";
import { useForm } from "react-hook-form";
import { HiOutlineSearch } from "react-icons/hi";
import MemberLazyLoad from "./MemberLazyLoad";

const MembersList = () => {
  const [searchValue, setSearchValue] = useState("");
  const { members, memberLoading } = useSelector((state) => state.members);

  let filteredMembers =
    searchValue !== ""
      ? members.filter(
          (member) =>
            member.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            member.email.toLowerCase().includes(searchValue.toLowerCase())
        )
      : members;

  const lazyMemberCount = 4;

  return (
    <>
      <div className="vault-members">
        <div className="padding-side">
          <div className="form-group form-search">
            <input
              placeholder="Search Member"
              type="text"
              className="form-control"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <HiOutlineSearch className="icon"></HiOutlineSearch>
          </div>
        </div>
        <div className="standard-stack">
          <span className="member-count padding-side">
            {filteredMembers.length} Members
          </span>
          {memberLoading &&
            [...Array(lazyMemberCount)].map((member) => (
              <MemberLazyLoad></MemberLazyLoad>
            ))}

          {!memberLoading &&
            filteredMembers.map((member, idx) => (
              <Member key={idx} member={member}></Member>
            ))}
        </div>
      </div>
    </>
  );
};

export default MembersList;
