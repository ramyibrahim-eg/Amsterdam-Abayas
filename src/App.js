import React, { useEffect } from "react";
import NotFound from "./page/notFound/NotFound";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useAppContext } from "./components/context/AppProvider";
import Authentication from "./admin/Authentication";
import HeaderAdmin from "./admin/dashboard/headerAdmin/HeaderAdmin";
import SliderHeader from "./admin/dashboard/sliderHeader/SliderHeader";
import Home from "./page/home/Home";
import About from "./page/About/About";
import Contact from "./page/contact/Contact";
import AdminContact from "./admin/dashboard/adminContact/AdminContact";
import AdminAbout from "./admin/dashboard/adminAbout/AdminAbout";
import AdminRateus from "./admin/dashboard/adminRateus/AdminRateus";
import AdminMissionVision from "./admin/dashboard/adminMissionVision/AdminMissionVision";
import Products from "./page/products/Products";
import AdminGoal from "./admin/dashboard/adminGoal/AdminGoal";
import AdminProductsInfo from "./admin/dashboard/adminProductsInfo/AdminProductsInfo";
import AdminProducts from "./admin/dashboard/adminProducts/AdminProducts";

const App = () => {
  const { direction, setDirection } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      className={`direction direction_${direction}`}
      style={{ direction: direction }}
    >
      <Routes>
        <Route
          path="/"
          element={<Navbar setDirection={setDirection} direction={direction} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
        </Route>

        <Route path="/admin" element={<Authentication />} />

        <Route path="/dashboard" element={<HeaderAdmin />}>
          <Route path="/dashboard" element={<SliderHeader />} />
          <Route path="admin-contact" element={<AdminContact />} />
          <Route path="admin-about" element={<AdminAbout />} />
          <Route path="admin-rateus" element={<AdminRateus />} />
          <Route path="admin-mission-vision" element={<AdminMissionVision />} />
          <Route path="admin-goal" element={<AdminGoal />} />
          <Route path="admin-product-add" element={<AdminProducts />} />
          <Route path="admin-product-info" element={<AdminProductsInfo />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
