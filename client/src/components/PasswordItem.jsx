import React, { useEffect } from "react";
import { HiOutlineChevronRight, HiLink, HiStar } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { selectPasswordItem } from "../features/slice/passwordSlice";
import { Link, useLocation } from "react-router-dom";
import useGenerateRandomColor from "../hooks/useGenerateRandomColor";

const PasswordItem = ({ route, password }) => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const { selectedPassword } = useSelector((state) => state.passwords);
  const { color, generateColor } = useGenerateRandomColor();

  useEffect(() => {
    generateColor();
  }, []);

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

  const handleLinkClicked = () => {
    window.open(
      password.domain, "_blank");
  }

  return (
    <>
      <Link
        to={`${route}/${password.id}`}
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
          <div className="empty-icon" style={{ backgroundColor: "#" + color }}>
            {password.name.charAt(0)}
          </div>
        )}

        <div className="name standard-stack">
          <span>
            <a
              className={
                password.trash ? "trashed btn-link" : "siteName btn-link"
              }
              href={password.domain}
              target="_blank"
              onClick={handleLinkClicked}
            >
              {password.name}
            </a>{" "}
            <HiLink className="link-icon"></HiLink>
            {password.favorite && <HiStar className="favorited"></HiStar>}
          </span>
          <small>{password.userName}</small>
        </div>
        <HiOutlineChevronRight className="three-dots"></HiOutlineChevronRight>
      </Link>
    </>
  );
};

export default PasswordItem;
