import React from "react";
import randomIntFromInterval from "../../utils/randomIntFromInterval";

const ItemCard = () => {
  const titleLength = randomIntFromInterval(50, 100);

  return (
    <div className="lazy-card">
      <div className="head">
        <div className="lazy-icon"></div>
      </div>
      <div className="title" style={{ width: `${titleLength}%` }}>
      </div>
    </div>
  );
};

export default ItemCard;
