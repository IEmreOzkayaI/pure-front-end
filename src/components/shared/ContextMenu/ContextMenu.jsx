import styles from "./ContextMenu.module.scss";
import { GoPencil } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";
import { useCallback } from "react";

export default function ContextMenu({
  position,
  targetNodeId,
  setNodes,
  setEdges,
}) {
  const handleRename = (nodeLabel) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === targetNodeId) {
          node.data = {
            ...node.data,
            label: nodeLabel,
          };
        }

        return node;
      })
    );
  };
  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== targetNodeId));
    setEdges((edges) => edges.filter((edge) => edge.source !== targetNodeId));
  }, [setNodes, setEdges, targetNodeId]);

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
