import { useCallback } from "react";
import styles from "./ContextMenu.module.scss";
import { GoPencil, GoGear } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";

export default function ContextMenu({ ...props }) {
  const { setNodes, setEdges, id, bottom, top, onClick, edgeType } = props;
  // if id has  ' -> ' then it is an edge
  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    onClick();
  }, [id, setNodes, setEdges, onClick]);

  const handleRename = (label) => {
    if (label === "") return;
    if (!id.includes(" -> ")) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            node.data = {
              ...node.data,
              label,
            };
          }

          return node;
        })
      );

      setEdges((edges) =>
        edges.map((edge) => {
          if (edge.source === id) {
            edge.sourceNodeLabel = label;
          }
          if (edge.target === id) {
            edge.targetNodeLabel = label;
          }
          return edge;
        })
      );
    } else {
      setEdges((edges) =>
        edges.map((edge) => {
          if (edge.id === id) {
            edge = {
              ...edge,
              label,
            };
          }
          return edge;
        })
      );
    }
  };

  const handleEdgeType = (evt) => {
    console.log(evt.target.value);
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === id) {
          edge = {
            ...edge,
            animated: evt.target.value === "Dashed",
          };
        }
        return edge;
      })
    );
  };
  return (
    <div
      style={{ left: `${top}px`, top: `${bottom}px` }}
      className={styles.container}
    >
      <div className={styles.menu}>
        {id.includes(" -> ") ? (
          <>
            <ul className={styles["menu-list"]}>
              <li className={styles["menu-item"]}>
                <button className={styles["menu-button"]}>
                  <GoPencil />
                  <span>Add Label</span>
                </button>
                <ul className={styles["menu-sub-list"]}>
                  <li className={styles["menu-item"]}>
                    <input
                      type="text"
                      className={styles["rename-input"]}
                      onChange={(event) => {
                        handleRename(event.target.value.trim());
                      }}
                    />
                  </li>
                </ul>
              </li>
            </ul>
            <ul className={styles["menu-list"]}>
              <li className={styles["menu-item"]}>
                <button className={styles["menu-button"]}>
                  <GoGear />
                  <span>Change Edge Type</span>
                </button>
                <ul className={styles["menu-sub-list"]}>
                  <li className={styles["menu-item"]}>
                    <select value={edgeType} onChange={handleEdgeType}>
                      <option value="Solid">Solid &rarr;</option>
                      <option value="Dashed">Dashed &larr;</option>
                    </select>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        ) : (
          <>
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
                        handleRename(event.target.value.trim());
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
          </>
        )}
      </div>
    </div>
  );
}
