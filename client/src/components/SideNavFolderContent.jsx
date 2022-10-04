import React from "react";
import { HiOutlineFolder, HiFolder } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const SideNavFolder = ({ folder }) => {
  const route = useLocation().pathname;

  const notification = false;

  return (
    <Link
      to={`/${folder}`}
      className={
        notification
          ? "sidenav-button new-notif"
          : route === `/${folder}`
          ? "sidenav-button selected"
          : "sidenav-button"
      }
    >
      {route === `/${folder}` ? (
        <HiFolder></HiFolder>
      ) : (
        <HiOutlineFolder></HiOutlineFolder>
      )}
      <p>
        {folder} {notification && <span className="notif-ball"></span>}
      </p>
    </Link>
  );
};

export default SideNavFolder;
