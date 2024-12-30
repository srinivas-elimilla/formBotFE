import React, { useEffect } from "react";
import useUserStore from "../store/useUserStore";
import styles from "../styles/sharedform.module.css";

const SharedForm = () => {
  const { form, fetchFormBotById, loading } = useUserStore();
  useEffect(() => {
    fetchFormBotById();
  }, []);
  if (loading) {
    return (
      <div className={`${styles.loading}`}>
        <h1>Loading...</h1>
      </div>
    );
  }
  console.log("form >>>>>>>>>>", form);

  return (
    <div className={`${styles.sharedForm}`}>
      {form && <h1>{form?.formName}</h1>}
    </div>
  );
};

export default SharedForm;
