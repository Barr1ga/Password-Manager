import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { HiOutlineSearch, HiPlus } from "react-icons/hi";
import Button from "react-bootstrap/Button";

const MembersList = () => {
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
  return (
    <>
      <div className="vault-members">
        <div className="form-group form-search">
          <input
            placeholder="Search Member"
            type="text"
            {...register("email")}
            className={
              errors.name ? "form-control form-error" : "form-control "
            }
          />
          <HiOutlineSearch className="icon"></HiOutlineSearch>
        </div>
        <div className="standard-stack">
          <span className="member-count">{members.length} Members</span>

          {members.map((member, idx) => (
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
              <Button className="btn-secondary btn-add-role">
                <HiPlus className="btn-delete"></HiPlus>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MembersList;
