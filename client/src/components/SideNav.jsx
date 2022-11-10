import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
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
  HiOutlineLockClosed,
} from "react-icons/hi";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { RiSettings2Line, RiSettings2Fill } from "react-icons/ri";
import SideNavTypes from "./SideNavTypes";
import SideNavFolder from "./SideNavFolder";
import ConfirmModal from "./helpers/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/slice/authSlice";
import Button from "react-bootstrap/Button";

const SideNav = () => {
  const dispatch = useDispatch();
  const route = useLocation().pathname;
  const { selectedItem } = useSelector((state) => state.items);

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
      {!route.includes("/MyAccount") &&
      !route.includes("/Members") &&
      !route.includes("/Roles") &&
      !route.includes("/AuditLog") ? (
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
                  notifications.allItems &&
                  (route === "/" || route === `/${selectedItem}`)
                    ? "sidenav-button new-notif selected"
                    : route === "/" || route === `/${selectedItem}`
                    ? "sidenav-button selected"
                    : notifications.allItems
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
                  {notifications.allItems && (
                    <span className="notif-ball"></span>
                  )}
                </p>
              </Link>
            }
            <Link
              to="/Favorites"
              className={
                notifications.favorites && route.includes("/Favorites")
                  ? "sidenav-button new-notif selected"
                  : route.includes("/Favorites")
                  ? "sidenav-button selected"
                  : notifications.favorites
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
                {notifications.favorites && (
                  <span className="notif-ball"></span>
                )}
              </p>
            </Link>
            <Link
              to="/Trash"
              className={
                notifications.trash && route.includes("/Trash")
                  ? "sidenav-button new-notif selected"
                  : route.includes("/Trash")
                  ? "sidenav-button selected"
                  : notifications.trash
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
                {notifications.trash && <span className="notif-ball"></span>}
              </p>
            </Link>
            <Link
              to="/SharingCenter"
              className={
                notifications.sharingCenter && route.includes("/SharingCenter")
                  ? "sidenav-button new-notif selected"
                  : route.includes("/SharingCenter")
                  ? "sidenav-button selected"
                  : notifications.sharingCenter
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route.includes("/SharingCenter") ? (
                <HiUsers></HiUsers>
              ) : (
                <HiOutlineUsers></HiOutlineUsers>
              )}
              <p>
                Sharing Center{" "}
                {notifications.sharingCenter && (
                  <span className="notif-ball"></span>
                )}
              </p>
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
                notifications.myAccount && route.includes("/MyAccount")
                  ? "sidenav-button new-notif selected"
                  : route.includes("/MyAccount")
                  ? "sidenav-button selected"
                  : notifications.myAccount
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
            <Link
              to="/Members"
              className={
                notifications.members && route.includes("/Members")
                  ? "sidenav-button new-notif selected"
                  : route.includes("/Members")
                  ? "sidenav-button selected"
                  : notifications.members
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
                notifications.roles && route.includes("/Roles")
                  ? "sidenav-button new-notif selected"
                  : route.includes("/Roles")
                  ? "sidenav-button selected"
                  : notifications.roles
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
              <p>Audit Log {true && <span className="notif-ball"></span>}</p>
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
                  onClick={handleChangeVault}
                >
                  Change
                </Button>
              }
              component={
                <div className="sidenav-button">
                  <HiOutlineLockClosed></HiOutlineLockClosed>{" "}
                  <p>
                    Change Vault {true && <span className="notif-ball"></span>}
                  </p>
                </div>
              }
              headerMessage={"Change Vault"}
              bodyMessage={"Are you sure you want to change vault?"}
            ></ConfirmModal>
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
