import React, { useEffect, useState } from "react";
import "./contact.css";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaInstagram, FaTiktok } from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation();

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

  return (
    <div id="contact">
      <div className="contact">
        <h3>
          {t("location")} <span></span>
        </h3>

        <div className="google_map">
          <iframe src={addContact.google_map}></iframe>
        </div>
      </div>

      <div
        className="contact"
        style={{ padding: "0 5rem", marginBottom: "5rem" }}
      >
        <h3>
          {t("to_contact_us")} <span></span>
        </h3>

        <div className="to_contact_us">
          <div className="to_contact_us_div">
            <FaTiktok />

            <a
              href={addContact.tiktok}
              target="_blank"
              rel="noopener noreferrer"
            >
              {addContact.tiktok}
            </a>
          </div>

          <div className="to_contact_us_div">
            <FaInstagram />

            <a
              href={addContact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {addContact.instagram}
            </a>
          </div>

          <div className="to_contact_us_div">
            <FaPhoneAlt />

            <div className="to_contact_us_div_p">
              <p>+{addContact.phone_1}</p>
              <p>+{addContact.phone_2}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
