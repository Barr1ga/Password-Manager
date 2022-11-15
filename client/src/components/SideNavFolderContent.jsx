import React from "react";
import { HiOutlineFolder, HiFolder } from "react-icons/hi";
import { RiSettings2Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const SideNavFolder = ({ folder }) => {
  const route = useLocation().pathname;

  const notification = true;

  return (
    <Link
      to={`Folders/${folder}`}
      className={
        notification && route.includes(folder)
          ? "sidenav-button new-notif selected"
          : route.includes(folder)
          ? "sidenav-button selected"
          : notification
          ? "sidenav-button new-notif"
          : "sidenav-button"
      }
    >
      {route.includes(folder) ? (
        <HiFolder></HiFolder>
      ) : (
        <HiOutlineFolder></HiOutlineFolder>
      )}
      <p>
        {folder} {notification && <span className="notif-ball"></span>}
      </p>
      <span className="folder-settings">
        <RiSettings2Fill></RiSettings2Fill>
      </span>
    </Link>
  );
};

export default SideNavFolder;
