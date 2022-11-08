import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemInformation from "../components/items/ItemInformation";
import { resetSelectedItem } from "../features/slice/itemSlice";

const CurrentItemPage = () => {
  const { items, selectedItem } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  let currentItem = items.find((password) => password.uid === selectedItem);

  useEffect(() => {
    currentItem = items.find((password) => password.uid === selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    return () => {
      dispatch(resetSelectedItem());
    };
  }, []);

  if (!currentItem) {
    return <></>;
  }

  return (
    <>
      <div className="margin-content padding-left">
        <ItemInformation currentItem={currentItem}></ItemInformation>
      </div>
    </>
  );
};

export default CurrentItemPage;
