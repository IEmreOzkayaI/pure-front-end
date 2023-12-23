import { Handle, Position } from "reactflow";
import styles from "./Fork.module.scss";

function Fork({ data, isConnectable }) {
  console.log("data", data);
  return (
    <div className={styles.fork}>
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
        id="forkSourceDown"
        className={styles.handleDown}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default Fork;
