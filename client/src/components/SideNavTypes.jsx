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
            types
          </p>
          <AddItemButtonSm></AddItemButtonSm>
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
              <p>Logins</p>
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
              <p>Cards</p>
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
              <p>Identifications</p>
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
              <p>Secure Notes</p>
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
              <p>Wifi Passwords</p>
            </Link>
            
          </div>
        )}
      </div>
    </>
  );
};

export default SideNavTypes;
