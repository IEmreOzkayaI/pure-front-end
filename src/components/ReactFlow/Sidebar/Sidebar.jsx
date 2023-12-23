import styles from "./Sidebar.module.scss";

export default function SideBar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.description}>
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className={`${styles.dndnode} ${styles.actionStateNode}`}
        onDragStart={(event) => onDragStart(event, "actionStateNode")}
        draggable
      >
        Action State
      </div>

      <div
        className={`${styles.dndnode} ${styles.actor}`}
        onDragStart={(event) => onDragStart(event, "actorNode")}
        draggable
      >
        <span className={styles.text}>Actor</span>
      </div>
      <div className={styles.startNodeContainer}>
        <div
          className={`${styles.dndnode} ${styles.start}`}
          onDragStart={(event) => onDragStart(event, "startNode")}
          draggable
        ></div>
        <span>Start Node</span>
      </div>

      <div className="flex justify-center mt-3 mb-2">
        <div
          className={`${styles.dndnode} ${styles.decision}`}
          onDragStart={(event) => onDragStart(event, "decisionNode")}
          draggable
        >
          <span>Decision Node</span>
        </div>
      </div>

      <div
        className={`${styles.dndnode} ${styles.fork}`}
        onDragStart={(event) => onDragStart(event, "fork")}
        draggable
      >
        <span>Fork</span>
      </div>

      <div
        className={`${styles.dndnode} ${styles.join}`}
        onDragStart={(event) => onDragStart(event, "join")}
        draggable
      >
        <span>Join</span>
      </div>
      <div className={styles.endStateNodeContainer}>
        <div
          className={`${styles.dndnode} ${styles.end}`}
          onDragStart={(event) => onDragStart(event, "endStateNode")}
          draggable
        ></div>
        <span>End State Node</span>
      </div>
    </aside>
  );
}
