import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiShieldFlashFill } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import { RiSettings2Line, RiSettings2Fill } from "react-icons/ri";
import RoundLoader from "./RoundLoader";
import BarLoader from "./BarLoader";
import ResponsiveDisplay from "./Helpers/ResponsiveDisplay";

const Footer = () => {
  const route = useLocation().pathname;

  return (
    <>
      <div className="footer">
        <div className="margin">
          <Link to="/All">
            <div className="logo gap-10">
              <RiShieldFlashFill className="icon"></RiShieldFlashFill>
              <h3>
                Vaulteer <span className="half">| Securities</span>
              </h3>
            </div>
          </Link>
          <small className="copyright">© 2022 Vaulteer. All Rights Reserved.</small>
          <div className="nav gap-20">
            <small>
              <Link to="/All" className="item btn-link">
                About
              </Link>
            </small>
            <small>
              <Link to="/All" className="item btn-link">
                Safety
              </Link>
            </small>
            <small>
              <Link to="/All" className="item btn-link">
                Privacy
              </Link>
            </small>
            <small>
              <Link to="/All" className="item btn-link">
                Terms
              </Link>
            </small>
            <small>
              <Link to="/All" className="item btn-link">
                Contact
              </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
