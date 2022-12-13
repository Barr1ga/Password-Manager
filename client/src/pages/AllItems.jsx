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
import { getAllItems } from "../features/slice/itemSlice";
import ItemsListLazyLoad from "../components/items/ItemsListLazyLoad";
import CardsListLazyLoad from "../components/items/CardsListLazyLoad";
import ItemsList from "../components/items/ItemsList";
import CardsList from "../components/items/CardsList";
import { useParams } from "react-router-dom";
import SiteWarning from "../components/SiteWarning";
import CurrentItem from "../components/items/CurrentItem";
import VaultMembers from "../components/members/VaultMembers";
import ResponsiveDisplay from "../components/helpers/ResponsiveDisplay";

const AllItems = () => {
  const route = "";
  const [listView, setListView] = useState(true);
  const { items, selectedItem, itemLoading } = useSelector(
    (state) => state.items
  );
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { uid } = useParams();

  const { currentVault } = useSelector((state) => state.auth);
  const { members } = useSelector((state) => state.members);
  const { authUser } = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state.roles);
  const { folders } = useSelector((state) => state.folders);
  const ownerUid = roles?.find((role) => role.name === "Vault Owner")?.uid;
  const ownerUserUid = members?.find((member) =>
    member.roleUids.includes(ownerUid)
  )?.uid;
  const isNotOwner = authUser.uid !== ownerUserUid ? true : false;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid && currentVault !== "") {
      var authorizedfolders = [];

      if (!isNotOwner) {
        const currentUserRoles = members.find(
          (member) => member.uid === authUser.uid
        )?.roleUids;

        currentUserRoles?.forEach((userRoleUid) => {
          const roleFolders = roles.find(
            (role) => role.uid === userRoleUid
          )?.folders;

          authorizedfolders = [...authorizedfolders, ...roleFolders];
        });
      }

      // is owner
      if (isNotOwner) {
        authorizedfolders = folders?.map((folder) => folder.name);
      }

      console.log(authorizedfolders);
      dispatch(
        getAllItems({ uid: currentVault, authorizedFolders: authorizedfolders })
      );
    }
  }, [currentVault, members, roles]);

  let filteredItems = items?.filter((item) => item.trash === false);

  filteredItems =
    searchValue !== ""
      ? filteredItems?.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
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
          {!searchStatus && <h4>All Items</h4>}{" "}
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
                <AddItemButton></AddItemButton>
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

      <div
        className={
          selectedItem ? "sub-margin-right" : "sub-margin-right hide-sub-margin"
        }
      >
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

export default AllItems;
