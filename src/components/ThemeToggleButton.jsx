import React from "react";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/togglebutton.module.css";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`${styles.toggleButton} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
      onClick={toggleTheme}
    >
      <span className={styles.circle}></span>
    </button>
  );
};

export default ThemeToggleButton;
