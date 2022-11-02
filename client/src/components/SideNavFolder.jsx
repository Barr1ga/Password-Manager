import React, { useState } from "react";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import SideNavFolderContent from "./SideNavFolderContent";
import AddFolderModal from "./folders/AddFolderModal";
import { useSelector } from "react-redux";

const SideNavFolders = ({ folder, items }) => {
  const [showNavFolders, setShowNavFolders] = useState(true);
  const { folders } = useSelector((state) => state.folders);

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
            <p className="full">folders</p>
            <p className="short">f</p>
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
