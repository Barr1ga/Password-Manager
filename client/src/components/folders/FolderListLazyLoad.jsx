import React from "react";
import randomIntFromInterval from "../../utils/randomIntFromInterval";

const FolderListLazyLoad = () => {
  const folder1Length = randomIntFromInterval(20, 80);
  const folder2Length = randomIntFromInterval(20, 80);

  return (
    <div className="standard-stack">
      <div className="lazy-folder gap-10 padding-side">
        <div className="lazy-icon"></div>
        <div className="name" style={{ width: `${folder1Length}%` }}></div>
      </div>
      <div className="lazy-folder gap-10 padding-side">
        <div className="lazy-icon"></div>
        <div className="name" style={{ width: `${folder2Length}%` }}></div>
      </div>
    </div>
  );
};

export default FolderListLazyLoad;
