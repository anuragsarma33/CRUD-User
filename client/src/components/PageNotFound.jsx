import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center h-100vh flex-direction-column">
        <p>404 Error! Oops Page Not Found !!!!</p>
        <p>
          <Link to="/">Go back to homepage</Link>
        </p>
      </div>
    </>
  );
};

export default PageNotFound;
