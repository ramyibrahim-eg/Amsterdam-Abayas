import React, { useEffect, useState } from "react";
import "./adminGoal.css";
import { toast } from "react-toastify";

const AdminGoal = () => {
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);
  const [selectedImage_1, setSelectedImage_1] = useState(null);

  const [allDataGoal, setAllDataGoal] = useState([]);
  const [addGoal, setGoal] = useState({
    description_goal_en: "",
    description_goal_ar: "",
    img_goal: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const fetchDataGoal = async () => {
    const formDataViewGoal = new FormData();
    formDataViewGoal.append("validation", validation);

    try {
      const responseGoal = await fetch(`${LinkLikeBachend}read/view_goal.php`, {
        method: "POST",
        body: formDataViewGoal,
      });
      const dataGoal = await responseGoal.json();
      setAllDataGoal(dataGoal);
      setGoal({
        description_goal_en: dataGoal[0].description_goal_en,
        description_goal_ar: dataGoal[0].description_goal_ar,
        img_goal: dataGoal[0].img_goal,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  let img_Goal_1;

  useEffect(() => {
    fetchDataGoal();
  }, [img_Goal_1]);

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setGoal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange_1 = (e) => {
    const file = e.target.files[0];

    setSelectedImage_1(file);
  };

  img_Goal_1 = selectedImage_1
    ? URL.createObjectURL(selectedImage_1)
    : `${LinkLikeBachend}${addGoal.img_goal}`;

  const handleGoal_admin = async (e) => {
    e.preventDefault();
    setDisabledSubmit(true);

    const FormDataSubmit = new FormData();
    FormDataSubmit.append("validation", validation);
    FormDataSubmit.append("img_goal_1", selectedImage_1);

    Object.entries(addGoal).forEach(([key, value]) => {
      FormDataSubmit.append(key, value);
    });

    const response = await fetch(`${LinkLikeBachend}update/update_goal.php`, {
      method: "POST",
      body: FormDataSubmit,
    });

    const resultText = await response.text();

    if (response.ok) {
      if (resultText == "successfully") {
        toast.success("The data has been updated successfully");

        setDisabledSubmit(false);

        setSelectedImage_1(null);

        fetchDataGoal();
      } else if (resultText == "no_changes") {
        toast.success("The data has not been changed");

        setDisabledSubmit(false);

        fetchDataGoal();
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

  //   console.log(allDataGoal);

  return (
    <div id="admin_goal">
      <div className="admin_goal_div">
        <h2>Goal</h2>
        <form
          className="admin_goal"
          onSubmit={handleGoal_admin}
          encType="multipart/form-data"
        >
          <textarea
            type="text"
            id="description_goal_en"
            name="description_goal_en"
            value={addGoal.description_goal_en}
            onChange={handleChangeUpdate}
            placeholder="description goal en"
            required
          ></textarea>

          <textarea
            type="text"
            id="description_goal_ar"
            name="description_goal_ar"
            value={addGoal.description_goal_ar}
            onChange={handleChangeUpdate}
            placeholder="description goal ar"
            required
          ></textarea>

          <div className="div_img_goal">
            <input
              type="file"
              name="img_goal"
              id="img_goal"
              accept="image/*"
              onChange={handleFileChange_1}
            />
            {img_Goal_1 && <img src={img_Goal_1} alt="background_img" />}
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

export default AdminGoal;
