import { Handle, Position } from "reactflow";
import styles from "./ActionStateNode.module.scss";

function ActionStateNode({ data, isConnectable }) {
  return (
    <div className={styles.actionState}>
      <Handle
        type="target"
        position={Position.Top}
        id="actionStateNodeTarget"
        isConnectable={isConnectable}
      />
      <div>{data?.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="actionStateNodeSource"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default ActionStateNode;
