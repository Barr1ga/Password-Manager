import React, { useState } from "react";
import Button from "react-bootstrap/Button";
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
} from "react-icons/hi";
import { FaCrown } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import Roles from "../vaultSettings/members/Roles";

const VaultMember = ({ member }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const { roles } = useSelector((state) => state.roles);
  const ownerUid = roles.find((role) => role.name === "Vault Owner").uid;
  const nameColor = roles.find(
    (role) => role.uid === member.roleUids[0]
  )?.color;
  return (
    <div className="member padding-side gap-10">
      <div className="image">
        {member.username.charAt(0)}
        {member.status === "online" && <div className="online"></div>}
        {member.status === "idle" && <div className="idle"></div>}
      </div>
      <div className="name">
        <p className={member.roleUids[0] === ownerUid ? "vault-owner" : ""}>
          <b style={{ color: nameColor }}>
            {member.username}askhgdkhasjgfkhasgdfkagsdjfaksgf
          </b>{" "}
          {member.roleUids[0] === ownerUid && (
            <small className="vault-owner-tag">
              <FaCrown></FaCrown>VO
            </small>
          )}
        </p>
        <small>
          {member.viewing !== "" && "Viewing"} <b>{member.viewing}</b>{" "}
          {member.viewing === "All" && <HiViewGrid></HiViewGrid>}
          {member.viewing === "Favorites" && <HiStar></HiStar>}
          {member.viewing === "Trash" && <HiTrash></HiTrash>}
          {member.viewing === "Sharing Center" && <HiUsers></HiUsers>}
          {member.viewing === "Vault Settings" && (
            <RiSettings2Line></RiSettings2Line>
          )}
          {member.viewing === "Members" && <HiUserGroup></HiUserGroup>}
          {member.viewing === "Audit Log" && (
            <HiClipboardList></HiClipboardList>
          )}
          {member.viewing === "Roles" && <HiShieldCheck></HiShieldCheck>}
          {member.viewing === "Logins" && <HiGlobe></HiGlobe>}
          {member.viewing === "Cards" && <HiCreditCard></HiCreditCard>}
          {member.viewing === "Identifications" && (
            <HiIdentification></HiIdentification>
          )}
          {member.viewing === "Secure Notes" && (
            <HiDocumentText></HiDocumentText>
          )}
          {member.viewing === "Wifi Passwods" && <HiWifi></HiWifi>}
          {member.viewing === "Sharing Center" && <HiViewGrid></HiViewGrid>}
          {member.viewing === "Folder" && <HiFolder></HiFolder>}
        </small>
      </div>
      {/* <div className="member-profile standard-stack gap-10">
        <div className="user">
          <div className="image">{member.username.charAt(0)}</div>
          <div className="name">
            <p>{member.username}</p>
            <small>{member.email}</small>
            <small>
              {member.viewing !== "" && "Viewing"} <b>{member.viewing}</b>{" "}
              {member.viewing === "All" && <HiViewGrid></HiViewGrid>}
              {member.viewing === "Favorites" && <HiStar></HiStar>}
              {member.viewing === "Trash" && <HiTrash></HiTrash>}
              {member.viewing === "Sharing Center" && <HiUsers></HiUsers>}
              {member.viewing === "Vault Settings" && (
                <RiSettings2Line></RiSettings2Line>
              )}
              {member.viewing === "Members" && <HiUserGroup></HiUserGroup>}
              {member.viewing === "Audit Log" && (
                <HiClipboardList></HiClipboardList>
              )}
              {member.viewing === "Roles" && <HiShieldCheck></HiShieldCheck>}
              {member.viewing === "Logins" && <HiGlobe></HiGlobe>}
              {member.viewing === "Cards" && <HiCreditCard></HiCreditCard>}
              {member.viewing === "Identifications" && (
                <HiIdentification></HiIdentification>
              )}
              {member.viewing === "Secure Notes" && (
                <HiDocumentText></HiDocumentText>
              )}
              {member.viewing === "Wifi Passwods" && <HiWifi></HiWifi>}
              {member.viewing === "Sharing Center" && <HiViewGrid></HiViewGrid>}
              {member.viewing === "Folder" && <HiFolder></HiFolder>}
            </small>
          </div>
        </div>
        <div className="roles">
          <Roles member={member}></Roles>
        </div>
        <hr></hr>
        <div className="interactions">
          <Button type="button" className="btn-secondary danger btn-long">
            Kick Member
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default VaultMember;
