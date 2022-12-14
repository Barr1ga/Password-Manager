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
import {
  getAllItems,
  getTypeSpecific,
  setItemGetFlag,
} from "../features/slice/itemSlice";
import ItemsListLazyLoad from "../components/items/ItemsListLazyLoad";
import CardsListLazyLoad from "../components/items/CardsListLazyLoad";
import ItemsList from "../components/items/ItemsList";
import CardsList from "../components/items/CardsList";
import { useParams } from "react-router-dom";
import SiteWarning from "../components/SiteWarning";
import CurrentItem from "../components/items/CurrentItem";
import VaultMembers from "../components/members/VaultMembers";

const Card = () => {
  const route = "/Types/Cards";
  const [listView, setListView] = useState(true);
  const currentPage = "card";
  const { items, selectedItem, itemLoading, itemGetFlag, itemFetchedOnce } =
    useSelector((state) => state.items);
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { uid } = useParams();

  const { currentVault, authorizedFolders, isUserOwner } = useSelector(
    (state) => state.auth
  );
  const { members, memberLoading } = useSelector((state) => state.members);
  const { roles, roleLoading } = useSelector((state) => state.roles);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid && currentVault !== "") {
      if ((itemGetFlag || itemFetchedOnce) && authorizedFolders.length !== 0) {
        dispatch(
          getTypeSpecific({
            uid: currentVault,
            authorizedFolders: authorizedFolders,
            type: currentPage,
            isUserOwner,
          })
        );

        dispatch(setItemGetFlag(false));
      }
    }
  }, [currentVault, members, roles, itemGetFlag]);

  const filteredItems =
    searchValue !== ""
      ? items?.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : items;

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
          {!searchStatus && <h4>Cards</h4>}{" "}
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
                {isUserOwner && (
                  <AddItemButton currentPage={currentPage}></AddItemButton>
                )}
              </>
            )}
          </div>
        </div>
        {(itemLoading || memberLoading || roleLoading) &&
          (listView ? (
            <ItemsListLazyLoad></ItemsListLazyLoad>
          ) : (
            <CardsListLazyLoad></CardsListLazyLoad>
          ))}

        {!itemLoading &&
          !memberLoading &&
          !roleLoading &&
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

export default Card;
