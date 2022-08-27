import React, { useState } from "react";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import SideNavFolderContent from "./SideNavFolderContent";

const SideNavFolders = ({ folder }) => {
  const [showNavFolders, setShowNavFolders] = useState(true);
  const { folderName, contents } = folder;
  return (
    <>
      <span
        className="category-folder-title"
        onClick={() => setShowNavFolders((prev) => !prev)}
      >
        {folderName}
        {showNavFolders ? (
          <RiArrowDownSLine></RiArrowDownSLine>
        ) : (
          <RiArrowRightSLine></RiArrowRightSLine>
        )}
      </span>
      {showNavFolders &&
        contents.map((content, idx) => (
          <SideNavFolderContent key={idx} folderName={folderName} content={content}></SideNavFolderContent>
        ))}
    </>
  );
};

export default SideNavFolders;
