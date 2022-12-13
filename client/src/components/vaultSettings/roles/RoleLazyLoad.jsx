import React from "react";
import randomIntFromInterval from "../../../utils/randomIntFromInterval";

const RoleLazyLoad = () => {
  const memberCount = randomIntFromInterval(2, 7);
  const roleTagLength = randomIntFromInterval(20, 70);
  const nameLength = randomIntFromInterval(50, 200);
  return (
    <div className="lazy-role padding-side">
      <div className="standard-stack gap-10">
        <span>
          <div
            className="role-tag"
            style={{ width: `${roleTagLength}px` }}
          ></div>
          <p className="name" style={{ width: `${nameLength}px` }}></p>
        </span>
        <span>
          <div className="members-with-role">
            {[...Array(memberCount)].map((_, idx) => (
              <div key={idx} className="member"></div>
            ))}
          </div>
          <div className="button"></div>
        </span>
      </div>
      <div className="arrow"></div>
    </div>
  );
};

export default RoleLazyLoad;
