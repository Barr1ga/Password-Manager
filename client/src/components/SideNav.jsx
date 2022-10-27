import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiViewGrid,
  HiOutlineUser,
  HiUser,
  HiOutlineLogout,
} from "react-icons/hi";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { RiSettings2Line, RiSettings2Fill } from "react-icons/ri";
import ConfirmModal from "./helpers/ConfirmModal";
import { useDispatch } from "react-redux";
import { logOut } from "../features/slice/authSlice";
import Button from "react-bootstrap/Button";

const SideNav = () => {
  const dispatch = useDispatch();
  const route = useLocation().pathname;

  const notifications = {
    allItems: true,
    favorites: true,
    trash: false,
    sharingCenter: false,
    myAccount: false,
    members: false,
    roles: false,
  };

  const handleLogout = () => {
    console.log("logouit");
    dispatch(logOut());
  };

  const handleChangeVault = () => {
    console.log("changeVault");
  };

  return (
    <div className="side-nav standard-stack gap-10">
      {route !== "/MyAccount" &&
      route !== "/Members" &&
      route !== "/Roles" &&
      route !== "/AuditLog" ? (
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
            {
              <Link
                to="/"
                className={
                  notifications.allItems && route === "/"
                    ? "sidenav-button new-notif selected"
                    : route === "/"
                    ? "sidenav-button selected"
                    : notifications.allItems
                    ? "sidenav-button new-notif"
                    : "sidenav-button"
                }
              >
                {route === "/" ? (
                  <HiViewGrid></HiViewGrid>
                ) : (
                  <HiOutlineViewGrid></HiOutlineViewGrid>
                )}
                <p>
                  All Items{" "}
                  {notifications.allItems && (
                    <span className="notif-ball"></span>
                  )}
                </p>
              </Link>
            }
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
            <p>Vault Settings</p>
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
                notifications.myAccount && route === "/MyAccount"
                  ? "sidenav-button new-notif selected"
                  : route === "/MyAccount"
                  ? "sidenav-button selected"
                  : notifications.myAccount
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "/MyAccount" ? (
                <HiUser></HiUser>
              ) : (
                <HiOutlineUser></HiOutlineUser>
              )}
              <p>My Account {true && <span className="notif-ball"></span>}</p>
            </Link>
          </div>
          <div>
            <hr className="sidenav-hr padding-side"></hr>
          </div>
          <div>
            <ConfirmModal
              proceedInteraction={
                <Button
                  type="button"
                  className="btn-dark btn-long"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              }
              component={
                <div className="sidenav-button">
                  <HiOutlineLogout></HiOutlineLogout>{" "}
                  <p>Log Out {true && <span className="notif-ball"></span>}</p>
                </div>
              }
              headerMessage={"Log out"}
              bodyMessage={"Are you sure you want to logout?"}
            ></ConfirmModal>
          </div>
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
