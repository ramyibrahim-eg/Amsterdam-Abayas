import React, { useState } from "react";
import "./navbar.css";
import logo from "../../img/logo.png";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import Copyrights from "../copyrights/Copyrights";
import Footer from "./../footer/Footer";
import Header from "../header/Header";

const Navbar = ({ setDirection, direction }) => {
  const [isChecked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!isChecked);
  };

  const { i18n, t } = useTranslation();

  const ChangeEN = () => {
    i18n.changeLanguage("en");
    setDirection("ltr");
  };

  const ChangeAR = () => {
    i18n.changeLanguage("ar");
    setDirection("rtl");
  };

  const links = [
    { to: "/", label: t("home") },
    { to: "about", label: t("about_us") },
    { to: "products", label: t("our_products") },
    { to: "contact", label: t("contact_us") },
  ];

  return (
    <>
      <nav>
        <input
          type="checkbox"
          id="nav-toggle"
          checked={isChecked}
          onChange={handleToggle}
        />

        <NavLink to="/" className="logo">
          <img src={logo} alt="logo" />
        </NavLink>

        <ul className="links" onClick={handleToggle}>
          {links.map((item, i) => (
            <li key={i}>
              <NavLink onClick={handleToggle} to={item.to}>
                {item.label}
              </NavLink>
            </li>
          ))}

          {direction == "ltr" ? (
            <li>
              <button className="ChangeLang" onClick={ChangeAR}>
                AR
              </button>
            </li>
          ) : (
            <li>
              <button className="ChangeLang" onClick={ChangeEN}>
                EN
              </button>
            </li>
          )}
        </ul>

        <label htmlFor="nav-toggle" className="icon-burger">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </label>
      </nav>

      <Header />

      <Outlet />

      <Footer />
      <Copyrights />
    </>
  );
};

export default Navbar;
