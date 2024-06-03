import React, { useEffect, useState } from "react";
import "./adminProductsInfo.css";
import { toast } from "react-toastify";

const AdminProductsInfo = () => {
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);
  const [selectedImage_1, setSelectedImage_1] = useState(null);

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

  let img_ProductsInfo_1;

  useEffect(() => {
    fetchDataProductsInfo();
  }, [img_ProductsInfo_1]);

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setProductsInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange_1 = (e) => {
    const file = e.target.files[0];

    setSelectedImage_1(file);
  };

  img_ProductsInfo_1 = selectedImage_1
    ? URL.createObjectURL(selectedImage_1)
    : `${LinkLikeBachend}${addProductsInfo.img_products_info}`;

  const handleProductsInfo_admin = async (e) => {
    e.preventDefault();
    setDisabledSubmit(true);

    const FormDataSubmit = new FormData();
    FormDataSubmit.append("validation", validation);
    FormDataSubmit.append("img_products_info_1", selectedImage_1);

    Object.entries(addProductsInfo).forEach(([key, value]) => {
      FormDataSubmit.append(key, value);
    });

    const response = await fetch(
      `${LinkLikeBachend}update/update_products_info.php`,
      {
        method: "POST",
        body: FormDataSubmit,
      }
    );

    const resultText = await response.text();

    if (response.ok) {
      if (resultText == "successfully") {
        toast.success("The data has been updated successfully");

        setDisabledSubmit(false);

        setSelectedImage_1(null);

        fetchDataProductsInfo();
      } else if (resultText == "no_changes") {
        toast.success("The data has not been changed");

        setDisabledSubmit(false);

        fetchDataProductsInfo();
      } else {
        toast.error("An error occurred when updating data");

        console.log(resultText);
        setDisabledSubmit(false);
      }
    } else {
      const errorText = await response.text();
      toast.error("An error occurred when updating data");
      console.log("حدث خطأ:", errorText);
      console.log(errorText);
      setDisabledSubmit(false);
    }
  };

  // console.log(allDataProductsInfo);

  return (
    <div id="admin_products_info">
      <div className="admin_products_info_div">
        <h2>Products Info</h2>
        <form
          className="admin_products_info"
          onSubmit={handleProductsInfo_admin}
          encType="multipart/form-data"
        >
          <textarea
            type="text"
            id="description_products_info_en"
            name="description_products_info_en"
            value={addProductsInfo.description_products_info_en}
            onChange={handleChangeUpdate}
            placeholder="description products info en"
            required
          ></textarea>

          <textarea
            type="text"
            id="description_products_info_ar"
            name="description_products_info_ar"
            value={addProductsInfo.description_products_info_ar}
            onChange={handleChangeUpdate}
            placeholder="description products info ar"
            required
          ></textarea>

          <div className="div_img_products_info">
            <input
              type="file"
              name="img_products_info"
              id="img_products_info"
              accept="image/*"
              onChange={handleFileChange_1}
            />
            {img_ProductsInfo_1 && (
              <img src={img_ProductsInfo_1} alt="background_img" />
            )}
          </div>

          <input
            type="submit"
            value="Update"
            disabled={isDisabledSubmit}
            style={{ opacity: isDisabledSubmit ? 0.3 : 1 }}
          />
        </form>
      </div>
    </div>
  );
};

export default AdminProductsInfo;
