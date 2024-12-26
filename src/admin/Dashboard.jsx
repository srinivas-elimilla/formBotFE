import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import CommonModal from "./modals/CommonModal";
import styles from "../styles/dashboard.module.css";
import ThemeToggleButton from "../components/ThemeToggleButton";

const Dashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFolderIndex, setActiveFolderIndex] = useState(null);
  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isConfirmBtn, setIsConfirmBtn] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "Srinivas Elimilla's workspace"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
  }, [navigate]);

  const openModal = (label, placeholder, isConfirmBtn) => {
    setLabel(label);
    setPlaceholder(placeholder);
    setIsConfirmBtn(isConfirmBtn);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleFolderClick = (index) => {
    setActiveFolderIndex(index === activeFolderIndex ? null : index);
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "Logout") {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const folders = [
    { name: "Folder 1" },
    { name: "Folder 2" },
    { name: "Folder 3" },
    { name: "Folder 4" },
    { name: "Folder 5" },
    { name: "Folder 6" },
  ];

  const forms = [
    { name: "Folder 1" },
    { name: "Folder 2" },
    { name: "Folder 3" },
    { name: "Folder 4" },
    { name: "Folder 5" },
    { name: "Folder 6" },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <select
            className={theme}
            value={selectedOption}
            onChange={handleOptionChange}
            style={{
              backgroundColor: theme === "dark" ? "#121212" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#47474a",
            }}
          >
            <option
              value="Srinivas Elimilla's workspace"
              style={{
                color: theme === "dark" ? "#ffffff" : "#47474a",
              }}
            >
              Srinivas Elimilla's workspace
            </option>
            <option
              value="Settings"
              style={{
                color: theme === "dark" ? "#ffffff" : "#47474a",
              }}
            >
              Settings
            </option>
            <option
              value="Logout"
              style={{
                color: "#FFA54C",
              }}
            >
              Logout
            </option>
          </select>
        </div>
        <div className={styles.navbarRight}>
          <div className={`${styles.togglebtn}`}>
            <div>Light</div>
            <ThemeToggleButton />
            <div>Dark</div>
          </div>
          <button className={`${styles.sharebtn}`}>Share</button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={`${styles.subcontent}`}>
          <div className={`${styles.createFolderBtns}`}>
            <div
              onClick={() =>
                openModal("Create New Folder", "Enter folder name", false)
              }
              className={styles.createFolderBtn}
            >
              <i
                className={`fa fa-folder-plus ${
                  theme === "light" ? styles.addicondark : styles.addiconlight
                }`}
              ></i>{" "}
              Create a folder
            </div>
            {folders.map((folder, index) => (
              <div
                className={`${styles.createFolderBtn} ${
                  activeFolderIndex === index ? styles.whitebg : styles.darkbg
                }`}
                key={index}
                onClick={() => handleFolderClick(index)}
              >
                {theme === "dark" ? (
                  folder.name
                ) : (
                  <span
                    style={{
                      color:
                        theme === "light"
                          ? activeFolderIndex === index
                            ? "#000000"
                            : "gray"
                          : "#FFFFFF",
                    }}
                  >
                    {folder.name}
                  </span>
                )}
                <i
                  className="fa-solid fa-trash-can"
                  style={{ color: "#FF2C62" }}
                  onClick={() =>
                    openModal(
                      "Are you sure you want to delete this folder ?",
                      "",
                      true
                    )
                  }
                ></i>
              </div>
            ))}
          </div>
          <div className={`${styles.createFormBtns}`}>
            <div
              className={`${styles.typebotbtn}`}
              onClick={() =>
                openModal("Create New Form", "Enter form name", false)
              }
            >
              <i
                className={`fa-thin fa-plus ${styles.addtypeboticon}`}
                style={{ color: "#FFFFFF" }}
              ></i>
              Create a typebot
            </div>
            {forms.map((form, index) => (
              <div
                className={`${styles.createFormBtn}`}
                key={index}
                onClick={() => handleNavigateToForm(form)}
              >
                <span
                  style={{
                    color: theme === "light" ? "#000000" : "#FFFFFF",
                  }}
                >
                  {form.name || "New Form"}
                </span>
                <i
                  className="fa-solid fa-trash-can"
                  style={{ color: "#FF2C62" }}
                  onClick={() =>
                    openModal(
                      "Are you sure you want to delete this Form ?",
                      "",
                      true
                    )
                  }
                ></i>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CommonModal
          closeModal={closeModal}
          label={label}
          placeholder={placeholder}
          isConfirmBtn={isConfirmBtn}
        />
      )}
    </div>
  );
};

export default Dashboard;
