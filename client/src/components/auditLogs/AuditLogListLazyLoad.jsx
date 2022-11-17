import React from "react";
import randomIntFromInterval from "../../utils/randomIntFromInterval";

const AuditLogListLazyLoad = () => {
  return [...Array(5)].map((_, idx) => (
    <div key={idx} className="lazy-audit-log-item padding-side gap-10">
      <div className="image"></div>
      <div className="standard-stack">
        <span className="message">
          <span style={{ width: `${randomIntFromInterval(50, 100)}px` }}></span>
          <p style={{ width: `${randomIntFromInterval(50, 130)}px` }}></p>
          <p style={{ width: `${randomIntFromInterval(50, 100)}px` }}></p>
          <p style={{ width: `${randomIntFromInterval(50, 100)}px` }}></p>
          <span style={{ width: `${randomIntFromInterval(50, 130)}px` }}></span>
        </span>
        <small style={{ width: `${randomIntFromInterval(50, 100)}px` }}></small>
      </div>
    </div>
  ));
};

export default AuditLogListLazyLoad;
