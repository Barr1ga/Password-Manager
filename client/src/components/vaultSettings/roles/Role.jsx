import React from "react";
import { HiLockClosed, HiOutlineChevronRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { HiPlus } from "react-icons/hi";
import AssignMemberButton from "./AssignMemberButton";
import { FaCrown } from "react-icons/fa";
import { selectRole } from "../../../features/slice/roleSlice";
import { Link } from "react-router-dom";
import { resetSelectedItem } from "../../../features/slice/itemSlice";

const Role = ({ role, isVaultOwner }) => {
  const { members } = useSelector((state) => state.members);
  const { selectedRole } = useSelector((state) => state.roles);
  const { selectedItem } = useSelector((state) => state.items);
  const route = "/Roles";

  const dispatch = useDispatch();

  const handleRoleClicked = () => {
    if (selectedItem !== "") {
      dispatch(resetSelectedItem());
    }
    dispatch(selectRole(role.uid));
  };

  let filteredMembers = members.filter((member) => {
    if (member.roleUids.includes(role.uid)) {
      return member;
    }
  });

  let length = filteredMembers.length;

  filteredMembers = filteredMembers.slice(0, 5);

  const remainingCount = length - filteredMembers.length;

  return (
    <Link
      to={`${route}/${role.uid}`}
      className={
        selectedRole === role.uid
          ? "role-item role-item-selected padding-side"
          : "role-item padding-side"
      }
      onClick={handleRoleClicked}
    >
      <div>
        <div className="name">
          {isVaultOwner ? (
            <small className="vault-owner-tag">
              <FaCrown></FaCrown>VO
            </small>
          ) : (
            <span className="role-tag">
              <small style={{ color: role.color }}>{role.abbreviation}</small>
            </span>
          )}
          <div>
            <span>
              {role.name} {isVaultOwner && <HiLockClosed></HiLockClosed>}
            </span>
          </div>
        </div>
        <div className="info">
          <span>
            {filteredMembers.length > 0 && (
              <div className="members-with-role">
                {filteredMembers.map((member, idx) =>
                  member.image === "" ? (
                    <>
                      <div key={idx} className="member">
                        {member.username.charAt(0)}
                      </div>
                    </>
                  ) : (
                    <img
                      key={idx}
                      src={member.image}
                      alt={member.username}
                      className="member"
                    ></img>
                  )
                )}
                {remainingCount > 0 && (
                  <div className="member last-member">+{remainingCount}</div>
                )}
              </div>
            )}
            {/* <div className="btn-circle">
              <HiPlus></HiPlus>
            </div> */}
            <AssignMemberButton role={role}></AssignMemberButton>
          </span>
        </div>
      </div>
      <HiOutlineChevronRight className="three-dots"></HiOutlineChevronRight>
    </Link>
  );
};

export default Role;
