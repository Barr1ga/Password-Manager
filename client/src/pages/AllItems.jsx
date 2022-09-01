import React from "react";
import AddItemModal from "../components/AddItemModal";
import Filters from "../components/Filters";
import PasswordItem from "../components/PasswordItem";
import { useDispatch, useSelector } from "react-redux";

const AllItems = () => {
  const route = "/All";
  const dispatch = useDispatch();
  const { passwords } = useSelector((state) => state.passwords);

  const filteredPasswords = passwords.filter(
    (password) => password.trash === false
  );

  const count = filteredPasswords.length;

  return (
    <div className="margin-content">
      <div className="page-header padding-side">
        <h4>All Items</h4>{" "}
        <div>
          <Filters></Filters>
          <AddItemModal></AddItemModal>
        </div>
      </div>
      <div className="password-list standard-stack">
        <span className="padding-side count">{count} Items</span>
        {filteredPasswords.map((password, idx) => (
          <PasswordItem
            key={idx}
            route={route}
            password={password}
          ></PasswordItem>
        ))}
      </div>
      <div className="page-footer padding-side">
        <AddItemModal></AddItemModal>
      </div>
    </div>
  );
};

export default AllItems;
