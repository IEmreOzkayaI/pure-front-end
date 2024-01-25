import { useCallback } from "react";
import styles from "./ContextMenu.module.scss";
import { GoPencil } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";

export default function ContextMenu({ ...props }) {
  const { setNodes, setEdges, id, bottom, top, onClick } = props;

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    onClick();
  }, [id, setNodes, setEdges, onClick]);

  const handleRename = (nodeLabel) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label: nodeLabel,
          };
        }

        return node;
      })
    );
  };

  return (
    <div
      style={{ left: `${top}px`, top: `${bottom}px` }}
      className={styles.container}
    >
      <div className={styles.menu}>
        <ul className={styles["menu-list"]}>
          <li className={styles["menu-item"]}>
            <button className={styles["menu-button"]}>
              <GoPencil />
              <span>Rename</span>
            </button>
            <ul className={styles["menu-sub-list"]}>
              <li className={styles["menu-item"]}>
                <input
                  type="text"
                  className={styles["rename-input"]}
                  placeholder="Rename a Node"
                  onChange={(event) => {
                    handleRename(event.target.value);
                  }}
                />
              </li>
            </ul>
          </li>
        </ul>
        <ul className={styles["menu-list"]}>
          <li className={styles["menu-item"]}>
            <button
              className={`${styles["menu-button"]} ${styles["menu-button--delete"]}`}
              onClick={deleteNode}
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
