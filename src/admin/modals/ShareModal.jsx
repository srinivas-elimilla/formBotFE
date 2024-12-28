import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "../../styles/modal.module.css";

const ShareModal = ({ closeShareModal, workspace }) => {
  console.log("workspace >>>>>>>>>", workspace);

  const { theme } = useTheme();

  const handleDone = () => {
    // Handle folder creation logic here
    closeShareModal();
  };

  const handleCancel = () => {
    closeShareModal();
  };

  const handleFolderNameChange = () => {};

  return (
    <div
      className={`${styles.modalBackdrop} ${styles[theme]} ${styles.shareModal}`}
      onClick={closeShareModal}
    >
      <div
        className={`${styles.modal} ${styles[theme]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={closeShareModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div>
          <label className={`${styles.label} ${styles[theme]}`}>
            Invite by Email
          </label>
        </div>
        <input
          type="text"
          className={styles.folderInput}
          // value={folderName}
          onChange={handleFolderNameChange}
          placeholder="Enter email id"
        />
        <button type="submit" className={styles.inviteBtn}>
          {/* {loading ? "Logging in..." : "Log In"} */}
          Send Invite
        </button>

        <div>
          <label className={`${styles.label} ${styles[theme]}`}>
            Invite by link
          </label>
        </div>
        <button type="submit" className={styles.inviteBtn}>
          {/* {loading ? "Logging in..." : "Log In"} */}
          Copy link
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
