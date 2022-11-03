import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ItemInformation from "./ItemInformation";

const CurrentItem = () => {
  const { id } = useParams();
  console.log(id)
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
