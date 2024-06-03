import React from "react";
import "./footer.css";
import { Link } from "react-scroll";
import logo from "../../img/logo.png";
import {
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaTiktok,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t("home") },
    { to: "about", label: t("about_us") },
    { to: "products", label: t("our_products") },
  ];

  return (
    <div id="footer">
      <div className="footer">
        <div className="all_footer">
          <div className="right">
            <ul className="links">
              {links.map((item, i) => (
                <li key={i}>
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="center">
            <h2>
              {t("contact_us")} <span></span>
            </h2>
            <div>
              <a
                href="https://www.instagram.com/amesterdam.abaya?igsh=ZjBwYjJydWU2Mmtv"
                target="_blank"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tiktok.com/@amesterdam.abaya"
                target="_blank"
              >
                <FaTiktok />
              </a>
              <a href="https://wa.me/message/MDZAF3TU23JBJ1" target="_blank">
                <FaWhatsapp />
              </a>
              <a
                href="https://maps.app.goo.gl/ARAcxBeQhDD3V2EF6"
                target="_blank"
              >
                <FaMapMarkerAlt />
              </a>
            </div>
          </div>
          <div className="left">
            <Link
              to="header"
              spy={true}
              smooth={true}
              offset={-200}
              duration={500}
              className="logo"
            >
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
