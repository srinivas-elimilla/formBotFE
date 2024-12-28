import React, { useState } from "react";
import styles from "../styles/register.module.css";
import bitriangle from "../assets/bitriangle.png";
import google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useUserStore";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if (!formData.name.trim()) newErrors.name = "Username is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Password must be at least 8 characters long and include letters and numbers.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await register(formData);

      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate("/dashboard");
      } else {
        console.log("response >>>>>>>>", response.response);
        toast.error(
          response?.response?.data?.message || "Registration failed."
        );
        return;
      }
    } catch (error) {
      console.log("error >>>>>>>>", error);
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
              htmlFor="username"
              style={{ color: errors.username ? "#FF4141" : "" }}
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter a username"
              value={formData.name}
              onChange={handleInputChange}
              style={{ borderColor: errors.name ? "#FF272780" : "" }}
            />
            {errors.name && <p style={{ color: "#522224" }}>{errors.name}</p>}
          </div>
          <div>
            <label
              htmlFor="email"
              style={{ color: errors.email ? "#FF4141" : "" }}
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ borderColor: errors.email ? "#FF272780" : "" }}
            />
            {errors.email && <p style={{ color: "#522224" }}>{errors.email}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              style={{ color: errors.password ? "#FF4141" : "" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              style={{ borderColor: errors.password ? "#FF272780" : "" }}
            />
            {errors.password && (
              <p style={{ color: "#522224" }}>{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              style={{ color: errors.confirmPassword ? "#FF4141" : "" }}
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Enter confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={{ borderColor: errors.confirmPassword ? "#FF272780" : "" }}
            />
            {errors.confirmPassword && (
              <p style={{ color: "#522224" }}>{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Sign Up"}
            </button>
            <p>OR</p>
            <button type="button">
              <span>
                <img src={google} alt="google" />
              </span>
              Sign Up with Google
            </button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
      <div className={`${styles.semicircle1}`}></div>
      <div className={`${styles.semicircle2}`}></div>
    </div>
  );
};

export default Register;
