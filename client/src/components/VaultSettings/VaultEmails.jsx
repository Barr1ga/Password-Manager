import React, { useState } from "react";
import WarningAlert from "../WarningAlert";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import VaultMembers from "../VaultMembers";

const VaultEmails = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "horebBarriga",
      email: "hor.barr1ga@gmail.com",
      role: "vault owner",
    },
    {
      id: 1,
      name: "DainSiao",
      email: "dainalou@gmail.com",
      role: "vault owner",
    },
    {
      id: 1,
      name: "CJCaburnay",
      email: "caburnaycj@gmail.com",
      role: "employee",
    },
    { id: 1, name: "Bryll", email: "bryllandales@gmail.com", role: "family" },
    {
      id: 1,
      name: "JemseyAmonsot",
      email: "jemseyamonsot@gmail.com",
      role: "family",
    },
  ]);

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

  console.log(members);

  return (
    <div className="standard-stack">
      <div className="form-group">
        <div className="padding-side">
          <h5>Add Users</h5>
          <form>
            <div className="form-group">
              <WarningAlert
                message={
                  "Please note that inviting users to this vault may lead to unauthorized access to sensitive information. Assign proper authorizations to new and existing users by giving them appropriate roles."
                }
              ></WarningAlert>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="text"
                {...register("email", {
                  required: {
                    value: true,
                    message: "User email is required",
                  },
                })}
                className={
                  errors.name ? "form-control form-error" : "form-control "
                }
              />
              {errors.name && (
                <small className="error-message">
                  ⚠ {errors.name.message}
                  <br></br>
                </small>
              )}

              <small>
                You can add the emails addresses of users to give them access to
                this vault.
              </small>
            </div>
            <div className="form-group">
              <Button type="submit" className="btn-dark">
                Add Email
              </Button>
            </div>
          </form>
        </div>

        <VaultMembers></VaultMembers>
        {/* {members.map((member, idx) => (
          <Member key={idx} member={member}></Member>
        ))} */}
      </div>
    </div>
  );
};

export default VaultEmails;
