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
import { getAllItems, getFolderSpecific } from "../features/slice/itemSlice";
import ItemsListLazyLoad from "../components/items/ItemsListLazyLoad";
import CardsListLazyLoad from "../components/items/CardsListLazyLoad";
import ItemsList from "../components/items/ItemsList";
import CardsList from "../components/items/CardsList";
import { useLocation, useParams } from "react-router-dom";

const Folder = () => {
  const [listView, setListView] = useState(true);
  const { items, selectedItem, itemLoading } = useSelector(
    (state) => state.items
  );
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { folder, uid } = useParams();
  const location = useLocation();
  const route = "/Folders/" + folder;

  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid) {
      dispatch(getFolderSpecific({ uid: authUser.uid, folder }));
    }
  }, [folder]);

  let filteredItems = items.filter((item) => item.trash === false);

  filteredItems =
    searchValue !== ""
      ? filteredItems.filter((item) =>
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
    <div className="margin-content">
      <div
        className={
          searchStatus
            ? "search-show page-header page-header-long page-header-fixed padding-side"
            : "page-header page-header-long page-header-fixed padding-side"
        }
      >
        {!searchStatus && <h4>{folder}</h4>}{" "}
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
  );
};

export default Folder;
