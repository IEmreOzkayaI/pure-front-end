import styles from "./Modal.module.scss";
import PropTypes from "prop-types";

export default function Modal({ isOpen, children, dark, closeModal, title }) {
  return (
    <>
      {isOpen && (
        <div className={`${styles.modal}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={() => closeModal(title.toLowerCase())}
          >
            <path
              d="M2 2L22 22M22 2L2 22"
              stroke={`${dark ? "#fff" : "#16161B"}`}
              strokeOpacity="0.5"
              strokeWidth="3"
            />
          </svg>
          <div
            className={`${styles.modalContent} ${
              dark ? styles.dark : styles.white
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  dark: PropTypes.bool.isRequired,
};
