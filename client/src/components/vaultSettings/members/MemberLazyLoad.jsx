import React from "react";
import randomIntFromInterval from "../../../utils/randomIntFromInterval";

const MemberLazyLoad = () => {
  const nameLength = randomIntFromInterval(50, 150);
  const emailLength = randomIntFromInterval(100, 200);
  const roleCount = randomIntFromInterval(2, 8);

  return (
    <div className="lazy-member-detailed padding-side">
      <div className="image"></div>
      <div className="user standard-stack gap-10">
        <span className="standard-stack">
          <p className="name" style={{ width: `${nameLength}px` }}></p>
          <p className="email" style={{ width: `${emailLength}px` }}></p>
        </span>
        <div className="roles">
          {[...Array(roleCount)].map((role) => {
            const roleLength = randomIntFromInterval(30, 60);
            return (
              <div className="role" style={{ width: `${roleLength}px` }}></div>
            );
          })}
          <div className="button"></div>
        </div>
      </div>
    </div>
  );
};

export default MemberLazyLoad;
