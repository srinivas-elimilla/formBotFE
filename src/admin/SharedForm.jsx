import React, { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import styles from "../styles/sharedform.module.css";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";

const SharedForm = () => {
  const params = useParams();
  const { formData, fetchFormBotById, loading } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showNext, setShowNext] = useState(false);

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentIndex < formData.form.elements.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowNext(false);
    }
  };

  useEffect(() => {
    fetchFormBotById(params.userId, params.folderIndex, params.formId);
  }, []);

  if (loading) {
    return (
      <div className={`${styles.loading}`}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!formData?.form?.elements?.length) {
    return (
      <div>
        <h1>No Questions Available</h1>
      </div>
    );
  }

  const elements = formData.form.elements;

  return (
    <div className={styles.formContainer}>
      <div className={styles.sharedForm}>
        {elements.map((element, index) => (
          <div key={index} className={styles.bubble}>
            <div style={{ margin: "1rem" }}>
              {element.type === "bubble" &&
                (element.value.startsWith("http") ? (
                  <img
                    src={element.value}
                    alt="Bubble"
                    style={{ maxWidth: "100%" }}
                  />
                ) : (
                  <div className={styles.logImage}>
                    <img src={logo} alt="admin" />
                    <p>{element.value}</p>
                  </div>
                ))}
            </div>

            {elements[currentIndex]?.type === "input" && (
              <div className={styles.inputSendDiv}>
                <input
                  value={answers[elements[currentIndex]._id] || ""}
                  placeholder={
                    elements[currentIndex].placeholder.includes("text")
                      ? "Enter your text"
                      : elements[currentIndex].placeholder.includes("phone")
                      ? "Enter your phone"
                      : elements[currentIndex].placeholder.includes("number")
                      ? "Enter a number"
                      : elements[currentIndex].placeholder.includes("email")
                      ? "Enter your email"
                      : "Select a date"
                  }
                  type={
                    elements[currentIndex].placeholder.includes("text")
                      ? "text"
                      : elements[currentIndex].placeholder.includes("phone")
                      ? "phone"
                      : elements[currentIndex].placeholder.includes("number")
                      ? "number"
                      : elements[currentIndex].placeholder.includes("email")
                      ? "email"
                      : "date"
                  }
                  onChange={(e) =>
                    handleInputChange(
                      elements[currentIndex]._id,
                      e.target.value
                    )
                  }
                  className={styles.inputField}
                />
                {currentIndex < elements.length - 1 && (
                  <button
                    onClick={handleNext}
                    className={styles.nextButton}
                    disabled={
                      elements[currentIndex].type === "input" &&
                      !answers[elements[currentIndex]._id]
                    }
                  >
                    {elements[currentIndex].type === "input" ? "Send" : "Next"}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <div className={styles.navigationButtons}>
          {currentIndex === elements.length - 1 && (
            <button className={styles.completedButton}>Form Completed!</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedForm;
