import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectItem } from "../../features/slice/itemSlice";
import { Link } from "react-router-dom";
import { resetSelectedRole } from "../../features/slice/roleSlice";
import { resetSelectedFolder } from "../../features/slice/folderSlice";
const CryptoJS = require("crypto-js");

const ItemCard = ({ route, item }) => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.items);
  const { selectedRole } = useSelector((state) => state.roles);
  const { currentVault } = useSelector((state) => state.auth);

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
    dispatch(selectItem(decryptedItem.id));
  };

  const handleLinkClicked = () => {
    window.open(decryptedItem.domain, "_blank");
  };

  return (
    <Link
      to={`${route}/${decryptedItem.id}`}
      onClick={handleItemClicked}
      className={
        selectedItem === decryptedItem.id
          ? "password-card password-card-selected"
          : "password-card"
      }
    >
      <div className="head">
        {decryptedItem.image !== "" ? (
          <img src={decryptedItem.image} alt={decryptedItem.name} className="icon"></img>
        ) : (
          <div className="empty-icon">{decryptedItem.name.charAt(0)}</div>
        )}
      </div>
      <span className="name">
        {decryptedItem.type === "login" ? (
          <a
            className={decryptedItem.trash ? "trashed" : "siteName"}
            href={decryptedItem.domain}
            onClick={handleLinkClicked}
            target="_blank"
            rel="noreferrer"
          >
            {decryptedItem.name}
          </a>
        ) : (
          <div className={decryptedItem.trash ? "trashed" : "siteName"}>{decryptedItem.name}</div>
        )}
      </span>
    </Link>
  );
};

export default ItemCard;
