import React, { useState } from "react";
import AddItemModal from "../components/AddItemModal";
import Filters from "../components/Filters";
import PasswordItem from "../components/PasswordItem";
import PasswordCard from "../components/PasswordCard";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineViewGrid, HiOutlineServer } from "react-icons/hi";
import Button from "react-bootstrap/Button";

const AllItems = () => {
  const route = "/All";
  const [listView, setListView] = useState(true);
  const dispatch = useDispatch();
  const { passwords } = useSelector((state) => state.passwords);

  const filteredPasswords = passwords.filter(
    (password) => password.trash === false
  );

  const count = filteredPasswords.length;
  console.log(listView);

  return (
    <div className="margin-content">
      <div className="page-header page-header-long page-header-fixed padding-side">
        <h4>All Items</h4>{" "}
        <div>
          {/* <Filters></Filters> */}
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
          <AddItemModal></AddItemModal>
        </div>
      </div>
      <div className="scroll-view">
        {listView ? (
          <div className="password-list standard-stack">
            <span className="padding-side count">{count} Items</span>
            {filteredPasswords.map((password, idx) => (
              <PasswordItem
                key={idx}
                route={route}
                password={password}
              ></PasswordItem>
            ))}
          </div>
        ) : (
          <div className="password-grid padding-side standard-stack">
            <span className="count">{count} Items</span>
            <div className="contents">
              {filteredPasswords.map((password, idx) => (
                <PasswordCard
                  key={idx}
                  route={route}
                  password={password}
                ></PasswordCard>
              ))}
            </div>
          </div>
        )}
        <div className="page-footer padding-side">
          <AddItemModal></AddItemModal>
        </div>
      </div>
    </div>
  );
};

export default AllItems;
