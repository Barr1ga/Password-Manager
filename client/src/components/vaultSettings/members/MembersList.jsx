import React from "react";
import { useSelector } from "react-redux";
import Member from "./Member";
import { useForm } from "react-hook-form";
import { HiOutlineSearch } from "react-icons/hi";

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
        {members.map((member, idx) => (
          <Member key={idx} member={member}></Member>
        ))}
      </div>
    </>
  );
};

export default MembersList;
