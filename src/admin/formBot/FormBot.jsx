import React, { useState } from "react";
import styles from "../../styles/formbot.module.css";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Flow from "./Flow";
import Response from "./Response";

const FormBot = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Flow");
  const [formDataToSend, setFormDataToSend] = useState([]);
  console.log("formDataToSend >>>>>>>>>", formDataToSend);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (activeTab === "Flow")
      return <Flow setFormDataToSend={setFormDataToSend} />;
    if (activeTab === "Response") return <Response />;
  };

  return (
    <div className={styles.formbot}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <input
            type="text"
            placeholder="Enter Form Name"
            style={{
              backgroundColor: theme === "dark" ? "#37373E" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#47474a",
            }}
          />
          <div className={styles.formbotbtns}>
            <button
              onClick={() => handleTabClick("Flow")}
              style={{
                color:
                  activeTab === "Flow"
                    ? "#7EA6FF"
                    : theme === "dark"
                    ? "#ffffff"
                    : "#000000EB",
                border: activeTab === "Flow" ? "1px solid #7EA6FF" : "none",
              }}
            >
              Flow
            </button>
            <button
              onClick={() => handleTabClick("Response")}
              style={{
                color:
                  activeTab === "Response"
                    ? "#7EA6FF"
                    : theme === "dark"
                    ? "#ffffff"
                    : "#000000EB",
                border: activeTab === "Response" ? "1px solid #7EA6FF" : "none",
              }}
            >
              Response
            </button>
          </div>
        </div>
        <div className={styles.navbarRight}>
          <div className={styles.togglebtn}>
            <div>Light</div>
            <ThemeToggleButton />
            <div>Dark</div>
          </div>
          <button className={styles.sharebtn} disabled>
            Share
          </button>
          <button className={styles.savebtn}>Save</button>
          <button className={styles.closeBtn} onClick={() => navigate(-1)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default FormBot;
