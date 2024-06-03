import React, { useEffect, useState } from "react";
import "./about.css";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../components/context/AppProvider";
import Rateus from "./rateus/Rateus";
import MissionVision from "./missionVision/MissionVision";
import Goal from "./goal/Goal";

const About = () => {
  const { t } = useTranslation();
  const { direction } = useAppContext();

  const [allDataAbout, setAllDataAbout] = useState([]);
  const [addAbout, setAbout] = useState({
    title_about_1_en: "",
    title_about_1_ar: "",
    title_about_2_en: "",
    title_about_2_ar: "",
    img_about_1: "",
    img_about_2: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const fetchDataAbout = async () => {
    const formDataViewAbout = new FormData();
    formDataViewAbout.append("validation", validation);

    try {
      const responseAbout = await fetch(
        `${LinkLikeBachend}read/view_about.php`,
        {
          method: "POST",
          body: formDataViewAbout,
        }
      );
      const dataAbout = await responseAbout.json();
      setAllDataAbout(dataAbout);
      setAbout({
        title_about_1_en: dataAbout[0].title_about_1_en,
        title_about_1_ar: dataAbout[0].title_about_1_ar,
        title_about_2_en: dataAbout[0].title_about_2_en,
        title_about_2_ar: dataAbout[0].title_about_2_ar,
        img_about_1: dataAbout[0].img_about_1,
        img_about_2: dataAbout[0].img_about_2,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchDataAbout();
  }, []);

  // console.log(allDataAbout);

  return (
    <div id="about">
      <div className="about_us">
        <div className="text">
          <h3>
            {t("about_us")} <span></span>
          </h3>
          {direction == "rtl" ? (
            <p>{addAbout.title_about_1_ar}</p>
          ) : (
            <p>{addAbout.title_about_1_en}</p>
          )}

          <div className="image">
            <img
              src={`${LinkLikeBachend}${addAbout.img_about_1}`}
              alt={addAbout.title_about_1_ar}
            />
          </div>
        </div>
        <div className="text">
          <div className="image">
            <img
              src={`${LinkLikeBachend}${addAbout.img_about_2}`}
              alt={addAbout.title_about_1_ar}
            />
          </div>

          {direction == "rtl" ? (
            <p>{addAbout.title_about_2_ar}</p>
          ) : (
            <p>{addAbout.title_about_2_en}</p>
          )}
        </div>
      </div>
      <Rateus />

      <MissionVision />

      <Goal />
    </div>
  );
};

export default About;
