import React from "react";
import CardLazyLoad from "./CardLazyLoad";

const linesCount = 8;

const ItemLoading = () => {
  return (
    <>
      <div className="lazy-grid padding-side standard-stack">
        <div className="scroll-view">
          <span className="count">
            <div></div>
            <div></div>
          </span>
          <div className="contents">
            {[...Array(linesCount)].map((item, idx) => (
              <CardLazyLoad></CardLazyLoad>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemLoading;
