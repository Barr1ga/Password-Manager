import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiViewGrid,
  HiOutlineStar,
  HiStar,
  HiOutlineTrash,
  HiTrash,
} from "react-icons/hi";
import SideNavTypes from "./SideNavTypes";
import SideNavFolder from "./SideNavFolder";

const SideNav = () => {
  const route = useLocation().pathname;
  const [folders, setFolders] = useState([
    { folderName: "Folder 1", contents: ["Item 1", "Item 2"] },
    { folderName: "Folder 2", contents: ["Item 1", "Item 2", "Item 3"] },
  ]);

  return (
    <div className="side-nav standard-stack gap-10">
      <h5>My Vault</h5>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search Vault"
        ></input>
      </form>
      <div className="standard-stack">
        <Link
          to="/"
          className={
            route === "/" ? "sidenav-button selected" : "sidenav-button"
          }
        >
          {route === "/" ? (
            <HiViewGrid></HiViewGrid>
          ) : (
            <HiOutlineViewGrid></HiOutlineViewGrid>
          )}
          All Items
        </Link>
        <Link
          to="/Favorites"
          className={
            route === "/Favorites"
              ? "sidenav-button selected"
              : "sidenav-button"
          }
        >
          {route === "/Favorites" ? (
            <HiStar></HiStar>
          ) : (
            <HiOutlineStar></HiOutlineStar>
          )}
          Favorites
        </Link>
        <Link
          to="/Trash"
          className={
            route === "/Trash" ? "sidenav-button selected" : "sidenav-button"
          }
        >
          {route === "/Trash" ? (
            <HiTrash></HiTrash>
          ) : (
            <HiOutlineTrash></HiOutlineTrash>
          )}
          Trash
        </Link>
      </div>
      <SideNavTypes></SideNavTypes>

      {folders.map((folder) => (
        <SideNavFolder folder={folder}></SideNavFolder>
      ))}
    </div>
  );
};

export default SideNav;
