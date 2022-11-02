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
} from "react-icons/hi";
import { FaCrown } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const VaultMember = ({ member }) => {
  const { roles } = useSelector((state) => state.roles);
  const ownerID = roles.find((role) => role.name === "Vault Owner").uid;

  return (
    <div className="member padding-side gap-10">
      <div className="image">
        {member.username.charAt(0)}
        {member.status === "online" && <div className="online"></div>}
        {member.status === "idle" && <div className="idle"></div>}
      </div>
      <div className="name">
        <p className={member.rolesID[0] === ownerID ? "vault-owner" : ""}>
          <b>{member.username}</b>{" "}
          {member.rolesID[0] === ownerID && (
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
      {/* <HiDotsVertical className="three-dots"></HiDotsVertical> */}
    </div>
  );
};

export default VaultMember;
