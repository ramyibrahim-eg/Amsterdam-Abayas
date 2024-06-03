import React, { useState, useEffect } from "react";
import "./header.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useAppContext } from "../context/AppProvider";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { direction } = useAppContext();
  const [allDataSlider, setAllDataSlider] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;
  const { t } = useTranslation();

  const fetchDataSlider = async () => {
    const formDataViewSlider = new FormData();
    formDataViewSlider.append("validation", validation);

    try {
      const responseSlider = await fetch(
        `${LinkLikeBachend}read/view_slider_header.php`,
        {
          method: "POST",
          body: formDataViewSlider,
        }
      );
      const dataSlider = await responseSlider.json();
      setAllDataSlider(dataSlider);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleNextItem = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % allDataSlider.length);
  };

  const handlePrevItem = () => {
    setCurrentItemIndex(
      (prevIndex) =>
        (prevIndex - 1 + allDataSlider.length) % allDataSlider.length
    );
  };

  const showNavigationButtons = allDataSlider && allDataSlider.length > 1;

  const showNextButton =
    showNavigationButtons && currentItemIndex !== allDataSlider.length - 1;

  const showPrevButton = showNavigationButtons && currentItemIndex !== 0;

  useEffect(() => {
    fetchDataSlider();
  }, []);

  // console.log(allDataSlider);

  return (
    <div id="header">
      {direction == "rtl" ? (
        <div className="header_content">
          {allDataSlider && allDataSlider.length > 0 && (
            <div className="left_right">
              <div className="left">
                <div className="top">
                  <h3>
                    {allDataSlider[currentItemIndex].title_slider_header_ar}
                  </h3>
                </div>

                <div className="bottom">
                  <p>
                    {
                      allDataSlider[currentItemIndex]
                        .description_slider_header_ar
                    }
                  </p>
                </div>

                <NavLink to="products" className="discover_now">
                  {t("discover_now")}
                </NavLink>
              </div>
              <div className="right">
                <div>
                  <img
                    src={`${LinkLikeBachend}${allDataSlider[currentItemIndex].img_slider_header}`}
                    alt="GIRL"
                  />
                </div>
              </div>

              <div className="button_next_prev">
                {showNextButton && (
                  <FaAngleRight
                    className="FaAngleRight"
                    onClick={handleNextItem}
                  />
                )}
                <div></div>
                {showPrevButton && (
                  <FaAngleLeft
                    className="FaAngleLeft"
                    onClick={handlePrevItem}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="header_content">
          {allDataSlider && allDataSlider.length > 0 && (
            <div className="left_right">
              <div className="left">
                <div className="top">
                  <h3>
                    {allDataSlider[currentItemIndex].title_slider_header_en}
                  </h3>
                </div>

                <div className="bottom">
                  <p>
                    {
                      allDataSlider[currentItemIndex]
                        .description_slider_header_en
                    }
                  </p>
                </div>

                <NavLink to="products" className="discover_now">
                  {t("discover_now")}
                </NavLink>
              </div>
              <div className="right">
                <div>
                  <img
                    src={`${LinkLikeBachend}${allDataSlider[currentItemIndex].img_slider_header}`}
                    alt="GIRL"
                  />
                </div>
              </div>

              <div className="button_next_prev">
                {showNextButton && (
                  <FaAngleRight
                    className="FaAngleRight"
                    onClick={handleNextItem}
                  />
                )}
                <div></div>
                {showPrevButton && (
                  <FaAngleLeft
                    className="FaAngleLeft"
                    onClick={handlePrevItem}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
