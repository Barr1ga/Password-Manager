import React, { useState } from 'react'
import AddItem from "../components/AddItem";
import PasswordItem from "../components/PasswordItem";
import Filters from "../components/Filters";

const Favorites = () => {
  const [passwords, setPasswords] = useState([
    {
      id: 1,
      siteName: "Facebook",
      email: "hor.barr1ga@gmail.com",
      link: "https://www.facebook.com/",
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
      email: "horebbariga@gmail.com",
      link: "https://www.discord.com/",
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
      email: "hor.barr1ga@gmail.com",
      link: "https://www.instagram.com/",
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
      email: "barrigahoreb123@gmail.com",
      link: "https://www.behance.com/",
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
      email: "barrigahoreb123@gmail.com",
      link: "",
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

  const filteredPasswords = passwords.filter((password) => password.favorite === true && password.trash === false);
  const count = filteredPasswords.length;


  return (
    <div className="margin-content">
      <div className="page-header padding-side">
        <h4>All Items</h4><div>
          <Filters></Filters>
          <AddItem></AddItem>
        </div>
      </div>
        
      <div className="password-list standard-stack"><span className="padding-side count">{count} Items</span>
        {filteredPasswords.map((password, idx) => <PasswordItem key={idx} password={password}></PasswordItem>)}
        
      </div>
      <div className="page-footer padding-side">
        <AddItem></AddItem>
      </div>
    </div>
  );
}

export default Favorites