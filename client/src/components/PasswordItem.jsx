import React from "react";
import { HiDotsVertical, HiLink, HiStar } from "react-icons/hi";
import { useSelector } from "react-redux";

const PasswordItem = ({ password }) => {
  const { brands } = useSelector((state) => state.brands);
  console.log(brands);
  const itemBrand =
    brands.find((brand) =>
      brand.name.toLowerCase().includes(password.name.toLowerCase())
    ) ||
    brands.find((brand) =>
      password.name.toLowerCase().includes(brand.name.toLowerCase())
    );

  console.log(itemBrand);
  // src={itemBrand.icon}

  return (
    <div className="password-item gap-10 padding-side">
      {itemBrand ? (
        <img src={itemBrand.icon} alt={password.name} className="icon"></img>
      ) : (
        <div className="empty-icon">{password.name.charAt(0)}</div>
      )}

      <div className="name standard-stack">
        <a
          className={password.trash ? "trashed btn-link" : "siteName btn-link"}
          href={password.userName}
          target="_blank"
        >
          {password.name} <HiLink className="link-icon"></HiLink>
          {password.favorite && <HiStar className="favorited"></HiStar>}
        </a>
        <small>{password.userName}</small>
      </div>
      <HiDotsVertical className="three-dots"></HiDotsVertical>
    </div>
  );
};

export default PasswordItem;
