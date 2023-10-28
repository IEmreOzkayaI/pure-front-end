import styles from "./Modal.module.scss";
import PropTypes from "prop-types";

export default function Modal({ isOpen, children, dark }) {
  return (
    <div className={`${styles.modal}`}>
      {isOpen && (
        <div
          className={`${styles.modalContent} ${
            dark ? styles.dark : styles.white
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,

  dark: PropTypes.bool.isRequired,
};
