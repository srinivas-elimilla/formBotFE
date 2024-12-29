import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "../../styles/modal.module.css";
import useUserStore from "../../store/useUserStore";
import toast from "react-hot-toast";

const CommonModal = ({
  closeModal,
  label,
  placeholder,
  isConfirmBtn,
  type,
  id,
  folderIndex,
}) => {
  const [name, setName] = useState("");
  const { theme } = useTheme();
  const {
    getAllWorkspaces,
    createNewFolder,
    createNewForm,
    deleteFolder,
    deleteForm,
    loading,
  } = useUserStore();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDone = async () => {
    if (type === "folder") {
      try {
        const response = await createNewFolder(name);
        if (response.status === 500) {
          toast.error(response?.response?.data?.message || "Server error");
        } else if (response.status === 400) {
          toast.error(
            response?.response?.data?.message || "Something wrong!, try again."
          );
        } else if (response.status === 201) {
          toast.success(response?.data?.message || "folder created");
          closeModal();
          getAllWorkspaces(localStorage.getItem("userId"));
        }
      } catch (error) {
        toast.error("something wrong!");
      }
    } else {
      try {
        const response = await createNewForm(name, folderIndex);
        if (response.status === 500) {
          toast.error(response?.response?.data?.message || "Server error");
        } else if (response.status === 400) {
          toast.error(
            response?.response?.data?.message || "Something wrong!, try again."
          );
        } else if (response.status === 201) {
          toast.success(response?.data?.message || "form created");
          closeModal();
        }
      } catch (error) {
        toast.error("something wrong!");
      }
    }
  };
  const handleConfirm = async () => {
    if (id && type) {
      if (type === "folder") {
        try {
          const response = await deleteFolder(id);
          console.log("res >>>>>>", response);
          if (response.status === 500) {
            toast.error(response?.response?.data?.message || "Server error");
          } else if (response.status === 400) {
            toast.error(
              response?.response?.data?.message ||
                "Something wrong!, try again."
            );
          } else if (response.status === 200) {
            toast.success(response?.data?.message || "folder deleted");
            closeModal();
          }
        } catch (error) {
          toast.error("something wrong!");
        }
      } else {
        try {
          const response = await deleteForm(folderIndex, id);
          console.log("res >>>>>>", response);
          if (response.status === 500) {
            toast.error(response?.response?.data?.message || "Server error");
          } else if (response.status === 400) {
            toast.error(
              response?.response?.data?.message ||
                "Something wrong!, try again."
            );
          } else if (response.status === 200) {
            toast.success(response?.data?.message || "form deleted");
            closeModal();
          }
        } catch (error) {
          toast.error("something wrong!");
        }
      }
    }
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
            value={name}
            onChange={handleNameChange}
            placeholder={placeholder}
          />
        )}
        <div className={styles.buttons}>
          {isConfirmBtn ? (
            <button className={styles.doneBtn} onClick={handleConfirm}>
              Confirm
            </button>
          ) : (
            <button className={styles.doneBtn} onClick={handleDone}>
              Done
            </button>
          )}
          <button className={styles.doneBtn} onClick={handleDone}></button>
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

export default CommonModal;
