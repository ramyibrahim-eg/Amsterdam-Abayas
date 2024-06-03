import React, { useEffect, useState } from "react";
import background_img from "../../../img/background_img.webp";
import "./adminProducts.css";
import { toast } from "react-toastify";
import { IoCloseCircleSharp } from "react-icons/io5";

const AdminProducts = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);
  const [allDataProducts, setAllDataProducts] = useState([]);

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setSelectedImage(file);
  };

  const imageUrl = selectedImage
    ? URL.createObjectURL(selectedImage)
    : background_img;

  const handleProducts_admin = async (e) => {
    e.preventDefault();
    setDisabledSubmit(true);

    const FormDataSubmit = new FormData();
    FormDataSubmit.append("validation", validation);
    FormDataSubmit.append("img_products", selectedImage);

    const response = await fetch(`${LinkLikeBachend}create/products.php`, {
      method: "POST",
      body: FormDataSubmit,
    });

    const resultText = await response.text();

    if (response.ok) {
      if (resultText == "successfully") {
        let img_Products = document.querySelector("#img_products");
        img_Products.value = "";

        toast.success("Data added successfully");

        setSelectedImage(null);
        setDisabledSubmit(false);

        fetchDataProducts();
      } else {
        toast.error("Error when adding data");

        console.log(resultText);
        setDisabledSubmit(false);
      }
    } else {
      const errorText = await response.text();
      toast.error("Error when adding data");
      console.log("حدث خطأ:", errorText);
      console.log(errorText);
      setDisabledSubmit(false);
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

  useEffect(() => {
    fetchDataProducts();
  }, []);

  const handleDeleteProducts = async (idProducts) => {
    const FormDataIdProducts = new FormData();
    FormDataIdProducts.append("validation", validation);
    FormDataIdProducts.append("idProducts", idProducts);

    const response = await fetch(
      `${LinkLikeBachend}delete/delete_products.php`,
      {
        method: "POST",
        body: FormDataIdProducts,
      }
    );

    const resultText = await response.text();

    if (response.ok) {
      if (resultText == "successfully") {
        toast.success("The data has been deleted successfully");

        fetchDataProducts();
      } else {
        toast.error("Error when deleting data");

        console.log(resultText);
      }
    } else {
      const errorText = await response.text();
      toast.error("Error when deleting data");
      console.log("حدث خطأ:", errorText);
      console.log(errorText);
    }
  };

  // console.log(allDataProducts);

  return (
    <div className="products_admin">
      <h2>Products Header</h2>
      <form
        className="products_form"
        onSubmit={handleProducts_admin}
        encType="multipart/form-data"
      >
        <div className="div_img_products">
          <input
            type="file"
            name="img_products"
            id="img_products"
            required
            accept="image/*"
            onChange={handleFileChange}
          />
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="background_img" />
            </div>
          )}
        </div>

        <input
          type="submit"
          value="Add"
          disabled={isDisabledSubmit}
          style={{ opacity: isDisabledSubmit ? 0.3 : 1 }}
        />
      </form>
      <div className="all_img_products">
        {allDataProducts && allDataProducts.length > 0 ? (
          allDataProducts.map((image, i) => (
            <div className="img_products" key={i}>
              <span onClick={() => handleDeleteProducts(image.id)}>
                <IoCloseCircleSharp />
              </span>
              <img
                src={`${LinkLikeBachend}${image.img_product_add}`}
                alt={`img Products${i}`}
              />
            </div>
          ))
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
