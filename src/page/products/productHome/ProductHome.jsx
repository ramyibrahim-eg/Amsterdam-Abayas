import React from "react";
import { useTranslation } from "react-i18next";
import "./productHome.css";
import { NavLink } from "react-router-dom";

const ProductHome = () => {
  const { t } = useTranslation();

  return (
    <div id="product_home">
      <div className="product_home">
        <h3>
          {t("our_products")} <span></span>
        </h3>
      </div>
      <div className="product_home_text">
        <div className="text">
          <p>{t("product_home_image")}</p>

          <NavLink to="products" className="discover_now">
            {t("discover_now")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductHome;
