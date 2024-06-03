import React, { useEffect, useState } from "react";
import "./adminContact.css";
import { toast } from "react-toastify";

const AdminContact = () => {
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);
  const [allDataContact, setAllDataContact] = useState([]);
  const [addContact, setContact] = useState({
    google_map: "",
    tiktok: "",
    instagram: "",
    phone_1: "",
    phone_2: "",
  });

  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;

  const fetchDataContact = async () => {
    const formDataViewContact = new FormData();
    formDataViewContact.append("validation", validation);

    try {
      const responseContact = await fetch(
        `${LinkLikeBachend}read/view_contact.php`,
        {
          method: "POST",
          body: formDataViewContact,
        }
      );
      const dataContact = await responseContact.json();
      setAllDataContact(dataContact);
      setContact({
        google_map: dataContact[0].google_map,
        tiktok: dataContact[0].tiktok,
        instagram: dataContact[0].instagram,
        phone_1: dataContact[0].phone_1,
        phone_2: dataContact[0].phone_2,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchDataContact();
  }, []);

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContact_admin = async (e) => {
    e.preventDefault();
    setDisabledSubmit(true);

    const FormDataSubmit = new FormData();
    FormDataSubmit.append("validation", validation);

    Object.entries(addContact).forEach(([key, value]) => {
      FormDataSubmit.append(key, value);
    });

    const response = await fetch(
      `${LinkLikeBachend}update/update_contact.php`,
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

        fetchDataContact();
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

  //   console.log(allDataContact);
  //   console.log(addContact);

  return (
    <div id="admin_contact">
      <h2>Contact</h2>
      <form
        className="admin_contact"
        onSubmit={handleContact_admin}
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="google_map">google map</label>
          <input
            type="text"
            id="google_map"
            name="google_map"
            value={addContact.google_map}
            onChange={handleChangeUpdate}
            placeholder="google map"
            required
          />
        </div>

        <div>
          <label htmlFor="tiktok">tiktok</label>
          <input
            type="text"
            id="tiktok"
            name="tiktok"
            value={addContact.tiktok}
            onChange={handleChangeUpdate}
            placeholder="tiktok"
            required
          />
        </div>

        <div>
          <label htmlFor="instagram">instagram</label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={addContact.instagram}
            onChange={handleChangeUpdate}
            placeholder="instagram"
            required
          />
        </div>

        <div>
          <label htmlFor="phone_1">phone</label>
          <input
            type="text"
            id="phone_1"
            name="phone_1"
            value={addContact.phone_1}
            onChange={handleChangeUpdate}
            placeholder="phone_1"
            required
          />
        </div>

        <div>
          <label htmlFor="phone_2">phone</label>
          <input
            type="text"
            id="phone_2"
            name="phone_2"
            value={addContact.phone_2}
            onChange={handleChangeUpdate}
            placeholder="phone_2"
            required
          />
        </div>

        <input
          type="submit"
          value="Update"
          disabled={isDisabledSubmit}
          style={{ opacity: isDisabledSubmit ? 0.3 : 1 }}
        />
      </form>
    </div>
  );
};

export default AdminContact;
