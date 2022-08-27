import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiShieldFlashFill } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import { RiSettings2Line, RiSettings2Fill } from "react-icons/ri";

const Header = () => {
  const route = useLocation().pathname;

  return (
    <div className="header">
      <div className="margin">
        <Link to="/">
          <div className="logo gap-10">
            <RiShieldFlashFill className="icon"></RiShieldFlashFill>
            <h3>Vaulteer</h3>
          </div>
        </Link>
        <div className="nav gap-20">
          <small>
            <Link to="/" className="item btn-link">
              About
            </Link>
          </small>
          <small>
            <Link to="/" className="item btn-link">
              Safety
            </Link>
          </small>
          <small>
            <Link to="/" className="item btn-link">
              Privacy
            </Link>
          </small>
          <small>
            <Link to="/" className="item btn-link">
              Terms
            </Link>
          </small>
          <small>
            <Link to="/" className="item btn-link">
              Contact
            </Link>
          </small>
        </div>
        <div className="right gap-10">
          <Link to="/MyAccount" className="settings">
            {route === "/MyAccount" ? (
              <RiSettings2Fill></RiSettings2Fill>
            ) : (
              <RiSettings2Line></RiSettings2Line>
            )}
          </Link>
          <Link to="/MyAccount">
            <Button className="btn-secondary btn-profile gap-10">
              <HiOutlineUserCircle className="image"></HiOutlineUserCircle>
              <p>Username</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
