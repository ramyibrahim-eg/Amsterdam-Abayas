import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../../components/context/AppProvider";
import "./missionVision.css";

const MissionVision = () => {
  const { t } = useTranslation();
  const { direction } = useAppContext();

  const [allDataMissionVision, setAllDataMissionVision] = useState([]);
  const [addMissionVision, setMissionVision] = useState({
    description_mission_en: "",
    description_mission_ar: "",
    description_vision_en: "",
    description_vision_ar: "",
    img_mission: "",
    img_vision: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const fetchDataMissionVision = async () => {
    const formDataViewMissionVision = new FormData();
    formDataViewMissionVision.append("validation", validation);

    try {
      const responseMissionVision = await fetch(
        `${LinkLikeBachend}read/view_mission_vision.php`,
        {
          method: "POST",
          body: formDataViewMissionVision,
        }
      );
      const dataMissionVision = await responseMissionVision.json();
      setAllDataMissionVision(dataMissionVision);
      setMissionVision({
        description_mission_en: dataMissionVision[0].description_mission_en,
        description_mission_ar: dataMissionVision[0].description_mission_ar,
        description_vision_en: dataMissionVision[0].description_vision_en,
        description_vision_ar: dataMissionVision[0].description_vision_ar,
        img_mission: dataMissionVision[0].img_mission,
        img_vision: dataMissionVision[0].img_vision,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchDataMissionVision();
  }, []);

  // console.log(allDataMissionVision);

  return (
    <div id="mission_vision">
      <div className="mission_vision">
        <div className="text">
          <h3>
            {t("mission")} <span></span>
          </h3>
          {direction == "rtl" ? (
            <p>{addMissionVision.description_mission_ar}</p>
          ) : (
            <p>{addMissionVision.description_mission_en}</p>
          )}
          <div className="image">
            <img
              src={`${LinkLikeBachend}${addMissionVision.img_mission}`}
              alt="test"
            />
          </div>
        </div>

        <div className="text">
          <h3>
            {t("vision")} <span></span>
          </h3>

          {direction == "rtl" ? (
            <p>{addMissionVision.description_vision_ar}</p>
          ) : (
            <p>{addMissionVision.description_vision_en}</p>
          )}
          <div className="image">
            <img
              src={`${LinkLikeBachend}${addMissionVision.img_vision}`}
              alt="test"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
