import React, { useEffect } from "react";
import useGenerateRandomColor from "../hooks/useGenerateRandomColor";
import {
  HiDotsVertical,
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
import { RiSettings2Line } from "react-icons/ri";

const VaultMember = ({ member }) => {
  return (
    <div className="member padding-side gap-10">
      <div className="image">
        {member.name.charAt(0)}
        {member.status === "online" && <div className="online"></div>}
        {member.status === "idle" && <div className="idle"></div>}
      </div>
      <div className="name">
        <p className={member.role === "vault owner" ? "vault-owner" : ""}>
          <b>{member.name}</b>
        </p>
        <small>
          {member.viewing !== "" && ("Viewing")}
          {" "}<b>{member.viewing}</b>{" "}
          {member.viewing === "All" && <HiViewGrid></HiViewGrid>}
          {member.viewing === "Favorites" && <HiStar></HiStar>}
          {member.viewing === "Trash" && <HiTrash></HiTrash>}
          {member.viewing === "Sharing Center" && (
            <HiUsers></HiUsers>
          )}
          {member.viewing === "Vault Settings" && (
            <RiSettings2Line></RiSettings2Line>
          )}
          {member.viewing === "Members" && (
            <HiUserGroup></HiUserGroup>
          )}
          {member.viewing === "Audit Log" && (
            <HiClipboardList></HiClipboardList>
          )}
          {member.viewing === "Roles" && (
            <HiShieldCheck></HiShieldCheck>
          )}
          {member.viewing === "Logins" && <HiGlobe></HiGlobe>}
          {member.viewing === "Cards" && (
            <HiCreditCard></HiCreditCard>
          )}
          {member.viewing === "Identifications" && (
            <HiIdentification></HiIdentification>
          )}
          {member.viewing === "Secure Notes" && (
            <HiDocumentText></HiDocumentText>
          )}
          {member.viewing === "Wifi Passwods" && (
            <HiWifi></HiWifi>
          )}
          {member.viewing === "Sharing Center" && (
            <HiViewGrid></HiViewGrid>
          )}
          {member.viewing === "Folder" && <HiFolder></HiFolder>}
        </small>
      </div>
      {/* <HiDotsVertical className="three-dots"></HiDotsVertical> */}
    </div>
  );
};

export default VaultMember;
