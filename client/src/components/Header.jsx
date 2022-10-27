import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  HiOutlineLogout,
} from "react-icons/hi";
import Logo from "../assets/vaulteer_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "./helpers/ConfirmModal";
import { logOut } from "../features/slice/authSlice";

const Header = () => {
  const { authUser, username } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <>
      <div className="header">
        <div className="margin">
          <Link to="/">
            <div className="logo gap-10">
              <img src={Logo} alt={Logo} className="icon"></img>
              <h3>
                Vaulteer <span className="half">| Securities</span>
              </h3>
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
            <Link to="/MyAccount">
              {authUser.photoURL ? (
                <img
                  className="btn-user-image"
                  src={authUser.photoURL}
                  alt={authUser.photoURL}
                ></img>
              ) : (
                <div className="btn-user-image">{username?.charAt(0)}</div>
              )}
            </Link>
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
                <div className="btn-circle">
                  <HiOutlineLogout></HiOutlineLogout>{" "}
                </div>
              }
              headerMessage={"Log out"}
              bodyMessage={"Are you sure you want to logout?"}
            ></ConfirmModal>
          </div>
        </div>
      </div>
      {/* <ResponsiveDisplay
        mobile={<RoundLoader></RoundLoader>}
        nonMobile={<BarLoader></BarLoader>}
      ></ResponsiveDisplay> */}
    </>
  );
};

export default Header;
