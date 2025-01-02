import React, { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import styles from "../styles/sharedform.module.css";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import send from "../assets/send.svg";
import { useTheme } from "../context/ThemeContext";

const SharedForm = () => {
  const { theme } = useTheme();
  const params = useParams();
  const { formData, fetchFormBotById, loading, elements, setElemetsData } =
    useUserStore();
  const [answer, setAnswer] = useState("");

  // const currInputIndex = elements.find(
  //   (ele) => ele.type === "input" && !ele.type
  // );

  const handleInputChange = (id, value) => {
    setAnswer(value);
  };

  const handleSend = (id) => {
    const setEle = elements.map((ele) => {
      if (ele._id === id) {
        return { ...ele, value: answer };
      }
      return ele;
    });
    setElemetsData(setEle);
    setAnswer("");
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

  const currInputIndex = elements.findIndex((ele) => {
    return ele.type === "input" && !ele.value;
  });
  // const elements = formData.form.elements;
  // console.log("ele >>>>>>>>>>.", elements);
  console.log("currInputIndex >>>>>>>>>>.", currInputIndex);

  return (
    <div className={styles.formContainer}>
      <div className={styles.sharedForm}>
        {elements.map((element, index) => {
          return (
            (index <= currInputIndex || currInputIndex === -1) && (
              <div key={index} className={styles.bubble}>
                <div style={{ margin: "1rem" }}>
                  {(element.type === "bubble" ||
                    (element.type === "input" && element.value)) &&
                    (element.value.startsWith("http") ? (
                      <img
                        src={element.value}
                        alt="Bubble"
                        style={{ maxWidth: "100%" }}
                      />
                    ) : (
                      <div className={styles.logImage}>
                        <img src={logo} alt="admin" />
                        <p className={`${styles.logImage} ${theme}`}>
                          {element.value}
                        </p>
                      </div>
                    ))}
                </div>

                {element.type === "input" && !element.value && (
                  <div className={styles.inputSendDiv}>
                    <input
                      value={answer || ""}
                      placeholder={
                        element.placeholder.includes("text")
                          ? "Enter your text"
                          : element.placeholder.includes("phone")
                          ? "Enter your phone"
                          : element.placeholder.includes("number")
                          ? "Enter a number"
                          : element.placeholder.includes("email")
                          ? "Enter your email"
                          : "Select a date"
                      }
                      type={
                        element.placeholder.includes("text")
                          ? "text"
                          : element.placeholder.includes("phone")
                          ? "phone"
                          : element.placeholder.includes("number")
                          ? "number"
                          : element.placeholder.includes("email")
                          ? "email"
                          : "date"
                      }
                      onChange={(e) =>
                        handleInputChange(element._id, e.target.value)
                      }
                      className={`${styles.inputField} ${styles[theme]}`}
                    />

                    <button
                      onClick={() => handleSend(element._id)}
                      className={styles.nextButton}
                    >
                      <img src={send} alt="send" />
                    </button>
                  </div>
                )}
              </div>
            )
          );
        })}
        <div className={styles.navigationButtons}>
          {currInputIndex === -1 && (
            <button className={styles.completedButton}>Form Completed!</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedForm;
