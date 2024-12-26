import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "../../styles/modal.module.css";

const CreateFolderModal = ({
  closeModal,
  label,
  placeholder,
  isConfirmBtn,
}) => {
  const [folderName, setFolderName] = useState("");
  const { theme } = useTheme();

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleDone = () => {
    // Handle folder creation logic here
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div
      className={`${styles.modalBackdrop} ${styles[theme]}`}
      onClick={closeModal}
    >
      <div
        className={`${styles.modal} ${styles[theme]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <label className={`${styles.label} ${styles[theme]}`}>{label}</label>
        {placeholder && (
          <input
            type="text"
            className={styles.folderInput}
            value={folderName}
            onChange={handleFolderNameChange}
            placeholder={placeholder}
          />
        )}
        <div className={styles.buttons}>
          <button className={styles.doneBtn} onClick={handleDone}>
            {isConfirmBtn ? "Confirm" : "Done"}
          </button>
          <div
            className={`${styles.cancelBtn} ${styles[theme]}`}
            onClick={handleCancel}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;
