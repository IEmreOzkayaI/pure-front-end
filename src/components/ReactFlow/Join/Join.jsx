import {
  Handle,
  Position,
  useUpdateNodeInternals,
  NodeResizer,
} from "reactflow";
import styles from "./Join.module.scss";
import { useCallback } from "react";

function Join({ data, isConnectable, id }) {
  console.log("data", data);
  const updateNodeInternals = useUpdateNodeInternals();
  const changeBottomHandlePosition = useCallback(() => {
    const bottomHandle = document.querySelector(
      `[data-handleid="joinTargetDown_${id}"]`
    );

    const bottomResizer = document.querySelector(`#join_${id}`);

    bottomHandle.style.top = `${
      bottomResizer.previousElementSibling.offsetTop - 16
    }px`;

    updateNodeInternals(id);
  }, [updateNodeInternals, id]);
  return (
    <>
      <NodeResizer
        isVisible
        minHeight={70}
        minWidth={3}
        maxWidth={3}
        onResize={changeBottomHandlePosition}
      />
      <div className={styles.join} id={`join_${id}`}>
        <Handle
          type="target"
          position={Position.Left}
          id={`joinTargetUp_${id}`}
          className={styles.handleLeftUp}
          isConnectable={isConnectable}
        />
        <Handle
          type="target"
          position={Position.Left}
          id={`joinTargetDown_${id}`}
          className={styles.handleLeftDown}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id={`joinSource_${id}`}
          className={styles.handleSource}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

export default Join;
