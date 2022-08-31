import React, { useState, useEffect } from "react";
import AddButton from "../components/AddButton";
import AddItemModal from "../components/AddItemModal";
import Filters from "../components/Filters";
import PasswordItem from "../components/PasswordItem";
import { useDispatch, useSelector } from "react-redux";
import { getBrandDetails, resetBrands } from "../features/slice/brandSlice";
import Test from "../components/Test";

const AllItems = () => {
  const dispatch = useDispatch();

  const { passwords } = useSelector((state) => state.passwords)

  // useEffect(() => {
  //   passwords.forEach((password) => {
  //     dispatch(getBrandDetails(password.name));
  //   })

  //   return () => {
  //     // dispatch(resetBrands());
  //   };
  // }, []);

  const filteredPasswords = passwords.filter(
    (password) => password.trash === false
  );

  const count = filteredPasswords.length;

  return (
    <div className="margin-content">
      <div className="page-header padding-side">
        <h4>All Items</h4>{" "}
        <div>
          <Filters></Filters>
          {/* <AddItemModal></AddItemModal> */}
        </div>
      </div>
      <div className="password-list standard-stack">
        <span className="padding-side count">{count} Items</span>
        {filteredPasswords.map((password, idx) => (
          <PasswordItem key={idx} password={password}></PasswordItem>
        ))}
      </div>
      <div className="page-footer padding-side">
        {/* <AddItemModal></AddItemModal> */}
      </div>
    </div>
  );
};

export default AllItems;
