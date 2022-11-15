import React, { useEffect, useState } from "react";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import SideNavFolderContent from "./SideNavFolderContent";
import AddFolderModal from "./folders/AddFolderModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllFolders } from "../features/slice/folderSlice";
import FolderListLazyLoad from "./folders/FolderListLazyLoad";

const SideNavFolders = () => {
  const [showNavFolders, setShowNavFolders] = useState(true);
  const { folders, folderLoading } = useSelector((state) => state.folders);

  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFolders({ uid: authUser.uid }));
  }, []);

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
          {showNavFolders && !folderLoading ? (
            folders.map((folder, idx) => (
              <SideNavFolderContent
                key={idx}
                folder={folder}
              ></SideNavFolderContent>
            ))
          ) : (
            <FolderListLazyLoad></FolderListLazyLoad>
          )}
        </div>
      </div>
    </>
  );
};

export default SideNavFolders;
