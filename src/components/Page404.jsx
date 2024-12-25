import React from "react";
import styles from "../styles/page404.module.css";

const Page404 = () => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Page not found!</p>
      <button
        className={styles.btn}
        onClick={() => (window.location.href = "/")}
      >
        Back to Home
      </button>
      <div className={styles.semicircle1}></div>
      <div className={styles.semicircle2}></div>
    </div>
  );
};

export default Page404;
