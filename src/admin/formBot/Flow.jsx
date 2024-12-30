import React, { useEffect, useState } from "react";
import styles from "../../styles/flow.module.css";
import { useTheme } from "../../context/ThemeContext";

const Flow = ({ setFormDataToSend }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState({});

  const handleAddElement = (type, placeholder) => {
    if (formData.length > 0) {
      const lastElement = formData[formData.length - 1];

      if (!lastElement.value && lastElement.type === "bubble") {
        setError({ id: lastElement.id, message: "Required field." });
        return;
      }
    }
    setError({});
    setFormData([
      ...formData,
      { id: Date.now(), type, placeholder, value: "" },
    ]);
  };

  const handleInputChange = (id, value) => {
    setFormData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
    if (error.id === id) {
      setError({});
    }
  };

  const handleDeleteElement = (id) => {
    setFormData((prev) => prev.filter((item) => item.id !== id));
    if (error.id === id) {
      setError({});
    }
  };

  useEffect(() => {
    setFormDataToSend(formData);
  }, [formData]);

  return (
    <div className={`${styles.flowContainer}`}>
      {/* Sidebar */}
      <div className={`${styles.sidebtns} ${styles[`${theme}`]}`}>
        <div className={`${styles.bubbles}`}>
          <h6>Bubbles</h6>
          <div className={`${styles.bubblebtns} ${styles[`${theme}`]}`}>
            <button onClick={() => handleAddElement("bubble", "Add a text")}>
              <i className="fa-regular fa-message"></i> Text
            </button>
            <button
              onClick={() => handleAddElement("bubble", "Add an image link")}
            >
              <i className="fa-regular fa-image"> </i> Image
            </button>
            <button
              onClick={() => handleAddElement("bubble", "Add a video link")}
            >
              <i className="fa-solid fa-film"></i> Video
            </button>
            <button
              onClick={() => handleAddElement("bubble", "Add a GIF link")}
            >
              <i className="fa-solid fa-gif"></i> GIF
            </button>
          </div>
        </div>
        <div className={`${styles.inputs}`}>
          <h6>Inputs</h6>
          <div className={`${styles.inputbtns} ${styles[`${theme}`]}`}>
            <button
              onClick={() =>
                handleAddElement("input", "Hint: User will enter text")
              }
            >
              <i className="fa-solid fa-text-width"></i> Text
            </button>
            <button
              onClick={() =>
                handleAddElement("input", "Hint: User will enter number")
              }
            >
              <i className="fa-solid fa-hashtag"></i> Number
            </button>
            <button
              onClick={() =>
                handleAddElement("input", "Hint: User will enter email")
              }
            >
              <i className="fa-regular fa-envelope"></i> Email
            </button>
            <button
              onClick={() =>
                handleAddElement("input", "Hint: User will enter phone number")
              }
            >
              <i className="fa-solid fa-phone"></i> Phone
            </button>
            <button
              onClick={() =>
                handleAddElement("input", "Hint: User will enter date")
              }
            >
              <i className="fa-regular fa-calendar"></i> Date
            </button>
            <button
              onClick={() =>
                handleAddElement("input", "Hint: User will rate something")
              }
            >
              <i className="fa-regular fa-star"></i> Rating
            </button>
            <button
              onClick={() =>
                handleAddElement("input", "Hint: User will click button")
              }
            >
              <i className="fa-solid fa-square"></i> Button
            </button>
          </div>
        </div>
      </div>
      {/* Content Area */}
      <div className={`${styles.elements} ${styles[theme]}`}>
        <button>
          <i className="fa-brands fa-font-awesome"> </i> Start
        </button>
        {formData.map((item) => (
          <div
            key={item.id}
            className={`${styles[item.type]} ${styles[theme]}`}
          >
            <div>
              <h6>{item.type === "bubble" ? "Bubble" : "Input"}</h6>
              <i
                className="fa-solid fa-trash-can"
                style={{ color: "#FF2C62", cursor: "pointer" }}
                onClick={() => handleDeleteElement(item.id)}
              ></i>
            </div>

            {item.type === "bubble" ? (
              <>
                <input
                  type="text"
                  placeholder={item.placeholder}
                  value={item.value}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  required
                  style={{
                    border: error.id === item.id ? "1px solid #f55050" : "none",
                  }}
                />
                {error.id === item.id && (
                  <p className={styles.error}>{error.message}</p>
                )}
              </>
            ) : (
              <input
                type="text"
                placeholder={item.placeholder}
                value={item.value}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
                required
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flow;
