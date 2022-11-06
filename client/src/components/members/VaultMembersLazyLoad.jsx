import React from "react";
import randomIntFromInterval from "../../utils/randomIntFromInterval";

const roleCount = 2;
const memberCount = 4;

const VaultMembersLazyLoad = () =>
  [...Array(roleCount)].map((_, idx) => {
    const roleLength = randomIntFromInterval(20, 70);

    return (
      <div key={"role" + idx} className="standard-stack gap-10">
        <div className="padding-side lazy-role">
          <p style={{ width: `${roleLength}%` }}></p>
          <p></p>
        </div>
        {[...Array(roleCount)].map((_, idx) => {
          const nameLength = randomIntFromInterval(20, 80);
          return (
            <div key={"member" + idx} className="lazy-member">
              <div className="lazy-icon"></div>
              <p style={{ width: `${nameLength}%` }}></p>
            </div>
          );
        })}
      </div>
    );
  });
export default VaultMembersLazyLoad;
