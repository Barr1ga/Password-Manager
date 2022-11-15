import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectItem } from "../../features/slice/itemSlice";
import { Link } from "react-router-dom";
import { resetSelectedRole } from "../../features/slice/roleSlice";
import { resetSelectedFolder } from "../../features/slice/folderSlice";

const ItemCard = ({ route, item }) => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.items);
  const { selectedRole } = useSelector((state) => state.roles);

  const handleItemClicked = () => {
    if (selectedRole !== "") {
      dispatch(resetSelectedFolder());
      dispatch(resetSelectedRole());
    }
    dispatch(selectItem(item.id));
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
        {item.type === "login" ? (
          <a
            className={item.trash ? "trashed" : "siteName"}
            href={item.domain}
            onClick={handleLinkClicked}
            target="_blank"
            rel="noreferrer"
          >
            {item.name}
          </a>
        ) : (
          <div className={item.trash ? "trashed" : "siteName"}>{item.name}</div>
        )}
      </span>
    </Link>
  );
};

export default ItemCard;
