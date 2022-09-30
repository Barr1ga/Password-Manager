import React, { useState } from "react";
import AddItemButton from "../components/AddItemButton";
import Filters from "../components/Filters";
import PasswordItem from "../components/PasswordItem";
import PasswordCard from "../components/PasswordCard";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineViewGrid, HiOutlineServer } from "react-icons/hi";
import Button from "react-bootstrap/Button";

const SharingCenter = () => {
  const route = "/SharingCenter";
  const [listView, setListView] = useState(true);
  const dispatch = useDispatch();
  const { passwords } = useSelector((state) => state.passwords)

  const filteredPasswords = passwords.filter((password) => password.type === "sharingCenter" && password.trash === false);
  const count = filteredPasswords.length;

  return (
    <div className="margin-content">
      <div className="page-header padding-side">
        <h4>All Items</h4><div>
          <Filters></Filters>
          <AddItemButton></AddItemButton>
        </div>
      </div>
      <div className="password-list standard-stack"><span className="padding-side count">{count} Items</span>
        {filteredPasswords.map((password, idx) => <PasswordItem key={idx} route={route} password={password}></PasswordItem>)}
        
      </div>
      <div className="page-footer padding-side">
        <AddItemButton></AddItemButton>
      </div>
    </div>
  );
}

export default SharingCenter