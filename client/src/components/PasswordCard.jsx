import React, { useEffect } from "react";
import { HiOutlineChevronRight, HiLink, HiStar } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { selectPasswordItem } from "../features/slice/passwordSlice";
import { Link, useLocation } from "react-router-dom";

const PasswordCard = ({ route, password }) => {
  const dispatch = useDispatch();
  const { selectedPassword } = useSelector((state) => state.passwords);

  const handleItemClicked = () => {
    dispatch(selectPasswordItem(password.id));
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
          <div className="empty-icon">
            {password.name.charAt(0)}
          </div>
        )}
        <HiOutlineChevronRight className="three-dots"></HiOutlineChevronRight>
      </div>
      <div className="label">
        <div className="name standard-stack">
          <span>
            <a
              className={
                password.trash ? "trashed btn-link" : "siteName btn-link"
              }
              href={password.domain}
              target="_blank"
            >
              {password.name}
            </a>{" "}
            <HiLink className="link-icon"></HiLink>
            {password.favorite && <HiStar className="favorited"></HiStar>}
          </span>
          <small>{password.userName}</small>
        </div>
      </div>
    </Link>
  );
};

export default PasswordCard;
