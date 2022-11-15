import React from "react";
import { HiOutlineFolder, HiFolder } from "react-icons/hi";
import { RiSettings2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectFolder } from "../features/slice/folderSlice";
import { resetSelectedItem } from "../features/slice/itemSlice";
import { resetSelectedRole } from "../features/slice/roleSlice";

const SideNavFolder = ({ folder }) => {
  const dispatch = useDispatch();
  const route = useLocation().pathname;
  const { selectedRole } = useSelector((state) => state.folders);

  const notification = false;

  const handleFolderSettingsClicked = () => {
    if (selectedRole !== "") {
      dispatch(resetSelectedItem());
      dispatch(resetSelectedRole());
    }
    dispatch(selectFolder(folder.uid));
  };

  return (
    <Link
      to={`Folders/${folder.name}`}
      className={
        notification && route.includes(folder.name)
          ? "sidenav-button new-notif selected"
          : route.includes(folder.name)
          ? "sidenav-button selected"
          : notification
          ? "sidenav-button new-notif"
          : "sidenav-button"
      }
    >
      {route.includes(folder.name) ? (
        <HiFolder></HiFolder>
      ) : (
        <HiOutlineFolder></HiOutlineFolder>
      )}
      <p>
        {folder.name} {notification && <span className="notif-ball"></span>}
      </p>
      <span className="folder-settings" onClick={handleFolderSettingsClicked}>
        <RiSettings2Fill></RiSettings2Fill>
      </span>
    </Link>
  );
};

export default SideNavFolder;
