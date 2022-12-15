import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiPlus } from "react-icons/hi";

const MembersList = ({
  method,
  preAssignedMembers,
  unAssignedMembers,
  setUnAssignedMembers,
  assignedMembers,
  setAssignedMembers,
}) => {
  // const [assignedMembers, setAssignedMembers] = useState([]);
  const [search, setSearch] = useState("");
  const { members } = useSelector((state) => state.members);
  const [focused, setFocused] = useState(false);

  // P = 1,2,3
  // A = 1,2,3
  // U =
  // console.log("test");
  // console.log(
  //   "P",
  //   preAssignedMembers.map((x) => x.uid)
  // );
  // console.log(
  //   "A",
  //   assignedMembers.map((x) => x.uid)
  // );
  // console.log(
  //   "U",
  //   unAssignedMembers.map((x) => x.uid)
  // );
  const handleSelectMember = (member) => {
    // add
    if (!assignedMembers.includes(member)) {
      if (
        unAssignedMembers &&
        setUnAssignedMembers &&
        unAssignedMembers.indexOf(member) !== -1
      ) {
        setUnAssignedMembers(
          unAssignedMembers.filter(
            (unAssignedMember) => unAssignedMember.uid !== member.uid
          )
        );
      }

      setAssignedMembers([...assignedMembers, member]);

      // delete
    } else {
      // if exists in preassigned
      if (
        preAssignedMembers &&
        unAssignedMembers &&
        setUnAssignedMembers &&
        preAssignedMembers.indexOf(member) !== -1
      ) {
        setUnAssignedMembers([...unAssignedMembers, member]);
      }

      setAssignedMembers(
        assignedMembers.filter(
          (assignedMember) => assignedMember.uid !== member.uid
        )
      );
    }
  };

  const filteredMembers =
    search !== ""
      ? members.filter((member) =>
          member.username.toLowerCase().includes(search.toLowerCase())
        )
      : members;

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      if (search === "" && assignedMembers.length > 0) {
        setAssignedMembers(assignedMembers.slice(0, -1));
      }
    }
  };

  return (
    <>
      <div className="vault-members">
        <div className="form-group">
          <div
            className={focused ? "form-pills form-pills-active" : "form-pills"}
          >
            {assignedMembers.map((member, idx) => (
              <div key={idx} className="pill">
                <small>{member.username}</small>
                <HiPlus
                  className="btn-delete"
                  onClick={() =>
                    setAssignedMembers(
                      assignedMembers.filter((_, i) => i !== idx)
                    )
                  }
                ></HiPlus>
              </div>
            ))}
            <input
              placeholder={assignedMembers.length === 0 ? "Search Member" : ""}
              type="text"
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="form-control-borderless"
              autocomplete="off"
            />
          </div>
          {focused}
        </div>
        <div className="standard-stack">
          <span className="member-count">{filteredMembers.length} Members</span>

          {filteredMembers.length === 0 && (
            <span className="member disabled">No members found</span>
          )}

          {filteredMembers.length > 0 &&
            filteredMembers.map((member, idx) => (
              <div
                key={idx}
                className="member"
                onClick={() => handleSelectMember(member)}
              >
                {member.image === "" ? (
                  <div className="image">{member.username.charAt(0)}</div>
                ) : (
                  <img
                    src={member.image}
                    alt={member.username}
                    className="image"
                  ></img>
                )}
                <div className="name">
                  <p>{member.username}</p>
                  <small>{member.email}</small>
                </div>
                <div className="custom-toggle-pill">
                  {assignedMembers.includes(member) && (
                    <div className="custom-toggle-pill-fill"></div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MembersList;
