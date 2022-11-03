import React from "react";
import randomIntFromInterval from "../utils/randomIntFromInterval";

const ItemLazyLoad = () => {
  const titleLength = randomIntFromInterval(20, 80);
  const subTitleLength = randomIntFromInterval(20, 80);

  return (
    <>
      <div className="lazy-item gap-10 padding-side">
        <div className="lazy-icon"></div>

        <div className="name standard-stack">
          <div className="title" style={{ width: `${titleLength}%` }}></div>
          <div
            className="subTitle"
            style={{ width: `${subTitleLength}%` }}
          ></div>
        </div>
        
        <div className="dots"></div>
      </div>
    </>
  );
};

export default ItemLazyLoad;
