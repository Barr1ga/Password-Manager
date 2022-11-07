import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import VaultRoles from "../components/vaultSettings/roles/VaultRoles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRoles } from "../features/slice/roleSlice";

const Roles = () => {
  const { roles } = useSelector((state) => state.roles);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoles({ uid: authUser.uid }));
  }, []);

  return (
    <div className="scroll-view-long">
      <div className="margin-content">
        <div className="page-header padding-side">
          <h4>Roles</h4>
          <Link to="/">
            <HiOutlineX className="btn-close"></HiOutlineX>
          </Link>
        </div>
        <div className="standard-stack gap-20">
          <VaultRoles></VaultRoles>
        </div>
      </div>
    </div>
  );
};

export default Roles;
