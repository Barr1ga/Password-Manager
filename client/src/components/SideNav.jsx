import React from "react";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import {
    HiOutlineSearch,
  HiOutlineViewGrid,
  HiViewGrid,
  HiOutlineStar,
  HiStar,
  HiOutlineTrash,
  HiTrash,
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
  HiOutlineFolder,
  HiFolder,
} from "react-icons/hi";

const SideNav = () => {
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
        <Link to="/" className="sidenav-button">
          <HiOutlineViewGrid></HiOutlineViewGrid>All Items
        </Link>
        <Link to="/Favorites" className="sidenav-button">
          <HiOutlineStar></HiOutlineStar>Favorites
        </Link>
        <Link to="/Trash" className="sidenav-button">
          <HiOutlineTrash></HiOutlineTrash>Trash
        </Link>
      </div>

      <span className="category-folder-title">
        types<RiArrowRightSLine></RiArrowRightSLine>
      </span>

      <div className="standard-stack">
        <Link to="/Login" className="sidenav-button">
          <HiOutlineGlobe></HiOutlineGlobe>Login
        </Link>
        <Link to="/Card" className="sidenav-button">
          <HiOutlineCreditCard></HiOutlineCreditCard>Card
        </Link>
        <Link to="/Identity" className="sidenav-button">
          <HiOutlineIdentification></HiOutlineIdentification>Identifications
        </Link>
        <Link to="/Secure Note" className="sidenav-button">
          <HiOutlineDocumentText></HiOutlineDocumentText>Secure Note
        </Link>
        <Link to="/Secure Note" className="sidenav-button">
          <HiOutlineWifi></HiOutlineWifi>Wifi Passwords
        </Link>
        <Link to="/Secure Note" className="sidenav-button">
          <HiOutlineUsers></HiOutlineUsers>Sharing Center
        </Link>
      </div>
      <span className="category-folder-title">
        folder<RiArrowRightSLine></RiArrowRightSLine>
      </span>
    </div>
  );
};

export default SideNav;
