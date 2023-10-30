import { useEffect, useState } from "react";
import Navbar from "../root/Navbar/Navbar";
import Footer from "../root/Footer/Footer";
import styles from "./Pricing.module.scss";
import RangeSlider from "../../shared/RangeSlider/RangeSlider";
import Card from "../../shared/Card/Card";
import { useLocation } from "react-router-dom";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
];

export default function Pricing() {
  const location = useLocation();
  const user = new URLSearchParams(location.search).get("user");
  const [activeTab, setActiveTab] = useState(user || "company");
  const [sliderValue, setSliderValue] = useState(10);
  useEffect(() => {
    window.scrollTo({
      top: document.getElementById("pricing").offsetTop,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className={styles.pricing} id="pricing">
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
            <RangeSlider
              marks={marks}
              setSliderValue={setSliderValue}
              sliderValue={sliderValue}
            />
          </div>
          <Card
            order={1}
            title="demo"
            user={activeTab}
            sliderValue={sliderValue}
            explanation="Get our starter plan for getting your scale services."
          />
          <Card
            dark
            title="monthly"
            order={2}
            user={activeTab}
            sliderValue={sliderValue}
            explanation="Get our starter plan for getting your scale services."
          />
          <Card
            title="yearly"
            order={3}
            user={activeTab}
            sliderValue={sliderValue}
            explanation="Get our starter plan for getting your scale services."
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}
