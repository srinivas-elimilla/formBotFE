import React, { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import styles from "../styles/sharedform.module.css";
import { useParams } from "react-router-dom";

const SharedForm = () => {
  const params = useParams();
  const { formData, fetchFormBotById, loading } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentIndex < formData?.form?.elements.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchFormBotById(params.userId, params.folderIndex, params.formId);
  }, [fetchFormBotById, params.userId, params.folderIndex, params.formId]);

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

  return (
    <div className={styles.formContainer}>
      {formData.form.elements.map((question, index) => {
        console.log(index, currentIndex);

        if (index > currentIndex) return null;

        return (
          <div key={question._id} style={{ marginBottom: "20px" }}>
            {question.type === "bubble" && (
              <div>
                {question.value.startsWith("http") ? (
                  <img
                    src={question.value}
                    alt="Bubble"
                    style={{ maxWidth: "100%" }}
                  />
                ) : (
                  <p>{question.value}</p>
                )}
                <small>{question.placeholder}</small>
              </div>
            )}
            {question.type === "input" && index === currentIndex && (
              <div>
                <input
                  type="text"
                  placeholder={question.placeholder}
                  value={answers[question._id] || ""}
                  onChange={(e) =>
                    handleInputChange(question._id, e.target.value)
                  }
                  className={styles.inputField}
                />
                <button
                  onClick={handleNext}
                  disabled={!answers[question._id]?.trim()}
                  className={styles.nextButton}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        );
      })}
      {currentIndex >= formData.form.elements.length && (
        <p className={styles.completedMessage}>Form Completed!</p>
      )}
    </div>
  );
};

export default SharedForm;
