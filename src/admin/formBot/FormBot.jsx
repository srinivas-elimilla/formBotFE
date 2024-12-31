import React, { useEffect, useState } from "react";
import styles from "../../styles/formbot.module.css";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Flow from "./Flow";
import Response from "./Response";
import toast from "react-hot-toast";
import useUserStore from "../../store/useUserStore";
import copy from "copy-to-clipboard";
import { shareFormUrl } from "../../constants";
const userId = localStorage.getItem("userId");
const folderIndex = localStorage.getItem("folderIndex");
const form = JSON.parse(localStorage.getItem("form"));

const FormBot = () => {
  const { createNewFormBot, loading } = useUserStore();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Flow");
  const [formDataToSend, setFormDataToSend] = useState([]);
  const [isDisableShare, setIsDisableShare] = useState(true);
  console.log("formDataToSend >>>>>>>>>", formDataToSend);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (activeTab === "Flow")
      return <Flow setFormDataToSend={setFormDataToSend} />;
    if (activeTab === "Response") return <Response />;
  };

  const handleSave = async () => {
    if (formDataToSend.length > 0) {
      const response = await createNewFormBot(formDataToSend);
      console.log("response >>>>>>>>", response);
      if (response.status === 200) {
        toast.success("elements added");
        setIsDisableShare(false);
      }
      if (response.status === 404) {
        toast.error(response?.response?.data?.message);
      }
      if (response.status === 400) {
        toast.error(response?.response?.data?.message);
      }
    } else {
      toast.error("No elements selected yet!");
    }
  };

  const handleShare = () => {
    const url = `${shareFormUrl}form/${userId}/${folderIndex}/${form._id}`;
    copy(url);
    toast.success("Link copied");
  };
  useEffect(() => {
    if (form.elements.length > 0) {
      setIsDisableShare(false);
    }
  }, []);

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
            value={form.formName || ""}
            readOnly
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
          <button
            className={styles.sharebtn}
            disabled={isDisableShare}
            onClick={handleShare}
          >
            Share
          </button>
          <button className={styles.savebtn} onClick={handleSave}>
            {loading ? "Saving..." : " Save"}
          </button>
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
