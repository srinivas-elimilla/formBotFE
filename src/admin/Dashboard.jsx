import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import CreateFolderModal from "./modals/CreateFolderModal";
import styles from "../styles/dashboard.module.css";
import ThemeToggleButton from "../components/ThemeToggleButton";

const Dashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFolderIndex, setActiveFolderIndex] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
  }, [navigate]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFolderClick = (index) => {
    setActiveFolderIndex(index === activeFolderIndex ? null : index);
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
          <div className={styles.dropdown}>Srinivas's workspace</div>
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
            <div onClick={openModal} className={styles.createFolderBtn}>
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
                ></i>
              </div>
            ))}
          </div>
          <div className={`${styles.createFormBtns}`}>
            <div className={`${styles.typebotbtn}`}>
              <i
                className={`fa-solid fa-plus ${styles.addtypeboticon}`}
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
                New Form
                <i
                  className="fa-solid fa-trash-can"
                  style={{ color: "#FF2C62" }}
                ></i>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && <CreateFolderModal closeModal={closeModal} />}
    </div>
  );
};

export default Dashboard;
