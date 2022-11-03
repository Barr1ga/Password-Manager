import React from "react";
import { HiOutlineChevronRight, HiLink, HiStar } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { selectPasswordItem } from "../features/slice/itemSlice";
import { Link } from "react-router-dom";

const PasswordItem = ({ route, item }) => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.items);
  // const { color, generateColor } = useGenerateRandomColor();

  const handleItemClicked = () => {
    dispatch(selectPasswordItem(item.uid));
  };

  const handleLinkClicked = () => {
    window.open("https://" + item.domain, "_blank");
  };

  const title = item.name;

  let subTitle = "";
  if (item.type === "card") {
    subTitle = item?.cardHolderName;
  }

  if (item.type === "identification") {
    subTitle = item?.firstName + " " + item?.middleName + " " + item?.lastName;
  }

  if (item.type === "login") {
    subTitle = item.username;
  }

  if (item.type === "secureNote") {
    subTitle = "";
  }

  if (item.type === "wifiPassword") {
    subTitle = item?.ssid;
  }

  return (
    <>
      <Link
        to={`${route}/${item.uid}`}
        onClick={handleItemClicked}
        className={
          selectedItem === item.uid
            ? "password-item password-item-selected gap-10 padding-side"
            : "password-item gap-10 padding-side"
        }
      >
        {item.image !== "" ? (
          <img src={item.image} alt={item.name} className="icon"></img>
        ) : (
          <div className="empty-icon">{item.name.charAt(0)}</div>
        )}

        <div className="name standard-stack">
          <span>
            {item.type === "login" ? (
              <div
                onClick={handleLinkClicked}
                className={item.trash ? "trashed" : "siteName"}
              >
                {title}
              </div>
            ) : (
              <div className={item.trash ? "trashed" : "siteName"}>{title}</div>
            )}
            {item.type === "login" && <HiLink className="link-icon"></HiLink>}
            {item.favorite && <HiStar className="favorited"></HiStar>}
          </span>
          <small>{subTitle}</small>
        </div>
        <HiOutlineChevronRight className="three-dots"></HiOutlineChevronRight>
      </Link>
    </>
  );
};

export default PasswordItem;
