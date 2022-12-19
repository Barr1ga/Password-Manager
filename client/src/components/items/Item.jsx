import React from "react";
import { HiOutlineChevronRight, HiLink, HiStar } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { selectItem } from "../../features/slice/itemSlice";
import { Link } from "react-router-dom";
import { resetSelectedRole } from "../../features/slice/roleSlice";
import { resetSelectedFolder } from "../../features/slice/folderSlice";
const CryptoJS = require("crypto-js");

const PasswordItem = ({ route, item }) => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.items);
  const { selectedRole } = useSelector((state) => state.roles);
  const { currentVault } = useSelector((state) => state.auth);
  // const { color, generateColor } = useGenerateRandomColor();

  var decryptedItem = JSON.parse(JSON.stringify(item));
  // decrypt
  for (const key in decryptedItem) {
    if (key !== 'favorite' && key !== 'trash' && key !== 'folders' && key !== 'type' && key !== 'image') {
      decryptedItem[key] = CryptoJS.AES.decrypt(decryptedItem[key], currentVault).toString(CryptoJS.enc.Utf8);
    }
  }

  const handleItemClicked = () => {
    if (selectedRole !== "") {
      dispatch(resetSelectedFolder());
      dispatch(resetSelectedRole());
    }
    dispatch(selectItem(item.uid));
  };

  const handleLinkClicked = () => {
    window.open("https://" + decryptedItem.domain, "_blank");
  };

  const title = decryptedItem.name;

  let subTitle = "";
  if (decryptedItem.type === "card") {
    subTitle = decryptedItem?.cardHolderName;
  }

  if (decryptedItem.type === "identification") {
    subTitle = decryptedItem?.firstName + " " + decryptedItem?.middleName + " " + decryptedItem?.lastName;
  }

  if (decryptedItem.type === "login") {
    subTitle = decryptedItem.username;
  }

  if (decryptedItem.type === "secureNote") {
    subTitle = "";
  }

  if (decryptedItem.type === "wifiPassword") {
    subTitle = decryptedItem?.ssid;
  }

  return (
    <>
      <Link
        to={`${route}/${decryptedItem.uid}`}
        onClick={handleItemClicked}
        className={
          selectedItem === decryptedItem.uid
            ? "password-item password-item-selected gap-10 padding-side"
            : "password-item gap-10 padding-side"
        }
      >
        {decryptedItem.image !== "" ? (
          <img src={decryptedItem.image} alt={decryptedItem.name} className="icon"></img>
        ) : (
          <div className="empty-icon">{decryptedItem.name.charAt(0)}</div>
        )}

        <div className="name standard-stack">
          <span>
            {decryptedItem.type === "login" ? (
              <div
                onClick={handleLinkClicked}
                className={decryptedItem.trash ? "trashed" : "siteName"}
              >
                {title}
              </div>
            ) : (
              <div className={decryptedItem.trash ? "trashed" : "siteName"}>{title}</div>
            )}
            {decryptedItem.type === "login" && <HiLink className="link-icon"></HiLink>}
            {decryptedItem.favorite && <HiStar className="favorited"></HiStar>}
          </span>
          <small>{subTitle}</small>
        </div>
        <HiOutlineChevronRight className="three-dots"></HiOutlineChevronRight>
      </Link>
    </>
  );
};

export default PasswordItem;
