import React from "react";
import ItemLazyLoad from "./ItemLazyLoad";
import CardLazyLoad from "./CardLazyLoad";

const linesCount = 5;

const ItemLoading = () => {
  return (
    <div className="lazy-list standard-stack">
      <div className="scroll-view">
        <span className="padding-side count"><div></div><div></div></span>
        <div>
          {[...Array(linesCount)].map((_, idx) => (
            <ItemLazyLoad></ItemLazyLoad>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemLoading;
