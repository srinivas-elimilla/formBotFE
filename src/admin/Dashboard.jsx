import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import CommonModal from "./modals/CommonModal";
import styles from "../styles/dashboard.module.css";
import ThemeToggleButton from "../components/ThemeToggleButton";
import ShareModal from "./modals/ShareModal";
import toast from "react-hot-toast";
import { useUpdateSettings } from "../store/settingsStore";
import useUserStore from "../store/useUserStore";

const Dashboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isCommonModalOpen, setIsCommonModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeFolderIndex, setActiveFolderIndex] = useState(null);
  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [type, setType] = useState("");
  const [idToDelete, setIdToDelete] = useState(null);
  const [isConfirmBtn, setIsConfirmBtn] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState({});

  const { user, workspaces, getAllWorkspaces } = useUserStore();
  console.log("user >>>>>>", user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    } else {
      getAllWorkspaces();
    }
  }, []);

  const openModal = (label, placeholder, isConfirmBtn, type, id) => {
    setLabel(label);
    setPlaceholder(placeholder);
    setIsConfirmBtn(isConfirmBtn);
    setType(type);
    setIdToDelete(id);
    setIsCommonModalOpen(true);
  };
  const closeModal = () => setIsCommonModalOpen(false);

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };
  const closeShareModal = () => setIsShareModalOpen(false);

  const handleFolderClick = (index) => {
    setActiveFolderIndex(index === activeFolderIndex ? null : index);
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Logout") {
      localStorage.removeItem("token");
      navigate("/");
    } else if (selectedValue === "Settings") {
      navigate("/dashboard/settings");
    }
  };

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
            value={selectedWorkspace?.name}
            onChange={handleOptionChange}
            style={{
              backgroundColor: theme === "dark" ? "#121212" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#47474a",
            }}
          >
            {workspaces &&
              workspaces?.map((workspace, index) => (
                <option
                  key={index}
                  value={workspace?.name || ""}
                  style={{
                    color: theme === "dark" ? "#ffffff" : "#47474a",
                  }}
                  defaultValue={workspace?.name || ""}
                >
                  {`${workspace?.name || "Guest"}'s Workspace`}
                </option>
              ))}
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
          <button className={`${styles.sharebtn}`} onClick={openShareModal}>
            Share
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={`${styles.subcontent}`}>
          <div className={`${styles.createFolderBtns}`}>
            <div
              onClick={() =>
                openModal(
                  "Create New Folder",
                  "Enter folder name",
                  false,
                  "folder"
                )
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
            {user &&
              user?.workspace?.folders?.map((folder, index) => (
                <div
                  className={`${styles.createFolderBtn} ${
                    activeFolderIndex === index ? styles.whitebg : styles.darkbg
                  }`}
                  key={index}
                  onClick={() => handleFolderClick(index)}
                >
                  {theme === "dark" ? (
                    folder.folderName
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
                      {folder.folderName}
                    </span>
                  )}
                  <i
                    className="fa-solid fa-trash-can"
                    style={{ color: "#FF2C62" }}
                    onClick={() =>
                      openModal(
                        "Are you sure you want to delete this folder ?",
                        "",
                        true,
                        "folder",
                        folder._id
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
                openModal("Create New Form", "Enter form name", false, "form")
              }
            >
              <i
                className={`fa-thin fa-plus ${styles.addtypeboticon}`}
                style={{ color: "#FFFFFF" }}
              ></i>
              Create a typebot
            </div>
            {user &&
              user?.workspace?.folders?.[activeFolderIndex]?.forms?.map(
                (form, index) => (
                  <div
                    className={`${styles.createFormBtn}`}
                    key={index}
                    // onClick={() => handleNavigateToForm(form)}
                  >
                    <span
                      style={{
                        color: theme === "light" ? "#000000" : "#FFFFFF",
                      }}
                    >
                      {form?.formName || "New Form"}
                    </span>
                    <i
                      className="fa-solid fa-trash-can"
                      style={{ color: "#FF2C62" }}
                      onClick={() =>
                        openModal(
                          "Are you sure you want to delete this Form ?",
                          "",
                          true,
                          "form",
                          form._id
                        )
                      }
                    ></i>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
      {isCommonModalOpen && (
        <CommonModal
          closeModal={closeModal}
          label={label}
          placeholder={placeholder}
          isConfirmBtn={isConfirmBtn}
          type={type}
          id={idToDelete}
          folderIndex={activeFolderIndex}
        />
      )}
      {isShareModalOpen && (
        <ShareModal
          closeShareModal={closeShareModal}
          workspace={selectedWorkspace}
        />
      )}
    </div>
  );
};

export default Dashboard;
