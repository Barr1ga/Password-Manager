import React from "react";
import { Link } from "react-router-dom";

const otherLinks = () => {
  return (
    <div className="other-links padding-side gap-10">
      <small>
        <Link to="/" className="item btn-link">
          About
        </Link>
      </small>
      <small>
        <Link to="/" className="item btn-link">
          Safety
        </Link>
      </small>
      <small>
        <Link to="/" className="item btn-link">
          Privacy
        </Link>
      </small>
      <small>
        <Link to="/" className="item btn-link">
          Terms
        </Link>
      </small>
      <small>
        <Link to="/" className="item btn-link">
          Contact
        </Link>
      </small>
    </div>
  );
};

export default otherLinks;
