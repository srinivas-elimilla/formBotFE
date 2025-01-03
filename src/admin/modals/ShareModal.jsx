import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useUserStore from "../../store/useUserStore";
import styles from "../../styles/modal.module.css";
import { apiUrl } from "../../store/apiService";
import toast from "react-hot-toast";

const ShareModal = ({ closeShareModal, workspace }) => {
  const { theme } = useTheme();
  const { shareWorkspace, loading } = useUserStore();
  const [mode, setMode] = useState("");
  const [email, setEmail] = useState("");

  const handleModeSelect = (e) => {
    setMode(e.target.value);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendInvite = async () => {
    if (!email || !mode) {
      toast.error("Please enter an email");
      return;
    }

    try {
      const response = await shareWorkspace(workspace.userId, email, mode);
      if (response?.status === 200) {
        toast.success("Invite sent successfully!");
        setEmail("");
        setMode("");
        closeShareModal();
      } else {
        toast.success("Failed to send invite.");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      toast.success("An error occurred while sending the invite.");
    }
  };

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label className={`${styles.label} ${styles[theme]}`}>
            Invite by Email
          </label>
          <select
            onChange={handleModeSelect}
            value={mode}
            className={`${styles.label} ${styles[theme]}`}
            style={{ fontSize: "1rem" }}
          >
            <option value="edit">Edit</option>
            <option value="view">View</option>
          </select>
        </div>
        <input
          type="email"
          className={styles.folderInput}
          value={email}
          onChange={handleChange}
          placeholder="Enter email id"
        />
        <button
          type="submit"
          className={styles.inviteBtn}
          onClick={handleSendInvite}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Invite"}
        </button>

        <div>
          <label className={`${styles.label} ${styles[theme]}`}>
            Invite by link
          </label>
        </div>
        <button
          type="submit"
          className={styles.inviteBtn}
          onClick={() => {
            navigator.clipboard.writeText(`${apiUrl}/share/${workspace.id}`);
            toast.success("Link copied to clipboard!");
          }}
        >
          Copy link
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
