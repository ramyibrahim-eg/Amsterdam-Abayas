import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import test from "../../../img/img_about_home_1.webp";
import "./goal.css";
import { useAppContext } from "../../../components/context/AppProvider";

const Goal = () => {
  const { t } = useTranslation();
  const { direction } = useAppContext();

  const [allDataGoal, setAllDataGoal] = useState([]);
  const [addGoal, setGoal] = useState({
    description_goal_en: "",
    description_goal_ar: "",
    img_goal: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const fetchDataGoal = async () => {
    const formDataViewGoal = new FormData();
    formDataViewGoal.append("validation", validation);

    try {
      const responseGoal = await fetch(`${LinkLikeBachend}read/view_goal.php`, {
        method: "POST",
        body: formDataViewGoal,
      });
      const dataGoal = await responseGoal.json();
      setAllDataGoal(dataGoal);
      setGoal({
        description_goal_en: dataGoal[0].description_goal_en,
        description_goal_ar: dataGoal[0].description_goal_ar,
        img_goal: dataGoal[0].img_goal,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchDataGoal();
  }, []);

  // console.log(allDataGoal);

  return (
    <div id="goal">
      <div className="goal">
        <div className="text">
          <h3>
            {t("goal")} <span></span>
          </h3>
          {direction == "rtl" ? (
            <p>{addGoal.description_goal_ar}</p>
          ) : (
            <p>{addGoal.description_goal_en}</p>
          )}
          <div className="image">
            <img src={`${LinkLikeBachend}${addGoal.img_goal}`} alt="test" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goal;
