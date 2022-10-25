import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiPlus } from "react-icons/hi";

const MembersList = () => {
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [search, setSearch] = useState("");
  const { members } = useSelector((state) => state.members);
  const [focused, setFocused] = useState(false);
  const handleSelectMember = (member) => {
    const { image, username } = member;
    setAssignedMembers([...assignedMembers, { image, username }]);
  };

  const filteredMembers =
    search !== ""
      ? members.filter((member) => member.username.includes(search))
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

          {filteredMembers.map((member, idx) => (
            <div key={idx} className="member">
              {member.image === "" ? (
                <div className="image">{member.username.charAt(0)}</div>
              ) : (
                <img src={member.image} className="image"></img>
              )}
              <div className="name">
                <p>{member.username}</p>
                <small>{member.email}</small>
              </div>
              <div class="toggle-pill-color">
                <input type="checkbox"></input>
                <div class="toggle-pill-color">
                  <input
                    type="checkbox"
                    id={`checkbox-${idx}`}
                    onClick={() => handleSelectMember(member)}
                  ></input>
                  <label for={`checkbox-${idx}`}></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MembersList;
