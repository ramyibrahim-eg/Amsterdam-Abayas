import React, { useEffect, useState } from "react";
import background_img from "../../../img/background_img.webp";
import "./sliderHeader.css";
import { toast } from "react-toastify";
import { IoCloseCircleSharp } from "react-icons/io5";

const SliderHeader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);
  const [allDataSlider, setAllDataSlider] = useState([]);
  const [addSliderHeader, setSliderHeader] = useState({
    title_slider_header_en: "",
    title_slider_header_ar: "",
    description_slider_header_en: "",
    description_slider_header_ar: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setSelectedImage(file);
  };

  const imageUrl = selectedImage
    ? URL.createObjectURL(selectedImage)
    : background_img;

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setSliderHeader((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSlider_admin = async (e) => {
    e.preventDefault();
    setDisabledSubmit(true);

    const FormDataSubmit = new FormData();
    FormDataSubmit.append("validation", validation);
    FormDataSubmit.append("img_slider_header", selectedImage);

    Object.entries(addSliderHeader).forEach(([key, value]) => {
      FormDataSubmit.append(key, value);
    });

    const response = await fetch(`${LinkLikeBachend}create/slider_header.php`, {
      method: "POST",
      body: FormDataSubmit,
    });

    const resultText = await response.text();

    if (response.ok) {
      if (resultText == "successfully") {
        let img_slider_header = document.querySelector("#img_slider_header");
        img_slider_header.value = "";

        toast.success("Data added successfully");

        setSelectedImage(null);
        setDisabledSubmit(false);

        setSliderHeader({
          title_slider_header_en: "",
          title_slider_header_ar: "",
          description_slider_header_en: "",
          description_slider_header_ar: "",
        });

        fetchDataSlider();
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

  useEffect(() => {
    fetchDataSlider();
  }, []);

  const handleDeleteSlider = async (idSliderHeader) => {
    const FormDataIdSliderHeader = new FormData();
    FormDataIdSliderHeader.append("validation", validation);
    FormDataIdSliderHeader.append("idSliderHeader", idSliderHeader);

    const response = await fetch(
      `${LinkLikeBachend}delete/delete_slider_header.php`,
      {
        method: "POST",
        body: FormDataIdSliderHeader,
      }
    );

    const resultText = await response.text();

    if (response.ok) {
      if (resultText == "successfully") {
        toast.success("The data has been deleted successfully");

        fetchDataSlider();
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

  // console.log(allDataSlider);
  // console.log(addSliderHeader);

  return (
    <div className="slider_admin">
      <h2>Slider Header</h2>
      <form
        className="slider_form"
        onSubmit={handleSlider_admin}
        encType="multipart/form-data"
      >
        <div className="div_img_slider_header">
          <input
            type="file"
            name="img_slider_header"
            id="img_slider_header"
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

        <div>
          <input
            type="text"
            id="title_slider_header_en"
            name="title_slider_header_en"
            value={addSliderHeader.title_slider_header_en}
            onChange={handleChangeUpdate}
            placeholder="title slider header en"
            required
          />

          <textarea
            type="text"
            id="description_slider_header_en"
            name="description_slider_header_en"
            value={addSliderHeader.description_slider_header_en}
            onChange={handleChangeUpdate}
            placeholder="description slider header en"
            required
          ></textarea>
        </div>

        <div>
          <input
            type="text"
            id="title_slider_header_ar"
            name="title_slider_header_ar"
            value={addSliderHeader.title_slider_header_ar}
            onChange={handleChangeUpdate}
            placeholder="title slider header ar"
            required
          />

          <textarea
            type="text"
            id="description_slider_header_ar"
            name="description_slider_header_ar"
            value={addSliderHeader.description_slider_header_ar}
            onChange={handleChangeUpdate}
            placeholder="description slider header ar"
            required
          ></textarea>
        </div>

        <input
          type="submit"
          value="Add"
          disabled={isDisabledSubmit}
          style={{ opacity: isDisabledSubmit ? 0.3 : 1 }}
        />
      </form>
      <div className="all_img_slider">
        {allDataSlider && allDataSlider.length > 0 ? (
          allDataSlider.map((image, i) => (
            <div className="img_slider" key={i}>
              <span onClick={() => handleDeleteSlider(image.id)}>
                <IoCloseCircleSharp />
              </span>
              <img
                src={`${LinkLikeBachend}${image.img_slider_header}`}
                alt={`img slider${i}`}
              />

              <p>{image.title_slider_header_en}</p>
              <p>{image.title_slider_header_ar}</p>
              <p>{image.description_slider_header_en}</p>
              <p>{image.description_slider_header_ar}</p>
            </div>
          ))
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
};

export default SliderHeader;
