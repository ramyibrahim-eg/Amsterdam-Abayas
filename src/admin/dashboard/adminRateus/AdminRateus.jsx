import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./adminRateus.css";

const AdminRateus = () => {
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);

  const [allDataRateus, setAllDataRateus] = useState([]);
  const [addRateus, setRateus] = useState({
    title_rate_us_en: "",
    title_rate_us_ar: "",
    respect_en: "",
    respect_ar: "",
    cultural_appreciation_en: "",
    cultural_appreciation_ar: "",
    integrity_en: "",
    integrity_ar: "",
    customer_satisfaction_en: "",
    customer_satisfaction_ar: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const fetchDataRateus = async () => {
    const formDataViewRateus = new FormData();
    formDataViewRateus.append("validation", validation);

    try {
      const responseRateus = await fetch(
        `${LinkLikeBachend}read/view_rate_us.php`,
        {
          method: "POST",
          body: formDataViewRateus,
        }
      );
      const dataRateus = await responseRateus.json();
      setAllDataRateus(dataRateus);
      setRateus({
        title_rate_us_en: dataRateus[0].title_rate_us_en,
        title_rate_us_ar: dataRateus[0].title_rate_us_ar,
        respect_en: dataRateus[0].respect_en,
        respect_ar: dataRateus[0].respect_ar,
        cultural_appreciation_en: dataRateus[0].cultural_appreciation_en,
        cultural_appreciation_ar: dataRateus[0].cultural_appreciation_ar,
        integrity_en: dataRateus[0].integrity_en,
        integrity_ar: dataRateus[0].integrity_ar,
        customer_satisfaction_en: dataRateus[0].customer_satisfaction_en,
        customer_satisfaction_ar: dataRateus[0].customer_satisfaction_ar,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchDataRateus();
  }, []);

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setRateus((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRateus_admin = async (e) => {
    e.preventDefault();
    setDisabledSubmit(true);

    const FormDataSubmit = new FormData();
    FormDataSubmit.append("validation", validation);

    Object.entries(addRateus).forEach(([key, value]) => {
      FormDataSubmit.append(key, value);
    });

    const response = await fetch(
      `${LinkLikeBachend}update/update_rate_us.php`,
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

        fetchDataRateus();
      } else if (resultText == "no_changes") {
        toast.success("The data has not been changed");

        setDisabledSubmit(false);

        fetchDataRateus();
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

  //   console.log(allDataRateus);

  return (
    <div id="admin_rateus">
      <div className="admin_rateus_div">
        <h2>Rateus</h2>
        <form className="admin_rateus" onSubmit={handleRateus_admin}>
          <div>
            <label htmlFor="title rate us">title rate us</label>
            <textarea
              type="text"
              id="title_rate_us_en"
              name="title_rate_us_en"
              value={addRateus.title_rate_us_en}
              onChange={handleChangeUpdate}
              placeholder="title rate us en"
              required
            ></textarea>

            <textarea
              type="text"
              id="title_rate_us_ar"
              name="title_rate_us_ar"
              value={addRateus.title_rate_us_ar}
              onChange={handleChangeUpdate}
              placeholder="title rate us ar"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="respect">respect</label>
            <textarea
              type="text"
              id="respect_en"
              name="respect_en"
              value={addRateus.respect_en}
              onChange={handleChangeUpdate}
              placeholder="respect en"
              required
            ></textarea>

            <textarea
              type="text"
              id="respect_ar"
              name="respect_ar"
              value={addRateus.respect_ar}
              onChange={handleChangeUpdate}
              placeholder="respect ar"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="cultural appreciation">cultural appreciation</label>
            <textarea
              type="text"
              id="cultural_appreciation_en"
              name="cultural_appreciation_en"
              value={addRateus.cultural_appreciation_en}
              onChange={handleChangeUpdate}
              placeholder="cultural appreciation en"
              required
            ></textarea>

            <textarea
              type="text"
              id="cultural_appreciation_ar"
              name="cultural_appreciation_ar"
              value={addRateus.cultural_appreciation_ar}
              onChange={handleChangeUpdate}
              placeholder="cultural appreciation ar"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="integrity">integrity</label>
            <textarea
              type="text"
              id="integrity_en"
              name="integrity_en"
              value={addRateus.integrity_en}
              onChange={handleChangeUpdate}
              placeholder="integrity en"
              required
            ></textarea>

            <textarea
              type="text"
              id="integrity_ar"
              name="integrity_ar"
              value={addRateus.integrity_ar}
              onChange={handleChangeUpdate}
              placeholder="integrity ar"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="customer satisfaction">customer satisfaction</label>
            <textarea
              type="text"
              id="customer_satisfaction_en"
              name="customer_satisfaction_en"
              value={addRateus.customer_satisfaction_en}
              onChange={handleChangeUpdate}
              placeholder="customer satisfaction en"
              required
            ></textarea>

            <textarea
              type="text"
              id="customer_satisfaction_ar"
              name="customer_satisfaction_ar"
              value={addRateus.customer_satisfaction_ar}
              onChange={handleChangeUpdate}
              placeholder="customer satisfaction ar"
              required
            ></textarea>
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

export default AdminRateus;
