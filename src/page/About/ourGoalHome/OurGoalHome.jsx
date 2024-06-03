import React from "react";
import "./ourGoalHome.css";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import text_our_goal_home_1 from "../../../img/text_our_goal_home_1.webp";
import text_our_goal_home_2 from "../../../img/text_our_goal_home_2.webp";

const OurGoalHome = () => {
  const { t } = useTranslation();

  return (
    <div id="our_goal_home">
      <div className="our_goal_home">
        <div className="text_our_goal_home">
          <h3>
            {t("our_goal")} <span></span>
          </h3>
          <p>{t("our_goal_1")} </p>

          <NavLink to="about" className="learn_more">
            {t("learn_more")}
          </NavLink>
        </div>

        <div className="text_our_goal_home_2">
          <img src={text_our_goal_home_2} alt="test" />
          <img src={text_our_goal_home_1} alt="test" />
        </div>
      </div>
    </div>
  );
};

export default OurGoalHome;
