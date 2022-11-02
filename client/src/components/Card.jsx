import React from "react";
import { HiOutlineChevronRight, HiLink, HiStar } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { selectedItem } from "../features/slice/itemSlice";
import { Link } from "react-router-dom";

const ItemCard = ({ route, item }) => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.items);

  const handleItemClicked = () => {
    dispatch(selectedItem(item.id));
  };

  const handleLinkClicked = () => {
    window.open(item.domain, "_blank");
  };

  return (
    <Link
      to={`${route}/${item.id}`}
      onClick={handleItemClicked}
      className={
        selectedItem === item.id
          ? "password-card password-card-selected"
          : "password-card"
      }
    >
      <div className="head">
        {item.image !== "" ? (
          <img src={item.image} alt={item.name} className="icon"></img>
        ) : (
          <div className="empty-icon">{item.name.charAt(0)}</div>
        )}
      </div>
      <span className="name">
        <a
          className={item.trash ? "trashed btn-link" : "siteName btn-link"}
          href={item.domain}
          onClick={handleLinkClicked}
          target="_blank"
          rel="noreferrer"
        >
          {item.name}
        </a>{" "}
      </span>
    </Link>
  );
};

export default ItemCard;
