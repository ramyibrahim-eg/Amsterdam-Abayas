import React, { useState } from "react";
import "./authentication.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const Authentication = () => {
  const authSuccess = Cookies.get("validation_login");
  const LinkLikeBachend = process.env.REACT_APP_BACKEND_URL;
  const validation = process.env.REACT_APP_VALIDATION;
  const [password, setPassword] = useState("");
  const [isDisabledLogin, setDisabledLogin] = useState(false);

  const navigate = useNavigate();

  if (authSuccess == "true") {
    return <Navigate to="/dashboard" />;
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabledLogin(true);

    const formDataLogin = new FormData();
    formDataLogin.append("validation", validation);
    formDataLogin.append("password_admin", password);

    const response = await fetch(`${LinkLikeBachend}read/login_admin.php`, {
      method: "POST",
      body: formDataLogin,
    });

    const resultText = await response.text();

    if (response.ok) {
      if (resultText == "successfully") {
        toast.success("You have been logged in successfully");

        setPassword("");

        Cookies.set("validation_login", "true");

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1000);
      } else {
        toast.error("Error recording data");
        console.log(resultText);
        setDisabledLogin(false);
      }
    } else {
      const errorText = await response.text();
      toast.error("Error recording data");
      console.log("حدث خطأ:", errorText);
      console.log(errorText);
      setDisabledLogin(false);
    }
  };

  return (
    <div className="login_admin" onSubmit={handleSubmit}>
      <div className="box">
        <span className="borderLine"></span>
        <form>
          <h2>Sign In Admin</h2>

          <div className="inputBox">
            <input
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <span>Password</span>
            <i></i>
          </div>

          <input
            type="submit"
            style={{ opacity: isDisabledLogin ? 0.3 : 1 }}
            value="Login"
            disabled={isDisabledLogin}
          />
        </form>
      </div>
    </div>
  );
};

export default Authentication;
