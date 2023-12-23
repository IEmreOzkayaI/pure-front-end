import {
  Handle,
  Position,
  NodeResizer,
  useUpdateNodeInternals,
} from "reactflow";
import styles from "./Fork.module.scss";
import { useCallback } from "react";

function Fork({ data, isConnectable, id }) {
  const updateNodeInternals = useUpdateNodeInternals();
  const changeBottomHandlePosition = useCallback(() => {
    const bottomHandle = document.querySelector(
      `[data-handleid="forkSourceDown_${id}"]`
    );

    const bottomResizer = document.querySelector(`#fork_${id}`);

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
      <div className={styles.fork} id={`fork_${id}`}>
        <Handle
          type="target"
          position={Position.Left}
          id="forkTarget"
          className={styles.handleLeft}
          isConnectable={isConnectable}
        />
        <Handle
          type="target"
          position={Position.Right}
          id="forkSourceUp"
          className={styles.handleUp}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id={`forkSourceDown_${id}`}
          className={styles.handleDown}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
}

export default Fork;
