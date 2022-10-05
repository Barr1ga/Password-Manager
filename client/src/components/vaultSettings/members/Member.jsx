import React from "react";
import {
  HiViewGrid,
  HiStar,
  HiTrash,
  HiUserGroup,
  HiShieldCheck,
  HiClipboardList,
  HiGlobe,
  HiCreditCard,
  HiIdentification,
  HiDocumentText,
  HiWifi,
  HiUsers,
  HiFolder,
  HiPlusSm,
  HiPlus,
} from "react-icons/hi";
import { FaCrown } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import Role from "./Role";
import Button from "react-bootstrap/esm/Button";

const Member = ({ member }) => {
  const { roles } = useSelector((state) => state.roles);
  const ownerID = roles.find((role) => role.name === "Vault Owner").uid;

  return (
    <div className="member gap-10">
      <div className="image">{member.username.charAt(0)}</div>
      <div className="name standard-stack gap-10">
        <div>
          <p className={member.rolesID[0] === ownerID ? "vault-owner" : ""}>
            <b>{member.username}</b>{" "}
            {member.roleID === ownerID && (
              <small className="vault-owner-tag">
                <FaCrown></FaCrown>VO
              </small>
            )}
          </p>
          <small>{member.email}</small>
        </div>
        <div className="roles">
          {member.rolesID[0] === ownerID && (
            <small className="vault-owner-tag">
              <FaCrown></FaCrown>VO
            </small>
          )}
          {member.rolesID.map((roleID, idx) => (
            <Role key={idx} roleID={roleID}></Role>
          ))}
          <Button className="btn-secondary btn-add-role"><HiPlus></HiPlus></Button>
        </div>
      </div>

      {/* <HiDotsVertical className="three-dots"></HiDotsVertical> */}
    </div>
  );
};

export default Member;
