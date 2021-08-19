import logo from "../assets/logo.png";
import styles from "./FinalPage.module.css";
import React from "react";

export function FinalPage() {
  return (
    <div className="App">
      <header className="App-header">
        <div className={styles["block"]}>
          <img src={logo} className={styles.logo} alt="logo" />
          <p className={styles.paragraph}>Thank you for using Eats!</p>
          <div className={styles["parent-block"]}>
            <a
              className={styles.restart}
              href="https://eatsapp-7aa6b.web.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Retake ↻
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
