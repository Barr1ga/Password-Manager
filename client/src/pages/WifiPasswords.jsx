import React, { useState, useEffect } from "react";
import AddItemButton from "../components/AddItemButton";
import { useDispatch, useSelector } from "react-redux";
import {
  HiOutlineViewGrid,
  HiOutlineServer,
  HiOutlineSearch,
  HiOutlineX,
} from "react-icons/hi";
import Button from "react-bootstrap/Button";
import { getAllItems, getTypeSpecific } from "../features/slice/itemSlice";
import ItemsListLazyLoad from "../components/items/ItemsListLazyLoad";
import CardsListLazyLoad from "../components/items/CardsListLazyLoad";
import ItemsList from "../components/items/ItemsList";
import CardsList from "../components/items/CardsList";
import { useParams } from "react-router-dom";
import CurrentItem from "../components/items/CurrentItem";
import SiteWarning from "../components/SiteWarning";
import VaultMembers from "../components/members/VaultMembers";

const WifiPasswords = () => {
  const route = "/Types/WifiPasswords";
  const [listView, setListView] = useState(true);
  const { items, selectedItem, itemLoading } = useSelector(
    (state) => state.items
  );
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const currentPage = "wifiPassword";
  const { uid } = useParams();

  const { currentVault } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid && currentVault !== "") {
      dispatch(getTypeSpecific({ uid: currentVault, type: currentPage }));
    }
  }, [currentVault]);

  let filteredItems = items
    .filter((password) => password.trash === false)
    .filter((password) => password.type === currentPage);

  filteredItems =
    searchValue !== ""
      ? filteredItems.filter((password) =>
          password.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : filteredItems;

  const count = filteredItems.length;

  const handleSearch = () => {
    setSearchStatus(true);
  };

  const handleResetSearch = () => {
    setSearchValue("");
    setSearchStatus(false);
  };

  return (
    <>
      <div
        className={
          selectedItem ? "sub-margin-left hide-sub-margin" : "sub-margin-left"
        }
      >
        <div
          className={
            searchStatus
              ? "search-show page-header page-header-long page-header-fixed padding-side"
              : "page-header page-header-long page-header-fixed padding-side"
          }
        >
          {!searchStatus && <h4>Wifi Passwords</h4>}{" "}
          <div>
            {searchStatus && (
              <>
                <div className="form-search">
                  <input
                    placeholder="Search Items"
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="form-control"
                  ></input>
                  <HiOutlineSearch className="icon"></HiOutlineSearch>
                </div>
              </>
            )}
            {searchStatus && (
              <div>
                <HiOutlineX
                  onClick={handleResetSearch}
                  className="btn-close"
                ></HiOutlineX>
              </div>
            )}
            {!searchStatus && (
              <Button
                onClick={handleSearch}
                className="btn-secondary list-view-btn"
              >
                <HiOutlineSearch></HiOutlineSearch>
              </Button>
            )}
            {!searchStatus && (
              <>
                <Button
                  onClick={() => setListView(false)}
                  className="btn-secondary list-view-btn"
                >
                  <HiOutlineViewGrid></HiOutlineViewGrid>
                </Button>
                <Button
                  onClick={() => setListView(true)}
                  className="btn-secondary list-view-btn"
                >
                  <HiOutlineServer></HiOutlineServer>
                </Button>
                <AddItemButton currentPage={currentPage}></AddItemButton>
              </>
            )}
          </div>
        </div>
        {itemLoading &&
          (listView ? (
            <ItemsListLazyLoad></ItemsListLazyLoad>
          ) : (
            <CardsListLazyLoad></CardsListLazyLoad>
          ))}

        {!itemLoading &&
          (listView ? (
            <ItemsList
              filteredItems={filteredItems}
              route={route}
              searchValue={searchValue}
              count={count}
            ></ItemsList>
          ) : (
            <CardsList
              filteredItems={filteredItems}
              route={route}
              searchValue={searchValue}
              count={count}
            ></CardsList>
          ))}
      </div>

      <div className="sub-margin-right">
        <div className="scroll-view standard-stack gap-10">
          {selectedItem && (
            <>
              <CurrentItem></CurrentItem>
            </>
          )}

          {!selectedItem && (
            <>
              <SiteWarning></SiteWarning>
              <div className="right-vault-members">
                <VaultMembers></VaultMembers>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WifiPasswords;
