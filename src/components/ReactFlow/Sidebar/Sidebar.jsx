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
        className={`${styles.dndnode} `}
        onDragStart={(event) => onDragStart(event, "actionStateNode")}
        draggable
      >
        <img src="/actionState.png" alt="" />
      </div>

      <div
        className={`${styles.dndnode} `}
        onDragStart={(event) => onDragStart(event, "actorNode")}
        draggable
      >
        <img src="/diagram_actor.png" alt="" />
      </div>
      <div
        className={`${styles.dndnode} `}
        onDragStart={(event) => onDragStart(event, "startNode")}
        draggable
      >
        <img src="/startNode.png" alt="" />
      </div>

      <div
        className={`${styles.dndnode} `}
        onDragStart={(event) => onDragStart(event, "decisionNode")}
        draggable
      >
        <img src="/decisionNode.png" alt="" />
      </div>

      <div
        className={`${styles.dndnode}`}
        onDragStart={(event) => onDragStart(event, "fork")}
        draggable
      >
        <img src="/fork.png" alt="" />
      </div>

      <div
        className={`${styles.dndnode} `}
        onDragStart={(event) => onDragStart(event, "join")}
        draggable
      >
        <img src="/join.png" alt="" />
      </div>
      <div
        className={`${styles.dndnode}`}
        onDragStart={(event) => onDragStart(event, "endStateNode")}
        draggable
      >
        <img src="/endstate.png" alt="" />
      </div>
    </aside>
  );
}
