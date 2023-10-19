import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.scss";
import Modal from "./Modal";
import Button from "./Button";

export default function Card(props) {
  const { dark, title, order, user, sliderValue, explanation } = props;
  const [price, setPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const calculatePrice = () => {
      if (user === "company") {
        if (title === "monthly") {
          setPrice(sliderValue * 25);
        } else if (title === "yearly") {
          setPrice(sliderValue * 250);
        } else {
          setPrice(0);
        }
      } else {
        if (title === "monthly") {
          setPrice(sliderValue * 10);
        } else if (title === "yearly") {
          setPrice(sliderValue * 100);
        } else {
          setPrice(0);
        }
      }
    };
    calculatePrice();
  }, [sliderValue, user, title]);

  return (
    <div
      className={`${styles.card} ${dark ? styles.dark : styles.white} ${
        order ? styles[`order-${order}`] : ""
      }`}
    >
      <div className={`${styles.title} ${dark ? styles.dark : styles.white}`}>
        {title}
      </div>
      <div className={`${styles.price} ${dark ? styles.dark : styles.white}`}>
        ${price}
      </div>
      <div
        className={`${styles.explanation} ${dark ? styles.dark : styles.white}`}
      >
        {explanation}
      </div>

      <div className={styles.perks}>
        <ul className={`${dark ? styles.dark : styles.white}`}>
          <li>lorem ipsum</li>
          <li>lorem ipsum</li>
          <li>lorem ipsum</li>
          <li>lorem ipsum</li>
        </ul>
      </div>
      <div className={styles.svg}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.95471 5.51802C2.00986 5.46272 2.07538 5.41885 2.14752 5.38892C2.21965 5.35899 2.29699 5.34358 2.37508 5.34358C2.45318 5.34358 2.53051 5.35899 2.60265 5.38892C2.67478 5.41885 2.74031 5.46272 2.79546 5.51802L9.50008 12.2238L16.2047 5.51802C16.3162 5.40653 16.4674 5.34389 16.6251 5.34389C16.7828 5.34389 16.934 5.40653 17.0455 5.51802C17.1569 5.62951 17.2196 5.78072 17.2196 5.93839C17.2196 6.09606 17.1569 6.24728 17.0455 6.35877L9.92046 13.4838C9.86531 13.5391 9.79978 13.5829 9.72765 13.6129C9.65551 13.6428 9.57818 13.6582 9.50008 13.6582C9.42199 13.6582 9.34466 13.6428 9.27252 13.6129C9.20039 13.5829 9.13486 13.5391 9.07971 13.4838L1.95471 6.35877C1.89942 6.30361 1.85555 6.23809 1.82561 6.16596C1.79568 6.09382 1.78027 6.01649 1.78027 5.93839C1.78027 5.86029 1.79568 5.78296 1.82561 5.71083C1.85555 5.63869 1.89942 5.57317 1.95471 5.51802Z"
            fill={dark ? "#f5f3f3" : "#16161B"}
          />
        </svg>
      </div>
      <div className={styles.choosePlanContainer}>
        <div
          className={`${styles.choosePlan} ${
            dark ? styles.dark : styles.white
          }`}
          onClick={openModal}
        >
          <div className={`${dark ? styles.dark : styles.white}`}>
            Choose plan
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title={title}
          price={price}
          explanation={explanation}
          dark={dark}
        >
          <div>
            <div>
              <div
                className={`${styles.title} ${
                  dark ? styles.dark : styles.white
                }`}
              >
                {title}
              </div>
              <div
                className={`${styles.price} ${
                  dark ? styles.dark : styles.white
                }`}
              >
                ${price}
              </div>
              <div
                className={`${styles.explanation} ${
                  dark ? styles.dark : styles.white
                }`}
                style={{ textAlign: "center" }}
              >
                {explanation}
              </div>
              {/* TODO text color siyah veya beyaz olsun */}
              <div>
                <ul
                  style={{ listStyle: "disc", fontSize: "1.2rem" }}
                  className={`${dark ? styles.dark : styles.white}`}
                >
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliquat enim ad minim veniam.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliquat enim ad minim veniam.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliquat enim ad minim veniam.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliquat enim ad minim veniam.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliquat enim ad minim veniam.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliquat enim ad minim veniam.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliquat enim ad minim veniam.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliquat enim ad minim veniam.
                  </li>
                </ul>
              </div>
              <div className={styles.buttonContainer}>
                <div className={styles.terms}>
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms">
                    I&apos;ve read and agree to the
                    {/* TODO linke cevir span i */}
                    {/* TODO BLACK ISE WHITE COLOR OLSUN */}
                    <span> privacy policy and PDPA</span>
                  </label>
                </div>

                <Button onClick={closeModal}>Choose Plan</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

//define proptypes
Card.propTypes = {
  dark: PropTypes.bool,
  title: PropTypes.string,
  order: PropTypes.number,
  user: PropTypes.string,
  sliderValue: PropTypes.number,
  explanation: PropTypes.string,
};
