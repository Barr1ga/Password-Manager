import React, { useState } from "react";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import SideNavFolderContent from "./SideNavFolderContent";

const SideNavFolders = ({ folder, items }) => {
  const [showNavFolders, setShowNavFolders] = useState(true);
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

  const [folders, setFolders] = useState(["folder1", "folder2", "folder3"]);

  return (
    <>
      <span
        className="category-folder-title"
        onClick={() => setShowNavFolders((prev) => !prev)}
      >
        folders
        {showNavFolders ? (
          <RiArrowDownSLine></RiArrowDownSLine>
        ) : (
          <RiArrowRightSLine></RiArrowRightSLine>
        )}
      </span>
      {showNavFolders &&
        folders.map((folder, idx) => (
          <SideNavFolderContent key={idx} folder={folder}></SideNavFolderContent>
        ))}
    </>
  );
};

export default SideNavFolders;
