import React, { useState } from "react";
import styles from "../styles/login.module.css";
import bitriangle from "../assets/bitriangle.png";
import google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useUserStore";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className={`${styles.container}`}>
      <button className={`${styles.backbtn}`} onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <div className={`${styles.bitriangle}`}>
        <img src={bitriangle} alt="bitriangle" />
      </div>
      <div className={`${styles.formcontainer}`}>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              style={{ color: formErrors.email ? "#FF4141" : "" }}
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ borderColor: formErrors.email ? "#FF272780" : "" }}
            />
            {formErrors.email && (
              <p style={{ color: "#522224" }}>{formErrors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              style={{ color: formErrors.password ? "#FF4141" : "" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              style={{ borderColor: formErrors.password ? "#FF272780" : "" }}
            />
            {formErrors.password && (
              <p style={{ color: "#522224" }}>{formErrors.password}</p>
            )}
          </div>
          <div>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
            <p>OR</p>
            <button type="button">
              <span>
                <img src={google} alt="google" />
              </span>
              Sign In with Google
            </button>
            <p>
              Don’t have an account? <Link to="/register">Register now</Link>
            </p>
          </div>
        </form>
      </div>
      <div className={`${styles.semicircle1}`}></div>
      <div className={`${styles.semicircle2}`}></div>
    </div>
  );
};

export default Login;
