import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./products.css";
import test from "../../img/img_about_home_1.webp";
import { useAppContext } from "../../components/context/AppProvider";

const Products = () => {
  const { t } = useTranslation();
  const { direction } = useAppContext();

  const [allDataProducts, setAllDataProducts] = useState([]);

  const [allDataProductsInfo, setAllDataProductsInfo] = useState([]);
  const [addProductsInfo, setProductsInfo] = useState({
    description_products_info_en: "",
    description_products_info_ar: "",
    img_products_info: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const fetchDataProductsInfo = async () => {
    const formDataViewProductsInfo = new FormData();
    formDataViewProductsInfo.append("validation", validation);

    try {
      const responseProductsInfo = await fetch(
        `${LinkLikeBachend}read/view_products_info.php`,
        {
          method: "POST",
          body: formDataViewProductsInfo,
        }
      );
      const dataProductsInfo = await responseProductsInfo.json();
      setAllDataProductsInfo(dataProductsInfo);
      setProductsInfo({
        description_products_info_en:
          dataProductsInfo[0].description_products_info_en,
        description_products_info_ar:
          dataProductsInfo[0].description_products_info_ar,
        img_products_info: dataProductsInfo[0].img_products_info,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchDataProducts = async () => {
    const formDataViewProducts = new FormData();
    formDataViewProducts.append("validation", validation);

    try {
      const responseProducts = await fetch(
        `${LinkLikeBachend}read/view_products.php`,
        {
          method: "POST",
          body: formDataViewProducts,
        }
      );
      const dataProducts = await responseProducts.json();
      setAllDataProducts(dataProducts);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleWindowResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    fetchDataProductsInfo();
    fetchDataProducts();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  let itemsPerPage;

  if (isMobile) {
    itemsPerPage = 6;
  } else {
    itemsPerPage = 9;
  }

  const [displayedImages, setDisplayedImages] = useState(itemsPerPage);
  const [loading, setLoading] = useState(true);

  const startIndex = 0;
  const endIndex = displayedImages;
  const currentImages = allDataProducts.slice(startIndex, endIndex);

  const handleShowMore = () => {
    setLoading(false);
    setTimeout(() => {
      setDisplayedImages((prevCount) => prevCount + itemsPerPage);
      setLoading(true);
    }, 3000);
  };

  // console.log(allDataProductsInfo);
  // console.log(allDataProducts);

  return (
    <div id="product">
      <div className="product">
        <div className="left">
          <h3>
            {t("our_products")} <span></span>
          </h3>
          {direction == "rtl" ? (
            <p>{addProductsInfo.description_products_info_ar}</p>
          ) : (
            <p>{addProductsInfo.description_products_info_en}</p>
          )}
        </div>
        <div className="right">
          <img
            src={`${LinkLikeBachend}${addProductsInfo.img_products_info}`}
            alt="test"
          />
        </div>
      </div>
      <section className="gallery">
        <div className="images">
          {currentImages && currentImages.length > 0 ? (
            currentImages.map((image, i) => (
              <React.StrictMode key={i}>
                <img
                  src={`${LinkLikeBachend}${image.img_product_add}`}
                  alt={`img Products${i}`}
                />
              </React.StrictMode>
            ))
          ) : (
            <p>No Data</p>
          )}
        </div>

        {loading ? (
          <div className="currentPage">
            {displayedImages < allDataProducts.length && (
              <button onClick={handleShowMore}>{t("show_more")}</button>
            )}
          </div>
        ) : (
          <div className="loading">
            {displayedImages < allDataProducts.length && (
              <button>
                {t("loading")} <div className="lds-hourglass"></div>
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
