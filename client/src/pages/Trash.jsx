import React, { useState } from "react";
import AddItemButton from "../components/AddItemButton";
import Item from "../components/Item";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import {
  HiOutlineViewGrid,
  HiOutlineServer,
  HiOutlineSearch,
  HiOutlineX,
} from "react-icons/hi";
import Button from "react-bootstrap/Button";
import EmptyList from "../assets/empty-list.svg";

const Trash = () => {
  const route = "/Trash";
  const [listView, setListView] = useState(true);
  const { items } = useSelector((state) => state.items);
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  let filteredPasswords = items.filter(
    (password) => password.trash === true
  );

  filteredPasswords =
    searchValue !== ""
      ? filteredPasswords.filter((password) =>
          password.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : filteredPasswords;

  const count = filteredPasswords.length;

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
        {!searchStatus && <h4>Trash</h4>}{" "}
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
      {filteredPasswords.length > 0 && listView ? (
        <>
          <div className="password-list standard-stack">
            <div className="scroll-view">
              <span className="padding-side count">{count} Items</span>
              <div>
                {filteredPasswords.length === 0 && (
                  <div className="empty-list">
                    <img src={EmptyList} alt={EmptyList}></img>
                    <p>
                      {searchValue === "" ? (
                        <>
                          You havent added<br></br>any item yet
                        </>
                      ) : (
                        <>No items Found</>
                      )}
                    </p>
                  </div>
                )}
                {filteredPasswords.map((password, idx) => (
                  <Item
                    key={idx}
                    route={route}
                    password={password}
                  ></Item>
                ))}
              </div>
              <div className="page-footer padding-side">
                <AddItemButton></AddItemButton>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="password-grid padding-side standard-stack">
            <div className="scroll-view">
              <span className="count">{count} Items</span>
              <div className="contents">
                {filteredPasswords.length === 0 && (
                  <div className="empty-list">
                    <img src={EmptyList} alt={EmptyList}></img>
                    <p>
                      {searchValue === "" ? (
                        <>
                          You havent added<br></br>any item yet
                        </>
                      ) : (
                        <>No items Found</>
                      )}
                    </p>
                  </div>
                )}
                {filteredPasswords.map((password, idx) => (
                  <Card
                    key={idx}
                    route={route}
                    password={password}
                  ></Card>
                ))}
              </div>
            </div>
            <div className="page-footer">
              <AddItemButton></AddItemButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Trash;
