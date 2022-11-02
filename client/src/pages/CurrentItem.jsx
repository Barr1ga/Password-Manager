import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ItemInformation from "../components/ItemInformation";
import { useParams } from "react-router-dom";

const CurrentItemPage = () => {
  const { id } = useParams();

  const { items, selectedItem } = useSelector(
    (state) => state.items
  );

  let currentItem = items.find(
    (password) => password.id === selectedItem
  );

  useEffect(() => {
    currentItem = items.find(
      (password) => password.id === selectedItem
    );
  }, [selectedItem]);

  if (!currentItem) {
    return <></>;
  }

  return (
    <>
      <div className="margin-content padding-side">
        <ItemInformation
          currentItem={currentItem}
        ></ItemInformation>
      </div>
    </>
  );
};

export default CurrentItemPage;
