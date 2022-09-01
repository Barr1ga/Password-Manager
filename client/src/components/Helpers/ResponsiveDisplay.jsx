import React from "react";

const ResponsiveDisplay = ({ mobile, nonMobile }) => {
  return (
    <div className="screen-version">
      <div className="mobile">{mobile}</div>
      <div className="non-mobile">{nonMobile}</div>
    </div>
  );
};

export default ResponsiveDisplay;
