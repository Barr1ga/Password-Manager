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
  HiOutlineLogout,
} from "react-icons/hi";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { RiSettings2Line, RiSettings2Fill } from "react-icons/ri";
import SideNavTypes from "./SideNavTypes";
import SideNavFolder from "./SideNavFolder";
import ConfirmModal from "./ConfirmModal";

const SideNav = () => {
  const route = useLocation().pathname;

  const handleLogout = () => {
    console.log("logout")
  }

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
          <div className="standard-stack">
            <SideNavTypes></SideNavTypes>
          </div>
          <div className="standard-stack">
            <SideNavFolder></SideNavFolder>
          </div>
          <hr className="sidenav-hr padding-side"></hr>
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
          <div>
            <hr className="sidenav-hr padding-side"></hr>
          </div>
            <ConfirmModal handleProceed={handleLogout} component={<div className="sidenav-button">
            <HiOutlineLogout></HiOutlineLogout> Logout
          </div>} headerMessage={"Log out"} bodyMessage={"Are you sure you want to logout"} continueMessage={"Logout"}></ConfirmModal>
          
          <div>
            <hr className="sidenav-hr padding-side"></hr>
          </div>
          <div className="socials padding-side gap-10">
            <BsTwitter></BsTwitter>
            <BsFacebook></BsFacebook>
            <BsInstagram></BsInstagram>
          </div>
        </>
      )}
    </div>
  );
};

export default SideNav;
