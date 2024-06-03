import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../../components/context/AppProvider";
import iconImg_1 from "../../../img/1.webp";
import iconImg_2 from "../../../img/2.webp";
import iconImg_3 from "../../../img/3.webp";
import iconImg_4 from "../../../img/4.webp";
import "./rateus.css";

const Rateus = () => {
  const { t } = useTranslation();
  const { direction } = useAppContext();

  const [allDataRateus, setAllDataRateus] = useState([]);
  const [addRateus, setRateus] = useState({
    title_rate_us_en: "",
    title_rate_us_ar: "",
    respect_en: "",
    respect_ar: "",
    cultural_appreciation_en: "",
    cultural_appreciation_ar: "",
    integrity_en: "",
    integrity_ar: "",
    customer_satisfaction_en: "",
    customer_satisfaction_ar: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const fetchDataRateus = async () => {
    const formDataViewRateus = new FormData();
    formDataViewRateus.append("validation", validation);

    try {
      const responseRateus = await fetch(
        `${LinkLikeBachend}read/view_rate_us.php`,
        {
          method: "POST",
          body: formDataViewRateus,
        }
      );
      const dataRateus = await responseRateus.json();
      setAllDataRateus(dataRateus);
      setRateus({
        title_rate_us_en: dataRateus[0].title_rate_us_en,
        title_rate_us_ar: dataRateus[0].title_rate_us_ar,
        respect_en: dataRateus[0].respect_en,
        respect_ar: dataRateus[0].respect_ar,
        cultural_appreciation_en: dataRateus[0].cultural_appreciation_en,
        cultural_appreciation_ar: dataRateus[0].cultural_appreciation_ar,
        integrity_en: dataRateus[0].integrity_en,
        integrity_ar: dataRateus[0].integrity_ar,
        customer_satisfaction_en: dataRateus[0].customer_satisfaction_en,
        customer_satisfaction_ar: dataRateus[0].customer_satisfaction_ar,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchDataRateus();
  }, []);

  // console.log(allDataRateus);

  return (
    <div id="rate_us">
      <div className="rate_us">
        <h3>
          {t("rate_us")} <span></span>
        </h3>
        {direction == "rtl" ? (
          <p className="rate_us_p">{addRateus.title_rate_us_ar}</p>
        ) : (
          <p className="rate_us_p">{addRateus.title_rate_us_en}</p>
        )}

        <div className="data_rate_us">
          <div className="data_rate_us_text">
            <img src={iconImg_1} alt="iconImg_1" />
            <p>
              <span>{t("customer_satisfaction")}:</span>{" "}
              {direction == "rtl" ? (
                <>{addRateus.customer_satisfaction_ar}</>
              ) : (
                <>{addRateus.customer_satisfaction_en}</>
              )}
            </p>
          </div>
          <div className="data_rate_us_text">
            <img src={iconImg_2} alt="iconImg_2" />
            <p>
              <span>{t("integrity")}:</span>{" "}
              {direction == "rtl" ? (
                <>{addRateus.integrity_ar}</>
              ) : (
                <>{addRateus.integrity_en}</>
              )}
            </p>
          </div>
          <div className="data_rate_us_text">
            <img src={iconImg_3} alt="iconImg_3" />
            <p>
              <span>{t("cultural_appreciation")}:</span>{" "}
              {direction == "rtl" ? (
                <>{addRateus.cultural_appreciation_ar}</>
              ) : (
                <>{addRateus.cultural_appreciation_en}</>
              )}
            </p>
          </div>
          <div className="data_rate_us_text">
            <img src={iconImg_4} alt="iconImg_4" />
            <p>
              <span>{t("respect")}:</span>{" "}
              {direction == "rtl" ? (
                <>{addRateus.respect_ar}</>
              ) : (
                <>{addRateus.respect_en}</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rateus;
