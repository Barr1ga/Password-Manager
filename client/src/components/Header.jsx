import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  HiOutlineClipboardList,
  HiClipboardList,
  HiOutlineLogout,
} from "react-icons/hi";
import Logo from "../assets/vaulteer_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "./helpers/ConfirmModal";
import { getUserData, logOut } from "../features/slice/authSlice";
import { getAllMembers } from "../features/slice/memberSlice";
import { getAllRoles } from "../features/slice/roleSlice";
import {
  getAllNotifications,
  resetNotificationQueryFulfilled,
} from "../features/slice/notificationSlice";

const Header = () => {
  const route = useLocation().pathname;
  const { notificationFulfilled } = useSelector((state) => state.notifications);
  const {
    authRegistered,
    currentVault,
    authUser,
    username,
    authEmailAndPasswordLoading,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    if (authUser && !authRegistered && !authEmailAndPasswordLoading) {
      dispatch(getUserData(authUser.uid));
      if (currentVault !== "") {
        dispatch(getAllRoles({ uid: currentVault }));
        dispatch(getAllMembers({ uid: currentVault }));
      }
      dispatch(getAllNotifications({ uid: authUser.uid }));
    }
  }, [authUser, authRegistered, currentVault]);

  useEffect(() => {
    if (notificationFulfilled) {
      dispatch(resetNotificationQueryFulfilled());
    }
  });

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
                  alt="you"
                ></img>
              ) : (
                <div className="btn-user-image">{username?.charAt(0)}</div>
              )}
            </Link>
            <div>
              <Link
                to="/AuditLog"
                className={
                  route === "/AuditLog" ? "btn-circle selected" : "btn-circle"
                }
              >
                {route === "/AuditLog" ? (
                  <HiClipboardList></HiClipboardList>
                ) : (
                  <HiOutlineClipboardList></HiOutlineClipboardList>
                )}
              </Link>
            </div>
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
