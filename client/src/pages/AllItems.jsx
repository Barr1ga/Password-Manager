import React, { useState } from "react";
import AddItemButton from "../components/AddItemButton";
import Filters from "../components/Filters";
import PasswordItem from "../components/PasswordItem";
import PasswordCard from "../components/PasswordCard";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineViewGrid, HiOutlineServer } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import EmptyList from "../assets/empty-list.svg";

const AllItems = () => {
  const route = "";
  const [listView, setListView] = useState(true);
  const dispatch = useDispatch();
  const { passwords } = useSelector((state) => state.passwords);

  const filteredPasswords = passwords.filter(
    (password) => password.trash === false
  );

  const count = filteredPasswords.length;

  return (
    <div className="margin-content">
      <div className="page-header page-header-long page-header-fixed padding-side">
        <h4>All Items</h4>{" "}
        <div>
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
                    <img src={EmptyList}></img>
                    <p>
                      You havent added<br></br>any item yet
                    </p>
                  </div>
                )}
                {filteredPasswords.map((password, idx) => (
                  <PasswordItem
                    key={idx}
                    route={route}
                    password={password}
                  ></PasswordItem>
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
              <div>
                <div className="contents">
                  {filteredPasswords.length === 0 && (
                    <div className="empty-list">
                      <img src={EmptyList}></img>
                      <p>
                        You havent added<br></br>any item yet
                      </p>
                    </div>
                  )}
                  {filteredPasswords.map((password, idx) => (
                    <PasswordCard
                      key={idx}
                      route={route}
                      password={password}
                    ></PasswordCard>
                  ))}
                </div>
              </div>
            </div>
            <div className="page-footer padding-side">
              <AddItemButton></AddItemButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllItems;
