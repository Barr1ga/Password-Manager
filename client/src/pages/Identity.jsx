import React from 'react'
import AddItemModal from "../components/AddItemModal";
import PasswordItem from "../components/PasswordItem";
import Filters from "../components/Filters";
import { useSelector } from "react-redux";

const Identity = () => {
  const route = "/Identity";

  const { passwords } = useSelector((state) => state.passwords)

  const filteredPasswords = passwords.filter((password) => password.type === "identity" && password.trash === false);
  const count = filteredPasswords.length;


  return (
    <div className="margin-content">
      <div className="page-header padding-side">
        <h4>All Items</h4><div>
          <Filters></Filters>
          <AddItemModal></AddItemModal>
        </div>
      </div>
      <div className="password-list standard-stack"><span className="padding-side count">{count} Items</span>
        {filteredPasswords.map((password, idx) => <PasswordItem key={idx} route={route} password={password}></PasswordItem>)}
        
      </div><div className="page-footer padding-side">
        <AddItemModal></AddItemModal>
      </div>
    </div>
  );
}

export default Identity