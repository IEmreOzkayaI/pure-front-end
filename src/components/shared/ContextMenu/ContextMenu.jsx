import styles from "./ContextMenu.module.scss";
import { GoPencil } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";

export default function ContextMenu({ position }) {
  return (
    <div
      className={styles.container}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className={styles.menu}>
        <ul className={styles["menu-list"]}>
          <li className={styles["menu-item"]}>
            <button className={styles["menu-button"]}>
              <GoPencil />
              <span>Rename</span>
            </button>
          </li>
        </ul>
        <ul className={styles["menu-list"]}>
          <li className={styles["menu-item"]}>
            <button
              className={`${styles["menu-button"]} ${styles["menu-button--delete"]}`}
            >
              <FiTrash2 />
              <span>Delete</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
