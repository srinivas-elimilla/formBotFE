import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "../../styles/modal.module.css";

const CreateFolderModal = ({ closeModal }) => {
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
        <button className={styles.closeBtn} onClick={closeModal}>
          X
        </button>
        <label className={styles.label}>Create New Folder</label>
        <input
          type="text"
          className={styles.folderInput}
          value={folderName}
          onChange={handleFolderNameChange}
          placeholder="Enter folder name"
        />
        <div className={styles.buttons}>
          <button className={styles.doneBtn} onClick={handleDone}>
            Done
          </button>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;
