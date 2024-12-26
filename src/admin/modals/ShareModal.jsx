import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "../../styles/modal.module.css";

const ShareModal = ({ closeModal }) => {
  const { theme } = useTheme();

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
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div>
          <label className={`${styles.label} ${styles[theme]}`}>
            Invite by Email
          </label>
        </div>
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

export default ShareModal;
