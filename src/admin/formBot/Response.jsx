import React from "react";
import styles from "../../styles/response.module.css";
import { useTheme } from "../../context/ThemeContext";
import CompletionChart from "./CompletionChart";

const Response = () => {
  const { theme } = useTheme();
  const totalTasks = 100;
  const completedTasks = 70;
  return (
    <div className={`${styles.response}`}>
      <div className={`${styles.counts} ${styles[theme]}`}>
        <div>
          <p>Views</p>
          <p>6</p>
        </div>
        <div>
          <p>Starts</p>
          <p>6</p>
        </div>
      </div>
      <div className={`${styles.table}`}></div>
      <div className={`${styles.chart}`}>
        <CompletionChart completed={completedTasks} total={totalTasks} />
      </div>
    </div>
  );
};

export default Response;
