import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineGlobe,
  HiGlobe,
  HiOutlineCreditCard,
  HiCreditCard,
  HiOutlineIdentification,
  HiIdentification,
  HiOutlineDocumentText,
  HiDocumentText,
  HiOutlineWifi,
  HiWifi,
  HiOutlineUsers,
  HiUsers,
} from "react-icons/hi";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import AddItemButtonSm from "./AddItemButtonSm";

const SideNavTypes = () => {
  const [showNavTypes, setShowNavTypes] = useState(true);
  const route = useLocation().pathname;

  const notifications = {
    logins: false,
    cards: false,
    identifications: false,
    secureNotes: false,
    wifiPasswords: false,
  };

  return (
    <>
      <div className="standard-stack gap-10">
        <span className="category-folder-title">
          <p onClick={() => setShowNavTypes((prev) => !prev)}>
            {showNavTypes ? (
              <RiArrowDownSLine></RiArrowDownSLine>
            ) : (
              <RiArrowRightSLine></RiArrowRightSLine>
            )}
            <p className="full">types</p>
            <p className="short">t</p>
          </p>
          <AddItemButtonSm></AddItemButtonSm>
        </span>

        {showNavTypes && (
          <div className="standard-stack">
            <Link
              to="/Login"
              className={
                notifications.logins && route === "/Login"
                  ? "sidenav-button new-notif selected"
                  : route === "/Login"
                  ? "sidenav-button selected"
                  : notifications.logins
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "/Login" ? (
                <HiGlobe></HiGlobe>
              ) : (
                <HiOutlineGlobe></HiOutlineGlobe>
              )}
              <p>
                Logins{" "}
                {notifications.logins && <span className="notif-ball"></span>}
              </p>
            </Link>
            <Link
              to="/Card"
              className={
                notifications.cards && route === "/Card"
                  ? "sidenav-button new-notif selected"
                  : route === "/Card"
                  ? "sidenav-button selected"
                  : notifications.cards
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "/Card" ? (
                <HiCreditCard></HiCreditCard>
              ) : (
                <HiOutlineCreditCard></HiOutlineCreditCard>
              )}
              <p>
                Cards{" "}
                {notifications.cards && <span className="notif-ball"></span>}
              </p>
            </Link>
            <Link
              to="/Identifications"
              className={
                notifications.identifications && route === "/Identifications"
                  ? "sidenav-button new-notif selected"
                  : route === "/Identifications"
                  ? "sidenav-button selected"
                  : notifications.identifications
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "/Identifications" ? (
                <HiIdentification></HiIdentification>
              ) : (
                <HiOutlineIdentification></HiOutlineIdentification>
              )}
              <p>
                Identifications{" "}
                {notifications.identifications && (
                  <span className="notif-ball"></span>
                )}
              </p>
            </Link>
            <Link
              to="/SecureNote"
              className={
                notifications.secureNotes && route === "/SecureNote"
                  ? "sidenav-button new-notif selected"
                  : route === "/SecureNote"
                  ? "sidenav-button selected"
                  : notifications.secureNotes
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "/SecureNote" ? (
                <HiDocumentText></HiDocumentText>
              ) : (
                <HiOutlineDocumentText></HiOutlineDocumentText>
              )}
              <p>
                Secure Notes{" "}
                {notifications.secureNotes && (
                  <span className="notif-ball"></span>
                )}
              </p>
            </Link>
            <Link
              to="/WifiPasswords"
              className={
                notifications.wifiPasswords && route === "/WifiPasswords"
                  ? "sidenav-button new-notif selected"
                  : route === "/WifiPasswords"
                  ? "sidenav-button selected"
                  : notifications.wifiPasswords
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "/WifiPasswords" ? (
                <HiWifi></HiWifi>
              ) : (
                <HiOutlineWifi></HiOutlineWifi>
              )}
              <p>
                Wifi Passwords{" "}
                {notifications.wifiPasswords && (
                  <span className="notif-ball"></span>
                )}
              </p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SideNavTypes;
