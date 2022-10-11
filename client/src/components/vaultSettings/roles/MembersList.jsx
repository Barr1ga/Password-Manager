import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { HiOutlineSearch, HiPlus } from "react-icons/hi";
import Button from "react-bootstrap/Button";

const MembersList = () => {
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [search, setSearch] = useState("");
  const { members } = useSelector((state) => state.members);
  const {
    register,
    handleSubmit,
    watch,
    // reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      //   sex: "",
    },
  });

  const handleSelectMember = (member) => {
    const { image, username } = member;
    setAssignedMembers([...assignedMembers, { image, username }]);
  };

  console.log(search);
  const filteredMembers =
    search !== ""
      ? members.filter((member) => member.username.includes(search))
      : members;

  return (
    <>
      <div className="vault-members">
        <div className="form-group">
          <div className="form-pills">
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
              onChange={(e) => setSearch(e.target.value)}
              className="form-control-borderless"
              autocomplete="off"
            />
          </div>
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
