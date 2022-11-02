import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/vaulteer_logo.svg";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="margin">
          <Link to="/All">
            <div className="logo gap-10">
              <img src={Logo} alt={Logo} className="icon"></img>
              <h3>
                Vaulteer <span className="half">| Securities</span>
              </h3>
            </div>
          </Link>
          <small className="copyright">
            © 2022 Vaulteer. All Rights Reserved.
          </small>
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
