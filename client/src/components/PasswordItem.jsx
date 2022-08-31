import React from "react";
import { HiOutlineChevronRight, HiLink, HiStar } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { selectPasswordItem } from "../features/slice/passwordSlice";

const PasswordItem = ({ password }) => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const { selectedPassword } = useSelector((state) => state.passwords);
  const itemBrand =
    brands.find((brand) =>
      brand.name.toLowerCase().includes(password.name.toLowerCase())
    ) ||
    brands.find((brand) =>
      password.name.toLowerCase().includes(brand.name.toLowerCase())
    );

  const handleItemClicked = () => {
    dispatch(selectPasswordItem(password.id));
  };

  return (
    <div
      onClick={handleItemClicked}
      className={
        selectedPassword === password.id
          ? "password-item password-item-selected gap-10 padding-side"
          : "password-item gap-10 padding-side"
      }
    >
      {itemBrand ? (
        <img src={itemBrand.icon} alt={password.name} className="icon"></img>
      ) : (
        <div className="empty-icon">{password.name.charAt(0)}</div>
      )}

      <div className="name standard-stack">
        <span>
          <a
            className={
              password.trash ? "trashed btn-link" : "siteName btn-link"
            }
            href={password.userName}
            target="_blank"
          >
            {password.name}
          </a>{" "}
          <HiLink className="link-icon"></HiLink>
          {password.favorite && <HiStar className="favorited"></HiStar>}
        </span>
        <small>{password.userName}</small>
      </div>
      <HiOutlineChevronRight className="three-dots"></HiOutlineChevronRight>
    </div>
  );
};

export default PasswordItem;
