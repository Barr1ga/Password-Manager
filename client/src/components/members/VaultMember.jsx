import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Roles from "../vaultSettings/members/Roles";
import SpinnerLoader from "../SpinnerLoader";
import {
  kickMember,
  resetMemberQueryFulfilled,
} from "../../features/slice/memberSlice";
import { createLog } from "../../features/slice/auditLogSlice";

const VaultMember = ({ member }) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const { roles } = useSelector((state) => state.roles);
  const { authUser } = useSelector((state) => state.auth);
  const nameColor = roles.find(
    (role) => role.uid === member.roleUids[0]
  )?.color;
  const { members, memberUpdatedFullfilled } = useSelector(
    (state) => state.members
  );
  const ownerUid = roles.find((role) => role.name === "Vault Owner").uid;
  const ownerUserUid = members.find((member) =>
    member.roleUids.includes(ownerUid)
  ).uid;
  const isNotOwner = authUser.uid !== ownerUserUid ? true : false;
  const dispatch = useDispatch();

  const handleClose = () => {
    if (!isHovering) {
      setIsFocus(false);
    }
  };

  useEffect(() => {
    if (memberUpdatedFullfilled) {
      setLoading(false);
      setShow(false);
      dispatch(resetMemberQueryFulfilled());
    }
  }, [memberUpdatedFullfilled, members]);

  const handleKickMember = () => {
    setLoading(true);
    const kickMemberData = {
      vaultUid: authUser.uid,
      memberUid: member.uid,
    };

    const auditData = {
      uid: authUser.uid,
      auditLogData: {
        actorUid: authUser.uid,
        action: "item/update",
        description: "kicked ",
        benefactor: member.username,
      },
    };

    dispatch(createLog(auditData));
    dispatch(kickMember(kickMemberData));
  };

  return (
    <Button
      className="member padding-side gap-10"
      onClick={() => setIsFocus(true)}
      onBlur={handleClose}
    >
      <div className="image">
        {member.username.charAt(0)}
        {member.status === "online" && <div className="online"></div>}
        {member.status === "idle" && <div className="idle"></div>}
      </div>
      <div className="name">
        <p className={member.roleUids[0] === ownerUid ? "vault-owner" : ""}>
          <b style={{ color: nameColor }}>{member.username}</b>{" "}
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
      {isFocus && (
        <div
          className="member-profile standard-stack gap-10"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="user">
            <div className="image">{member.username.charAt(0)}</div>
            <div className="name">
              <p style={{ color: nameColor }}>
                <b>{member.username}</b>{" "}
                {member.roleUids[0] === ownerUid && (
                  <small className="vault-owner-tag">
                    <FaCrown></FaCrown>VO
                  </small>
                )}
              </p>
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
                {member.viewing === "Sharing Center" && (
                  <HiViewGrid></HiViewGrid>
                )}
                {member.viewing === "Folder" && <HiFolder></HiFolder>}
              </small>
            </div>
          </div>
          <hr></hr>
          <div className="roles">
            <Roles member={member}></Roles>
          </div>
          {!isNotOwner && (
            <>
              <hr></hr>
              <div className="interactions">
                <Button
                  type="button"
                  className="btn-secondary danger btn-long"
                  onClick={() => setShow(true)}
                >
                  Kick Member
                </Button>
              </div>
            </>
          )}
          <Modal
            size="sm"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Body className="confirmation-modal-body">
              <div className="confirmation-modal">
                <h5>{"Are you sure you want to kick this member?"}</h5>
                <small>
                  {"This action cannot be undone. Please be certain."}
                </small>
                <div className="options gap-10">
                  <Button
                    type="button"
                    className="btn-secondary btn-long"
                    onClick={() => setShow(false)}
                  >
                    Cancel
                  </Button>
                  {loading ? (
                    <Button
                      type="button"
                      className="btn-secondary btn-long danger"
                    >
                      <SpinnerLoader></SpinnerLoader>
                    </Button>
                  ) : (
                    <Button
                      onClick={handleKickMember}
                      type="button"
                      className="btn-secondary btn-long danger"
                    >
                      <>Kick</>
                    </Button>
                  )}
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </Button>
  );
};

export default VaultMember;
