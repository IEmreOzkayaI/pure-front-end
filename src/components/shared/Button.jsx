import PropTypes from "prop-types";
import styles from "./Button.module.scss";

export default function Button(props) {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[`${props.className}`]}`}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
