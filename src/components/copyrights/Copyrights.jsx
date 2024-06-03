import React from "react";
import { LiaCopyrightSolid } from "react-icons/lia";
import "./copyrights.css";

const Copyrights = () => {
  return (
    <div className="copyrights">
      <p>
        <LiaCopyrightSolid /> 2023 All rights reserved​ by{" "}
        <a href="https://romeya.com/" target="_blank">
          Romeya.com
        </a>
      </p>
    </div>
  );
};

export default Copyrights;
