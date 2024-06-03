import React, { useEffect, useState } from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import "./headerAdmin.css";
import logo from "../../../img/logo.png";
import Cookies from "js-cookie";

const HeaderAdmin = () => {
  const [activeLink, setActiveLink] = useState("/dashboard");
  const [loggedOut, setLoggedOut] = useState(false);

  const links_pages = [
    { href: "/dashboard", label: "Slider Header" },
    { href: "admin-contact", label: "Contact" },
    { href: "admin-about", label: "About" },
    { href: "admin-rateus", label: "Rateus" },
    { href: "admin-mission-vision", label: "Mission Vision" },
    { href: "admin-goal", label: "Goal" },
  ];

  const links_products = [
    { href: "admin-product-info", label: "Product Info" },
    { href: "admin-product-add", label: "Product Add" },
  ];

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  useEffect(() => {
    const buttons = document.querySelectorAll(".dropdown-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const parentDiv = button.parentNode;
        parentDiv.classList.add("active");
        event.stopPropagation();
      });
    });

    document.addEventListener("click", (event) => {
      document.querySelectorAll(".dropdown").forEach((element) => {
        element.classList.remove("active");
      });
    });
  }, []);

  const authSuccess = Cookies.get("validation_login");

  if (authSuccess !== "true") {
    return <Navigate to="/admin" />;
  }

  const handleLogOut = () => {
    Cookies.remove("validation_login");
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <header>
        {/* <!-- Menu --> */}
        <div className="full_dropdown">
          <div className="dropdown">
            <button className="dropdown-btn">Pages</button>
            <div className="dropdown-content">
              {links_pages.map((link, i) => (
                <button
                  key={i}
                  className={activeLink === link.href ? "active" : ""}
                >
                  <NavLink
                    className="shortcut"
                    to={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    aria-current={activeLink === link.href ? "page" : null}
                  >
                    {link.label}
                  </NavLink>
                </button>
              ))}
            </div>
          </div>

          <div className="dropdown">
            <button className="dropdown-btn">Products</button>
            <div className="dropdown-content">
              {links_products.map((link, i) => (
                <button
                  key={i}
                  className={activeLink === link.href ? "active" : ""}
                >
                  <NavLink
                    className="shortcut"
                    to={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    aria-current={activeLink === link.href ? "page" : null}
                  >
                    {link.label}
                  </NavLink>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <button className="logout" onClick={handleLogOut}>
          LogOut
        </button>
      </header>

      <Outlet />
    </>
  );
};

export default HeaderAdmin;
