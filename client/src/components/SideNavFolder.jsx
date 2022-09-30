import React, { useState } from "react";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import { HiPlusSm } from "react-icons/hi";
import SideNavFolderContent from "./SideNavFolderContent";
import AddFolderModal from "./folders/AddFolderModal";

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
      <div className="standard-stack gap-10">
        <span className="category-folder-title">
          <p onClick={() => setShowNavFolders((prev) => !prev)}>
            {showNavFolders ? (
              <RiArrowDownSLine></RiArrowDownSLine>
            ) : (
              <RiArrowRightSLine></RiArrowRightSLine>
            )}
            folders
          </p>
          <AddFolderModal></AddFolderModal>
        </span>
        <div className="standard-stack">
          {showNavFolders &&
            folders.map((folder, idx) => (
              <SideNavFolderContent
                key={idx}
                folder={folder}
              ></SideNavFolderContent>
            ))}
        </div>
      </div>
    </>
  );
};

export default SideNavFolders;
