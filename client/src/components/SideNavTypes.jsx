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

const SideNavTypes = () => {
  const [showNavTypes, setShowNavTypes] = useState(true);
  const route = useLocation().pathname;

  return (
    <>
      <div className="standard-stack gap-10">
        <span
          className="category-folder-title"
          onClick={() => setShowNavTypes((prev) => !prev)}
        >
          types{" "}
          {showNavTypes ? (
            <RiArrowDownSLine></RiArrowDownSLine>
          ) : (
            <RiArrowRightSLine></RiArrowRightSLine>
          )}
        </span>

        {showNavTypes && (
          <div className="standard-stack">
            <Link
              to="/Login"
              className={
                route === "/Login"
                  ? "sidenav-button selected"
                  : "sidenav-button"
              }
            >
              {route === "/Login" ? (
                <HiGlobe></HiGlobe>
              ) : (
                <HiOutlineGlobe></HiOutlineGlobe>
              )}
              Login
            </Link>
            <Link
              to="/Card"
              className={
                route === "/Card" ? "sidenav-button selected" : "sidenav-button"
              }
            >
              {route === "/Card" ? (
                <HiCreditCard></HiCreditCard>
              ) : (
                <HiOutlineCreditCard></HiOutlineCreditCard>
              )}
              Card
            </Link>
            <Link
              to="/Identity"
              className={
                route === "/Identity"
                  ? "sidenav-button selected"
                  : "sidenav-button"
              }
            >
              {route === "/Identity" ? (
                <HiIdentification></HiIdentification>
              ) : (
                <HiOutlineIdentification></HiOutlineIdentification>
              )}
              Identifications
            </Link>
            <Link
              to="/SecureNote"
              className={
                route === "/SecureNote"
                  ? "sidenav-button selected"
                  : "sidenav-button"
              }
            >
              {route === "/SecureNote" ? (
                <HiDocumentText></HiDocumentText>
              ) : (
                <HiOutlineDocumentText></HiOutlineDocumentText>
              )}
              Secure Note
            </Link>
            <Link
              to="/WifiPasswords"
              className={
                route === "/WifiPasswords"
                  ? "sidenav-button selected"
                  : "sidenav-button"
              }
            >
              {route === "/WifiPasswords" ? (
                <HiWifi></HiWifi>
              ) : (
                <HiOutlineWifi></HiOutlineWifi>
              )}
              Wifi Passwords
            </Link>
            <Link
              to="/SharingCenter"
              className={
                route === "/SharingCenter"
                  ? "sidenav-button selected"
                  : "sidenav-button"
              }
            >
              {route === "/SharingCenter" ? (
                <HiUsers></HiUsers>
              ) : (
                <HiOutlineUsers></HiOutlineUsers>
              )}
              Sharing Center
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SideNavTypes;
