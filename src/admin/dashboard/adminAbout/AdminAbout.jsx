import React, { useEffect, useState } from "react";
import "./adminAbout.css";
import { toast } from "react-toastify";

const AdminAbout = () => {
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);
  const [selectedImage_1, setSelectedImage_1] = useState(null);
  const [selectedImage_2, setSelectedImage_2] = useState(null);

  const [allDataAbout, setAllDataAbout] = useState([]);
  const [addAbout, setAbout] = useState({
    title_about_1_en: "",
    title_about_1_ar: "",
    title_about_2_en: "",
    title_about_2_ar: "",
    img_about_1: "",
    img_about_2: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const fetchDataAbout = async () => {
    const formDataViewAbout = new FormData();
    formDataViewAbout.append("validation", validation);

    try {
      const responseAbout = await fetch(
        `${LinkLikeBachend}read/view_about.php`,
        {
          method: "POST",
          body: formDataViewAbout,
        }
      );
      const dataAbout = await responseAbout.json();
      setAllDataAbout(dataAbout);
      setAbout({
        title_about_1_en: dataAbout[0].title_about_1_en,
        title_about_1_ar: dataAbout[0].title_about_1_ar,
        title_about_2_en: dataAbout[0].title_about_2_en,
        title_about_2_ar: dataAbout[0].title_about_2_ar,
        img_about_1: dataAbout[0].img_about_1,
        img_about_2: dataAbout[0].img_about_2,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  let img_about_1;
  let img_about_2;

  useEffect(() => {
    fetchDataAbout();
  }, [img_about_1, img_about_2]);

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setAbout((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange_1 = (e) => {
    const file = e.target.files[0];

    setSelectedImage_1(file);
  };

  const handleFileChange_2 = (e) => {
    const file = e.target.files[0];

    setSelectedImage_2(file);
  };

  img_about_1 = selectedImage_1
    ? URL.createObjectURL(selectedImage_1)
    : `${LinkLikeBachend}${addAbout.img_about_1}`;

  img_about_2 = selectedImage_2
    ? URL.createObjectURL(selectedImage_2)
    : `${LinkLikeBachend}${addAbout.img_about_2}`;

  const handleAbout_admin = async (e) => {
    e.preventDefault();
    setDisabledSubmit(true);

    const FormDataSubmit = new FormData();
    FormDataSubmit.append("validation", validation);
    FormDataSubmit.append("img_about_1", selectedImage_1);
    FormDataSubmit.append("img_about_2", selectedImage_2);

    Object.entries(addAbout).forEach(([key, value]) => {
      FormDataSubmit.append(key, value);
    });

    const response = await fetch(`${LinkLikeBachend}update/update_about.php`, {
      method: "POST",
      body: FormDataSubmit,
    });

    const resultText = await response.text();

    if (response.ok) {
      if (resultText == "successfully") {
        toast.success("The data has been updated successfully");

        setDisabledSubmit(false);

        setSelectedImage_1(null);
        setSelectedImage_2(null);

        fetchDataAbout();
      } else if (resultText == "no_changes") {
        toast.success("The data has not been changed");

        setDisabledSubmit(false);

        fetchDataAbout();
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

  //   console.log(allDataAbout);

  return (
    <div id="admin_About">
      <div className="admin_about_div">
        <h2>About</h2>
        <form
          className="admin_About"
          onSubmit={handleAbout_admin}
          encType="multipart/form-data"
        >
          <textarea
            type="text"
            id="title_about_1_en"
            name="title_about_1_en"
            value={addAbout.title_about_1_en}
            onChange={handleChangeUpdate}
            placeholder="title about en"
            required
          ></textarea>

          <textarea
            type="text"
            id="title_about_1_ar"
            name="title_about_1_ar"
            value={addAbout.title_about_1_ar}
            onChange={handleChangeUpdate}
            placeholder="title about ar"
            required
          ></textarea>

          <div className="div_img_about_1">
            <input
              type="file"
              name="img_about_1"
              id="img_about_1"
              accept="image/*"
              onChange={handleFileChange_1}
            />
            {img_about_1 && <img src={img_about_1} alt="background_img" />}
          </div>

          <textarea
            type="text"
            id="title_about_2_en"
            name="title_about_2_en"
            value={addAbout.title_about_2_en}
            onChange={handleChangeUpdate}
            placeholder="title about en"
            required
          ></textarea>

          <textarea
            type="text"
            id="title_about_2_ar"
            name="title_about_2_ar"
            value={addAbout.title_about_2_ar}
            onChange={handleChangeUpdate}
            placeholder="title about ar"
            required
          ></textarea>

          <div className="div_img_about_2">
            <input
              type="file"
              name="img_about_2"
              id="img_about_2"
              accept="image/*"
              onChange={handleFileChange_2}
            />
            {img_about_2 && <img src={img_about_2} alt="background_img" />}
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

export default AdminAbout;
