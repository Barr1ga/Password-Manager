import React from 'react'
import PasswordItem from "../components/PasswordItem";
import Filters from "../components/Filters";
import { useSelector } from "react-redux";

const Trash = () => {
  const route = "/Trash";

  const { passwords } = useSelector((state) => state.passwords)

  const filteredPasswords = passwords.filter((password) => password.trash === true);
  const count = filteredPasswords.length;


  return (
    <div className="margin-content">
      <div className="page-header padding-side">
        <h4>All Items</h4><div>
          <Filters></Filters>
        </div>
      </div>
      <div className="password-list standard-stack"><span className="padding-side count">{count} Items</span>
        {filteredPasswords.map((password, idx) => <PasswordItem key={idx} route={route} password={password}></PasswordItem>)}
        
      </div>
    </div>
  );
}

export default Trash