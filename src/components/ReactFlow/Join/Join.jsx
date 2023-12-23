import { Handle, Position } from "reactflow";
import styles from "./Join.module.scss";

function Join({ data, isConnectable }) {
  console.log("data", data);
  return (
    <div className={styles.join}>
      <Handle
        type="target"
        position={Position.Left}
        id="joinTargetUp"
        className={styles.handleLeftUp}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="joinTargetDown"
        className={styles.handleLeftDown}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="joinSource"
        className={styles.handleSource}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default Join;
