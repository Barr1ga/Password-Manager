import React from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiShieldFlashFill } from "react-icons/ri";

const Header = () => {
  return (
    <div className="header">
      <div className="margin">
        <div className="logo gap-20">
          <RiShieldFlashFill className="icon"></RiShieldFlashFill>
          <h3>Vaulteer</h3>
        </div>
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
              Terms
            </Link>
          </small>
          <small>
            <Link to="/" className="item btn-link">
              Contact
            </Link>
          </small>
        </div>
        <div className="profile gap-10">
          <BiUserCircle className="image"></BiUserCircle>
          <p>Username</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
