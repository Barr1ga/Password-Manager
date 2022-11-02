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
              to="Types/Logins"
              className={
                notifications.logins && route === "Types/Logins"
                  ? "sidenav-button new-notif selected"
                  : route === "Types/Logins"
                  ? "sidenav-button selected"
                  : notifications.logins
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "Types/Logins" ? (
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
              to="Types/Cards"
              className={
                notifications.cards && route === "Types/Cards"
                  ? "sidenav-button new-notif selected"
                  : route === "Types/Cards"
                  ? "sidenav-button selected"
                  : notifications.cards
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "Types/Cards" ? (
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
              to="Types/Identifications"
              className={
                notifications.identifications && route === "Types/Identifications"
                  ? "sidenav-button new-notif selected"
                  : route === "Types/Identifications"
                  ? "sidenav-button selected"
                  : notifications.identifications
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "Types/Identifications" ? (
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
              to="Types/SecureNotes"
              className={
                notifications.secureNotes && route === "Types/SecureNote"
                  ? "sidenav-button new-notif selected"
                  : route === "Types/SecureNotes"
                  ? "sidenav-button selected"
                  : notifications.secureNotes
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "Types/SecureNotes" ? (
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
              to="Types/WifiPasswords"
              className={
                notifications.wifiPasswords && route === "Types/WifiPasswords"
                  ? "sidenav-button new-notif selected"
                  : route === "Types/WifiPasswords"
                  ? "sidenav-button selected"
                  : notifications.wifiPasswords
                  ? "sidenav-button new-notif"
                  : "sidenav-button"
              }
            >
              {route === "Types/WifiPasswords" ? (
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
