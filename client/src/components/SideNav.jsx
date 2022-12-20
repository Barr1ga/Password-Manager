import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiViewGrid,
  HiOutlineStar,
  HiStar,
  HiUsers,
  HiOutlineUsers,
  HiOutlineTrash,
  HiTrash,
  HiOutlineUser,
  HiUser,
  HiOutlineUserGroup,
  HiUserGroup,
  HiOutlineShieldCheck,
  HiShieldCheck,
  HiOutlineLogout,
  HiOutlineClipboardList,
  HiClipboardList,
  HiOutlineMail,
  HiMail,
} from "react-icons/hi";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { RiSettings2Line, RiSettings2Fill } from "react-icons/ri";
import SideNavTypes from "./SideNavTypes";
import SideNavFolder from "./SideNavFolder";
import ConfirmModal from "./helpers/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/slice/authSlice";
import Button from "react-bootstrap/Button";
import ChangeVault from "./vaultSettings/changeVault/ChangeVault";
import { useEffect } from "react";

const SideNav = () => {
  const dispatch = useDispatch();
  const route = useLocation().pathname;
  const { selectedItem } = useSelector((state) => state.items);
  const { notifications } = useSelector((state) => state.notifications);
  const { isUserOwner } = useSelector((state) => state.auth);

  const [notificationBubbles, setNotificationBubbles] = useState({
    allItems: false,
    favorites: false,
    trash: false,
    sharingCenter: false,
    myAccount: false,
    members: false,
    roles: false,
    notifications: false,
    auditLog: false,
  });

  useEffect(() => {
    setNotificationBubbles({ ...notificationBubbles, notifications: false });
    notifications?.forEach((notification) => {
      if (notification.seen === false && !notificationBubbles.notifications) {
        setNotificationBubbles({ ...notificationBubbles, notifications: true });
      }
    });
  }, [notifications]);

  const handleLogout = () => {
    console.log("logouit");
    dispatch(logOut());
  };

  return (
    <div className="side-nav standard-stack gap-10">
      {!route.includes("/MyAccount") &&
      !route.includes("/Members") &&
      !route.includes("/Roles") &&
      !route.includes("/AuditLog") &&
      !route.includes("/ChangeVault") ? (
        <>
          <div className="vault">
            <ChangeVault></ChangeVault>
          </div>
          <hr></hr>
          <div className="standard-stack">
            {
              <Link
                to="/"
                className={
                  notificationBubbles.allItems &&
                  (route === "/" || route === `/${selectedItem}`)
                    ? "sidenav-button new-notif selected"
                    : route === "/" || route === `/${selectedItem}`
                    ? "sidenav-button selected"
                    : notificationBubbles.allItems
                    ? "sidenav-button new-notif"
                    : "sidenav-button"
                }
              >
                {route === "/" || route === `/${selectedItem}` ? (
                  <HiViewGrid></HiViewGrid>
                ) : (
                  <HiOutlineViewGrid></HiOutlineViewGrid>
                )}
                <p>
                  All Items{" "}
                  {notificationBubbles.allItems && (
                    <span className="notif-ball"></span>
                  )}
                </p>
              </Link>
            }
            <Link
              to="/Favorites"
              className={
                notificationBubbles.favorites && route.includes("/Favorites")
                  ? "sidenav-button new-notif selected"
                  : route.includes("/Favorites")
                  ? "sidenav-button selected"
                  : notificationBubbles.favorites
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route.includes("/Favorites") ? (
                <HiStar></HiStar>
              ) : (
                <HiOutlineStar></HiOutlineStar>
              )}
              <p>
                Favorites{" "}
                {notificationBubbles.favorites && (
                  <span className="notif-ball"></span>
                )}
              </p>
            </Link>
            <Link
              to="/Trash"
              className={
                notificationBubbles.trash && route.includes("/Trash")
                  ? "sidenav-button new-notif selected"
                  : route.includes("/Trash")
                  ? "sidenav-button selected"
                  : notificationBubbles.trash
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route.includes("/Trash") ? (
                <HiTrash></HiTrash>
              ) : (
                <HiOutlineTrash></HiOutlineTrash>
              )}
              <p>
                Trash{" "}
                {notificationBubbles.trash && (
                  <span className="notif-ball"></span>
                )}
              </p>
            </Link>
          </div>

          <hr></hr>

          <div className="standard-stack">
            <SideNavTypes></SideNavTypes>
          </div>

          <hr></hr>

          <div className="standard-stack">
            <SideNavFolder></SideNavFolder>
          </div>
          <hr></hr>
          <div className="standard-stack">
            <Link
              to="/Invitations"
              className={
                notificationBubbles.notifications &&
                route.includes("/Invitations")
                  ? "sidenav-button new-notif selected"
                  : route.includes("/Invitations")
                  ? "sidenav-button selected"
                  : notificationBubbles.notifications
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route.includes("/Invitations") ? (
                <HiMail></HiMail>
              ) : (
                <HiOutlineMail></HiOutlineMail>
              )}
              <p>
                Invitations
                {notificationBubbles.notifications && (
                  <span className="notif-ball"></span>
                )}
              </p>
            </Link>
            <Link
              to="/MyAccount"
              className={
                route.includes("/VaultSettings")
                  ? "sidenav-button selected"
                  : "sidenav-button"
              }
            >
              {route.includes("/MyAccount") ? (
                <RiSettings2Fill></RiSettings2Fill>
              ) : (
                <RiSettings2Line></RiSettings2Line>
              )}
              <p>Vault Settings</p>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <h5>Vault Settings</h5>

            <div className="standard-stack">
              <Link
                to="/MyAccount"
                className={
                  notificationBubbles.myAccount && route.includes("/MyAccount")
                    ? "sidenav-button new-notif selected"
                    : route.includes("/MyAccount")
                    ? "sidenav-button selected"
                    : notificationBubbles.myAccount
                    ? "sidenav-button new-notif"
                    : "sidenav-button"
                }
              >
                {route.includes("/MyAccount") ? (
                  <HiUser></HiUser>
                ) : (
                  <HiOutlineUser></HiOutlineUser>
                )}
                <p>My Account {true && <span className="notif-ball"></span>}</p>
              </Link>
              <hr></hr>
              <Link
                to="/Members"
                className={
                  notificationBubbles.members && route.includes("/Members")
                    ? "sidenav-button new-notif selected"
                    : route.includes("/Members")
                    ? "sidenav-button selected"
                    : notificationBubbles.members
                    ? "sidenav-button new-notif"
                    : "sidenav-button"
                }
              >
                {route.includes("/Members") ? (
                  <HiUserGroup></HiUserGroup>
                ) : (
                  <HiOutlineUserGroup></HiOutlineUserGroup>
                )}
                <p>Members {true && <span className="notif-ball"></span>}</p>
              </Link>

              <Link
                to="/Roles"
                className={
                  notificationBubbles.roles && route.includes("/Roles")
                    ? "sidenav-button new-notif selected"
                    : route.includes("/Roles")
                    ? "sidenav-button selected"
                    : notificationBubbles.roles
                    ? "sidenav-button new-notif"
                    : "sidenav-button"
                }
              >
                {route.includes("/Roles") ? (
                  <HiShieldCheck></HiShieldCheck>
                ) : (
                  <HiOutlineShieldCheck></HiOutlineShieldCheck>
                )}
                <p>Roles {true && <span className="notif-ball"></span>}</p>
              </Link>

              {isUserOwner && (
                <Link
                  to="/AuditLog"
                  className={
                    true
                      ? "sidenav-button new-notif"
                      : route.includes("/AuditLog")
                      ? "sidenav-button selected"
                      : "sidenav-button"
                  }
                >
                  {route.includes("/AuditLog") ? (
                    <HiClipboardList></HiClipboardList>
                  ) : (
                    <HiOutlineClipboardList></HiOutlineClipboardList>
                  )}
                  <p>
                    Audit Log {true && <span className="notif-ball"></span>}
                  </p>
                </Link>
              )}
            </div>
            <hr></hr>
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
                    <p>
                      Log Out{" "}
                      {notificationBubbles.auditLog && (
                        <span className="notif-ball"></span>
                      )}
                    </p>
                  </div>
                }
                headerMessage={"Log out"}
                bodyMessage={"Are you sure you want to logout?"}
              ></ConfirmModal>
            </div>
            <hr></hr>
            <div className="socials padding-side gap-10">
              <BsTwitter></BsTwitter>
              <BsFacebook></BsFacebook>
              <BsInstagram></BsInstagram>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideNav;
