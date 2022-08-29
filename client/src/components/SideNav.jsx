import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiViewGrid,
  HiOutlineStar,
  HiStar,
  HiOutlineTrash,
  HiTrash,
  HiOutlineUser,
  HiUser,
  HiOutlineUserGroup,
  HiUserGroup,
  HiOutlineShieldCheck,
  HiShieldCheck,
} from "react-icons/hi";
import { RiSettings2Line, RiSettings2Fill } from "react-icons/ri";
import SideNavTypes from "./SideNavTypes";
import SideNavFolder from "./SideNavFolder";

const SideNav = () => {
  const route = useLocation().pathname;

  return (
    <div className="side-nav standard-stack gap-10">
      {route !== "/MyAccount" && route !== "/Members" && route !== "/Roles" ? (
        <>
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
                route === "/Trash"
                  ? "sidenav-button selected"
                  : "sidenav-button"
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
          <SideNavFolder></SideNavFolder>
          <Link
            to="/MyAccount"
            className={
              route === "/VaultSettings"
                ? "sidenav-button selected"
                : "sidenav-button"
            }
          >
            {route === "/MyAccount" ? (
              <RiSettings2Fill></RiSettings2Fill>
            ) : (
              <RiSettings2Line></RiSettings2Line>
            )}
            Vault Settings
          </Link>
        </>
      ) : (
        <>
          <h5>Vault Settings</h5>
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search Vault"
            ></input>
          </form>
          <div className="standard-stack">
            <Link
              to="/MyAccount"
              className={
                route === "/MyAccount"
                  ? "sidenav-button selected"
                  : "sidenav-button"
              }
            >
              {route === "/MyAccount" ? (
                <HiUser></HiUser>
              ) : (
                <HiOutlineUser></HiOutlineUser>
              )}
              My Account
            </Link>
            <Link
              to="/Members"
              className={
                route === "/Members"
                  ? "sidenav-button selected"
                  : "sidenav-button"
              }
            >
              {route === "/Members" ? (
                <HiUserGroup></HiUserGroup>
              ) : (
                <HiOutlineUserGroup></HiOutlineUserGroup>
              )}
              Members
            </Link>

            <Link
              to="/Roles"
              className={
                route === "/Roles"
                  ? "sidenav-button selected"
                  : "sidenav-button"
              }
            >
              {route === "/Roles" ? (
                <HiShieldCheck></HiShieldCheck>
              ) : (
                <HiOutlineShieldCheck></HiOutlineShieldCheck>
              )}
              Roles
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SideNav;
