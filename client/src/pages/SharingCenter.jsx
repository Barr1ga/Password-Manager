import React, { useState } from 'react'
import PasswordItem from "../components/PasswordItem";
import AddButton from "../components/AddButton";
import Filters from "../components/Filters";

const SharingCenter = () => {
  const [passwords, setPasswords] = useState([
    {
      id: 1,
      siteName: "Facebook",
      userName: "hor.barr1ga@gmail.com",
      domain: "https://www.facebook.com/",
      password: "hello123",
      type: "login",
      folder: "",
      favorite: false,
      trash: false,
      lastOpened: new Date(),
      lastOpenedBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      siteName: "Discord",
      userName: "horebbariga@gmail.com",
      domain: "https://www.discord.com/",
      password: "hello123",
      type: "login",
      folder: "",
      favorite: true,
      trash: false,
      lastOpened: new Date(),
      lastOpenedBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      siteName: "Instagram",
      userName: "hor.barr1ga@gmail.com",
      domain: "https://www.instagram.com/",
      password: "hello123",
      type: "login",
      folder: "",
      favorite: false,
      trash: false,
      lastOpened: new Date(),
      lastOpenedBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      siteName: "Behance",
      userName: "barrigahoreb123@gmail.com",
      domain: "https://www.behance.com/",
      password: "hello123",
      type: "login",
      folder: "",
      favorite: false,
      trash: true,
      lastOpened: new Date(),
      lastOpenedBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      siteName: "USC_Wifi",
      userName: "barrigahoreb123@gmail.com",
      domain: "",
      password: "hello123",
      type: "wifiPassword",
      folder: "",
      favorite: false,
      trash: true,
      lastOpened: new Date(),
      lastOpenedBy: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const filteredPasswords = passwords.filter((password) => password.type === "sharingCenter" && password.trash === false);
  const count = filteredPasswords.length;


  return (
    <div className="margin-content">
      <div className="page-header padding-side">
        <h4>All Items</h4><div>
          <Filters></Filters>
          <AddButton message={"Add Item"}></AddButton>
        </div>
      </div>
      <div className="password-list standard-stack"><span className="padding-side count">{count} Items</span>
        {filteredPasswords.map((password, idx) => <PasswordItem key={idx} password={password}></PasswordItem>)}
        
      </div>
      <div className="page-footer padding-side">
        <AddButton message={"Add Item"}></AddButton>
      </div>
    </div>
  );
}

export default SharingCenter