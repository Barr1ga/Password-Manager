import React from "react";
import { HiOutlineFolder, HiFolder } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const SideNavFolder = ({ folderName, content }) => {
  const route = useLocation().pathname;
  return (
    <Link
      to={`/${folderName}/${content}`}
      className={route === "/" ? "sidenav-button selected" : "sidenav-button"}
    >
      {route === `/${folderName}/${content}` ? (
        <HiFolder></HiFolder>
      ) : (
        <HiOutlineFolder></HiOutlineFolder>
      )}
      {content}
    </Link>
  );
};

export default SideNavFolder;
