import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetSelectedItem } from "../../features/slice/itemSlice";
import ItemInformation from "./ItemInformation";

const CurrentItem = () => {
  const { items, selectedItem } = useSelector((state) => state.items);
  let currentItem = items.find((item) => item.uid === selectedItem);

  const dispatch = useDispatch();
  
  useEffect(() => {
    currentItem = items.find((item) => item.uid === selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    return () => {
      dispatch(resetSelectedItem());
    };
  }, []);

  if (!currentItem) {
    return <></>;
  }

  return <ItemInformation currentItem={currentItem}></ItemInformation>;
};

export default CurrentItem;
