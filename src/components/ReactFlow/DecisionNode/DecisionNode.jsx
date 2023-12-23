import { Handle, Position } from "reactflow";
import styles from "./DecisionNode.module.scss";

function DecisionNode({ data, isConnectable }) {
  console.log("data", data);
  return (
    <div className={styles.decision}>
      <Handle
        type="target"
        position={Position.Left}
        id="decisionNodeTarget"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="decisionNodeSource"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default DecisionNode;
