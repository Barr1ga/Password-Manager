import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemInformation from "./ItemInformation";

const CurrentItem = () => {
  const { items, selectedItem } = useSelector((state) => state.items);
  let currentItem = items.find((item) => item.uid === selectedItem);

  useEffect(() => {
    currentItem = items.find((item) => item.uid === selectedItem);
  }, [selectedItem]);

  if (!currentItem) {
    return <></>;
  }

  return <ItemInformation currentItem={currentItem}></ItemInformation>;
};

export default CurrentItem;
