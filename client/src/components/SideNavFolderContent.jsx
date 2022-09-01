import React from "react";
import { HiOutlineFolder, HiFolder } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const SideNavFolder = ({ folder }) => {
  const route = useLocation().pathname;
  return (
    <Link
      to={`/${folder}`}
      className={route === `/${folder}` ? "sidenav-button selected" : "sidenav-button"}
    >
      {route === `/${folder}` ? (
        <HiFolder></HiFolder>
      ) : (
        <HiOutlineFolder></HiOutlineFolder>
      )}
      <p>{folder}</p>
    </Link>
  );
};

export default SideNavFolder;
