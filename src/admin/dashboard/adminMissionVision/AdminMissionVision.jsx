import React, { useEffect, useState } from "react";
import "./adminMissionVision.css";
import { toast } from "react-toastify";

const AdminMissionVision = () => {
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);
  const [selectedImage_1, setSelectedImage_1] = useState(null);
  const [selectedImage_2, setSelectedImage_2] = useState(null);

  const [allDataMissionVision, setAllDataMissionVision] = useState([]);
  const [addMissionVision, setMissionVision] = useState({
    description_mission_en: "",
    description_mission_ar: "",
    description_vision_en: "",
    description_vision_ar: "",
    img_mission: "",
    img_vision: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const fetchDataMissionVision = async () => {
    const formDataViewMissionVision = new FormData();
    formDataViewMissionVision.append("validation", validation);

    try {
      const responseMissionVision = await fetch(
        `${LinkLikeBachend}read/view_mission_vision.php`,
        {
          method: "POST",
          body: formDataViewMissionVision,
        }
      );
      const dataMissionVision = await responseMissionVision.json();
      setAllDataMissionVision(dataMissionVision);
      setMissionVision({
        description_mission_en: dataMissionVision[0].description_mission_en,
        description_mission_ar: dataMissionVision[0].description_mission_ar,
        description_vision_en: dataMissionVision[0].description_vision_en,
        description_vision_ar: dataMissionVision[0].description_vision_ar,
        img_mission: dataMissionVision[0].img_mission,
        img_vision: dataMissionVision[0].img_vision,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  let img_mission;
  let img_vision;

  useEffect(() => {
    fetchDataMissionVision();
  }, [img_mission, img_vision]);

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setMissionVision((prevData) => ({
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

  img_mission = selectedImage_1
    ? URL.createObjectURL(selectedImage_1)
    : `${LinkLikeBachend}${addMissionVision.img_mission}`;

  img_vision = selectedImage_2
    ? URL.createObjectURL(selectedImage_2)
    : `${LinkLikeBachend}${addMissionVision.img_vision}`;

  const handleMissionVision_admin = async (e) => {
    e.preventDefault();
    setDisabledSubmit(true);

    const FormDataSubmit = new FormData();
    FormDataSubmit.append("validation", validation);
    FormDataSubmit.append("img_mission", selectedImage_1);
    FormDataSubmit.append("img_vision", selectedImage_2);

    Object.entries(addMissionVision).forEach(([key, value]) => {
      FormDataSubmit.append(key, value);
    });

    const response = await fetch(
      `${LinkLikeBachend}update/update_mission_vision.php`,
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
        setSelectedImage_2(null);

        fetchDataMissionVision();
      } else if (resultText == "no_changes") {
        toast.success("The data has not been changed");

        setDisabledSubmit(false);

        fetchDataMissionVision();
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

  //   console.log(allDataMissionVision);

  return (
    <div id="admin_MissionVision">
      <div className="admin_MissionVision_div">
        <form
          className="admin_MissionVision"
          onSubmit={handleMissionVision_admin}
          encType="multipart/form-data"
        >
          <div>
            <h2>Mission</h2>
            <textarea
              type="text"
              id="description_mission_en"
              name="description_mission_en"
              value={addMissionVision.description_mission_en}
              onChange={handleChangeUpdate}
              placeholder="description mission en"
              required
            ></textarea>

            <textarea
              type="text"
              id="description_mission_ar"
              name="description_mission_ar"
              value={addMissionVision.description_mission_ar}
              onChange={handleChangeUpdate}
              placeholder="description mission ar"
              required
            ></textarea>

            <div className="div_img_mission">
              <input
                type="file"
                name="img_mission"
                id="img_mission"
                accept="image/*"
                onChange={handleFileChange_1}
              />
              {img_mission && <img src={img_mission} alt="background_img" />}
            </div>
          </div>

          <div>
            <h2>Vision</h2>
            <textarea
              type="text"
              id="description_vision_en"
              name="description_vision_en"
              value={addMissionVision.description_vision_en}
              onChange={handleChangeUpdate}
              placeholder="description vision en"
              required
            ></textarea>

            <textarea
              type="text"
              id="description_vision_ar"
              name="description_vision_ar"
              value={addMissionVision.description_vision_ar}
              onChange={handleChangeUpdate}
              placeholder="description vision ar"
              required
            ></textarea>

            <div className="div_img_vision">
              <input
                type="file"
                name="img_vision"
                id="img_vision"
                accept="image/*"
                onChange={handleFileChange_2}
              />
              {img_vision && <img src={img_vision} alt="background_img" />}
            </div>
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

export default AdminMissionVision;
