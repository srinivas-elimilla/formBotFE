import React from "react";
import styles from "../styles/home.module.css";
import logo from "../../public/logo.png";
import triangle from "../../src/assets/triangle.png";
import semicircle from "../../src/assets/semicircle.png";
import heroImage from "../../src/assets/heroImage.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.container}`}>
      {/* Nav bar */}
      <div className={`${styles.navbar}`}>
        <div className={`${styles.logo}`}>
          <img src={logo} alt="logo" />
          <h1>FormBot</h1>
        </div>
        <div className={`${styles.btns}`}>
          <button
            className={`${styles.signin}`}
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
          <button className={`${styles.formbot}`}>Create a FormBot</button>
        </div>
      </div>

      {/* Hero section */}
      <div className={`${styles.herosection}`}>
        <div>
          <img src={triangle} alt="triangle" />
          <div className={`${styles.heroheading}`}>
            <div>
              <h1>Build advanced chatbots</h1>
              <h1>visually</h1>
            </div>
            <div>
              <p>
                Typebot gives you powerful blocks to create unique chat
                experiences. Embed them
              </p>
              <p>
                anywhere on your web/mobile apps and start collecting results
                like magic.
              </p>
            </div>
            <button className={`${styles.formbot} ${styles.herobtn}`}>
              Create a FormBot for free
            </button>
          </div>
          <img src={semicircle} alt="semicircle" />
        </div>

        <div className={`${styles.heroImage}`}>
          <div></div>
          <img src={heroImage} alt="hero-image" />
          <div></div>
        </div>
      </div>

      {/* Footer */}
      <div className={`${styles.footer}`}>
        <div className={`${styles.logosection}`}>
          <div className={`${styles.logo}`}>
            <img src={logo} alt="logo" />
            <h1>FormBot</h1>
          </div>
          <div>
            <span>Made with ❤️ by @cuvette</span>
            <p>@cuvete</p>
          </div>
        </div>
        <div>
          <h1>Product</h1>
          <div>
            <p>
              Status <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              Documentation{" "}
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              Roadmap <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              Pricing <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
          </div>
        </div>
        <div>
          <h1>Community</h1>
          <div>
            <p>
              Discord <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              Documentation{" "}
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              GitHub repository{" "}
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              Twitter <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              LinkedIn{" "}
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              OSS Friends{" "}
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
          </div>
        </div>
        <div>
          <h1>Company</h1>
          <div>
            <p>
              About <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              Contact <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              Terms of Service{" "}
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
            <p>
              Privacy Policy{" "}
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
