import React, { useState } from "react";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import { HiPlusSm } from "react-icons/hi";
import SideNavFolderContent from "./SideNavFolderContent";
import AddFolderModal from "./folders/AddFolderModal";

const SideNavFolders = ({ folder, items }) => {
  const [showNavFolders, setShowNavFolders] = useState(true);
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
