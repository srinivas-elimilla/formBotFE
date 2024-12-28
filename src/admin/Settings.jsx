import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUpdateSettings } from "../store/settingsStore";
import useAuthStore from "../store/useUserStore";
import toast from "react-hot-toast";
import styles from "../styles/settings.module.css";

const Settings = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
  }, [navigate]);

  const { updateSettings } = useUpdateSettings();
  const [formData, setFormData] = useState({
    name: "" || user?.name,
    email: "" || user?.email,
    oldPassword: "",
    newPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  console.log("form >>>>>>>>>>>>", formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword && !formData.oldPassword) {
      toast.error("Old password is mandatory for updating the password.");
      return;
    }

    try {
      const response = await updateSettings(formData);
      if (response.status === 200) {
        toast.success("Settings updated successfully!");
      } else {
        toast.error(response?.data?.message || "Failed to update settings.");
      }
    } catch (error) {
      toast.error("An error occurred while updating settings.");
    }
  };

  const isDisabled =
    !formData.name &&
    !formData.email &&
    !formData.oldPassword &&
    !formData.newPassword;

  console.log("isDisabled >>>>>>>>>", isDisabled);

  return (
    <div className={styles.settingContainer}>
      <div className={styles.formContainer}>
        <h1>Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className={`${styles.inputContainer} ${theme}`}>
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.inputContainer} ${theme}`}>
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.inputContainer} ${theme}`}>
            <i className="fas fa-lock"></i>
            <input
              type={passwordVisible ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
            />
            <span
              className={styles.togglePassword}
              onClick={togglePasswordVisibility}
            >
              <i
                className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </span>
          </div>
          <div className={`${styles.inputContainer} ${theme}`}>
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className={styles.updateBtn}
            disabled={isDisabled}
          >
            Update
          </button>
        </form>
      </div>
      <div className={`${styles.logout}`}>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <i className="fas fa-arrow-right-from-bracket"></i> Log out
        </button>
      </div>
    </div>
  );
};

export default Settings;
