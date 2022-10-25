import React from "react";
import { HiOutlineChevronRight, HiLink, HiStar } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { selectPasswordItem } from "../features/slice/passwordSlice";
import { Link } from "react-router-dom";

const PasswordCard = ({ route, password }) => {
  const dispatch = useDispatch();
  const { selectedPassword } = useSelector((state) => state.passwords);

  const handleItemClicked = () => {
    dispatch(selectPasswordItem(password.id));
  };

  const handleLinkClicked = () => {
    window.open(password.domain, "_blank");
  };

  return (
    <Link
      to={`${route}/${password.id}`}
      onClick={handleItemClicked}
      className={
        selectedPassword === password.id
          ? "password-card password-card-selected"
          : "password-card"
      }
    >
      <div className="head">
        {password.image !== "" ? (
          <img src={password.image} alt={password.name} className="icon"></img>
        ) : (
          <div className="empty-icon">{password.name.charAt(0)}</div>
        )}
      </div>
      <span className="name">
        <a
          className={password.trash ? "trashed btn-link" : "siteName btn-link"}
          href={password.domain}
          onClick={handleLinkClicked}
          target="_blank"
          rel="noreferrer"
        >
          {password.name}
        </a>{" "}
      </span>
    </Link>
  );
};

export default PasswordCard;
