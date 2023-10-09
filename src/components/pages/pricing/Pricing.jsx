import { useEffect, useState } from "react";
import Navbar from "../root/Navbar/Navbar";
import Footer from "../root/Footer/Footer";
import styles from "./Pricing.module.scss";

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <>
      <div className={styles.pricing}>
        <Navbar />
        <div className={styles.grayBackground}>
          <div className={styles.tabs}>
            <div
              className={`${styles.text} ${
                activeTab === "company" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("company")}
            >
              Company
            </div>
            <div
              className={`${styles.text} ${
                activeTab === "user" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("user")}
            >
              User
            </div>
          </div>
          <div>select plan that scale with you</div>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="0"
              max="40"
              defaultValue="9"
              className={styles.slider}
            />
            <ul>
              <li>0</li>
              <li>10</li>
              <li>20</li>
              <li>30</li>
              <li>40</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}
