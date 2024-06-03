import React from "react";
import "./aboutHome.css";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import img_about_home_1 from "../../../img/img_about_home_1.webp";
import img_about_home_2 from "../../../img/img_about_home_2.webp";
import img_about_home_3 from "../../../img/img_about_home_3.webp";

const AboutHome = () => {
  const { t } = useTranslation();

  return (
    <div id="about_home">
      <div className="about_us_home">
        <div className="text_about_home">
          <h3>
            {t("about_us")} <span></span>
          </h3>
          <p>{t("About_exhibition_1")} </p>
          <p>{t("About_exhibition_2")}</p>
        </div>

        <div className="text_about_home_2">
          <p>{t("About_exhibition_3")} </p>
          <p>{t("About_exhibition_4")}</p>

          <NavLink to="about" className="learn_more">
            {t("learn_more")}
          </NavLink>
        </div>
      </div>
      <div className="img_about_home">
        <img src={img_about_home_3} alt="test" />
        <img src={img_about_home_2} alt="test" />
        <img src={img_about_home_1} alt="test" />
      </div>
    </div>
  );
};

export default AboutHome;
