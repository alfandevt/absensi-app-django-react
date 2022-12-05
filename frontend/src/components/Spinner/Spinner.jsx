import React from "react";
import "../../styles/components/Spinner/Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner__overlay">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
