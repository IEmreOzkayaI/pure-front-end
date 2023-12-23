import { Handle, Position } from "reactflow";
import styles from "./EndStateNode.module.scss";

function EndStateNode({ data, isConnectable }) {
  return (
    <div className={styles.endStateNode}>
      <Handle
        type="target"
        position={Position.Right}
        id="endStateNodeTarget"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default EndStateNode;
